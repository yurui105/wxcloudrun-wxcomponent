import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Form, Input, Dialog, 
  MessagePlugin, Loading, Textarea 
} from 'tdesign-react';
import { PrimaryTableCol, TableRowData } from 'tdesign-react/es/table/type';
import { request } from '../../../utils/common';
import { 
  publishGetRequest as getPublishRequest,
  publishSubmitRequest as submitPublishRequest
} from '../../../utils/apis';
import { PublishItem, PublishListResponse } from '../../../types';
import styles from './index.module.less';

// 响应数据类型，用于处理noLoginError返回的情况
interface ResponseData {
  code: number;
  errorMsg?: string;
  data?: any;
}

const PublishManagement: React.FC = () => {
  const [publishList, setPublishList] = useState<PublishItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appid, setAppid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [newPublish, setNewPublish] = useState<Partial<PublishItem>>({
    title: '',
    content: '',
    digest: '',
    thumb_media_id: ''
  });

  // 获取发布列表
  const fetchPublishList = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const response = await request({
        request: getPublishRequest,
        data: {
          appid,
          offset,
          count: pageSize,
          action: 'list'
        }
      }) as ResponseData;
      
      if (response && response.code === 0 && response.data) {
        const data = response.data as PublishListResponse;
        setPublishList(data.publish_list || []);
        setTotalCount(data.total_count || 0);
      } else {
        MessagePlugin.error(response?.errorMsg || '获取发布列表失败');
      }
    } catch (error) {
      console.error('获取发布列表出错:', error);
      MessagePlugin.error('获取发布列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 提交发布
  const submitPublish = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    if (!newPublish.title || !newPublish.content) {
      MessagePlugin.error('请填写完整的发布信息');
      return;
    }
    
    setLoading(true);
    try {
      const response = await request({
        request: submitPublishRequest,
        data: {
          appid,
          publish: newPublish
        }
      }) as ResponseData;
      
      if (response && response.code === 0) {
        MessagePlugin.success('提交发布成功');
        setCreateDialogVisible(false);
        // 重置表单
        setNewPublish({
          title: '',
          content: '',
          digest: '',
          thumb_media_id: ''
        });
        // 刷新列表
        fetchPublishList();
      } else {
        MessagePlugin.error(response?.errorMsg || '提交发布失败');
      }
    } catch (error) {
      console.error('提交发布出错:', error);
      MessagePlugin.error('提交发布失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns: PrimaryTableCol<TableRowData>[] = [
    {
      title: '标题',
      colKey: 'title',
      render: (props) => {
        const row = props.row as PublishItem;
        return row.title;
      }
    },
    {
      title: '摘要',
      colKey: 'digest',
      render: (props) => {
        const row = props.row as PublishItem;
        return row.digest;
      }
    },
    {
      title: '状态',
      colKey: 'status',
      render: (props) => {
        const row = props.row as PublishItem;
        return row.status === 0 ? '待发布' : row.status === 1 ? '已发布' : '发布失败';
      }
    },
    {
      title: '创建时间',
      colKey: 'create_time',
      render: (props) => {
        const row = props.row as PublishItem;
        return new Date(row.create_time * 1000).toLocaleString();
      }
    },
    {
      title: '操作',
      colKey: 'operation',
      render: (props) => {
        const row = props.row as PublishItem;
        return (
          <div>
            <Button 
              theme="primary" 
              variant="text" 
              onClick={() => {
                // 查看详情
              }}
            >
              查看
            </Button>
          </div>
        );
      }
    }
  ];

  // 分页变化
  const handlePageChange = (pageInfo: { current: number, pageSize: number }) => {
    setCurrentPage(pageInfo.current);
    setPageSize(pageInfo.pageSize);
  };

  // 监听页码变化重新获取数据
  useEffect(() => {
    if (appid) {
      fetchPublishList();
    }
  }, [currentPage, pageSize, appid]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Form layout="inline">
          <Form.FormItem label="APPID">
            <Input 
              value={appid} 
              onChange={(value) => setAppid(String(value))} 
              placeholder="请输入公众号APPID" 
            />
          </Form.FormItem>
          <Form.FormItem>
            <Button theme="primary" onClick={fetchPublishList}>查询</Button>
            <Button 
              theme="primary" 
              style={{ marginLeft: '8px' }}
              onClick={() => setCreateDialogVisible(true)}
            >
              新建发布
            </Button>
          </Form.FormItem>
        </Form>
      </div>

      <Loading loading={loading}>
        <Table
          data={publishList}
          columns={columns}
          rowKey="publish_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalCount,
            onChange: handlePageChange,
            showJumper: true,
            pageSizeOptions: [5, 10, 20]
          }}
          empty="暂无数据"
        />
      </Loading>

      {/* 新建发布对话框 */}
      <Dialog
        header="新建发布"
        visible={createDialogVisible}
        onClose={() => setCreateDialogVisible(false)}
        width={600}
        footer={
          <div>
            <Button onClick={() => setCreateDialogVisible(false)}>取消</Button>
            <Button theme="primary" loading={loading} onClick={submitPublish}>确定</Button>
          </div>
        }
      >
        <div className={styles.createDialog}>
          <Form.FormItem label="标题">
            <Input 
              value={newPublish.title} 
              onChange={(value) => setNewPublish({ ...newPublish, title: String(value) })}
              placeholder="请输入标题"
            />
          </Form.FormItem>
          <Form.FormItem label="摘要">
            <Input 
              value={newPublish.digest} 
              onChange={(value) => setNewPublish({ ...newPublish, digest: String(value) })}
              placeholder="请输入摘要"
            />
          </Form.FormItem>
          <Form.FormItem label="内容">
            <Textarea 
              value={newPublish.content} 
              onChange={(value) => setNewPublish({ ...newPublish, content: String(value) })}
              placeholder="请输入内容"
              autosize={{ minRows: 5, maxRows: 10 }}
            />
          </Form.FormItem>
          <Form.FormItem label="封面图">
            <Input 
              value={newPublish.thumb_media_id} 
              onChange={(value) => setNewPublish({ ...newPublish, thumb_media_id: String(value) })}
              placeholder="请输入封面图媒体ID"
            />
          </Form.FormItem>
        </div>
      </Dialog>
    </div>
  );
};

export default PublishManagement; 