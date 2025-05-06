import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Form, Input, Dialog, 
  MessagePlugin, Loading, Tabs, Textarea
} from 'tdesign-react';
import { request } from '../../../utils/common';
import { 
  getDraftListRequest, 
  getDraftCountRequest, 
  addDraftRequest 
} from '../../../utils/apis';
import styles from './index.module.less';

interface DraftItem {
  media_id: string;
  update_time: number;
  content: {
    news_item: Array<{
      title: string;
      author: string;
      digest: string;
      content: string;
      content_source_url: string;
      thumb_media_id: string;
      url: string;
    }>;
  };
}

interface NewArticle {
  title: string;
  author: string;
  digest: string;
  content: string;
  content_source_url: string;
  thumb_media_id: string;
  need_open_comment: number;
  only_fans_can_comment: number;
}

const DraftManagement: React.FC = () => {
  const [draftList, setDraftList] = useState<DraftItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: '',
    author: '',
    digest: '',
    content: '',
    content_source_url: '',
    thumb_media_id: '',
    need_open_comment: 0,
    only_fans_can_comment: 0
  });
  const [appid, setAppid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDraft, setSelectedDraft] = useState<DraftItem | null>(null);
  const [detailDialogVisible, setDetailDialogVisible] = useState(false);

  // 获取草稿列表
  const fetchDraftList = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const response = await request({
        request: getDraftListRequest,
        data: {
          appid,
          offset,
          count: pageSize,
          no_content: 0
        }
      });
      
      if (response && response.code === 0 && response.data) {
        setDraftList(response.data.item || []);
        setTotalCount(response.data.total_count || 0);
      } else {
        MessagePlugin.error(response?.errorMsg || '获取草稿列表失败');
      }
    } catch (error) {
      console.error('获取草稿列表出错:', error);
      MessagePlugin.error('获取草稿列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取草稿总数
  const fetchDraftCount = async () => {
    if (!appid) return;
    
    try {
      const response = await request({
        request: getDraftCountRequest,
        data: { appid }
      });
      
      if (response && response.code === 0 && response.data) {
        setTotalCount(response.data.total_count || 0);
      }
    } catch (error) {
      console.error('获取草稿总数出错:', error);
    }
  };

  // 创建新草稿
  const createDraft = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    if (!newArticle.title || !newArticle.content) {
      MessagePlugin.error('标题和内容不能为空');
      return;
    }
    
    setLoading(true);
    try {
      const response = await request({
        request: addDraftRequest,
        data: {
          appid,
          articles: [newArticle]
        }
      });
      
      if (response && response.code === 0) {
        MessagePlugin.success('草稿创建成功');
        setCreateDialogVisible(false);
        // 重置表单
        setNewArticle({
          title: '',
          author: '',
          digest: '',
          content: '',
          content_source_url: '',
          thumb_media_id: '',
          need_open_comment: 0,
          only_fans_can_comment: 0
        });
        // 刷新列表
        fetchDraftList();
        fetchDraftCount();
      } else {
        MessagePlugin.error(response?.errorMsg || '创建草稿失败');
      }
    } catch (error) {
      console.error('创建草稿出错:', error);
      MessagePlugin.error('创建草稿失败');
    } finally {
      setLoading(false);
    }
  };

  // 查看草稿详情
  const viewDraftDetail = (record: DraftItem) => {
    setSelectedDraft(record);
    setDetailDialogVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '标题',
      colKey: 'title',
      render: ({ row }: any) => (
        row.content?.news_item?.length > 0 ? row.content.news_item[0].title : '-'
      )
    },
    {
      title: '作者',
      colKey: 'author',
      render: ({ row }: any) => (
        row.content?.news_item?.length > 0 ? row.content.news_item[0].author : '-'
      )
    },
    {
      title: '更新时间',
      colKey: 'update_time',
      render: ({ row }: any) => (
        new Date(row.update_time * 1000).toLocaleString()
      )
    },
    {
      title: '操作',
      colKey: 'operation',
      render: ({ row }: any) => (
        <Button theme="primary" variant="text" onClick={() => viewDraftDetail(row)}>
          查看详情
        </Button>
      )
    }
  ];

  // 分页变化
  const handlePageChange = (pageInfo: { current: number, pageSize: number }) => {
    setCurrentPage(pageInfo.current);
    setPageSize(pageInfo.pageSize);
  };

  // 表单值变化
  const handleInputChange = (field: keyof NewArticle, value: string | number) => {
    setNewArticle({ ...newArticle, [field]: value });
  };

  // 监听页码变化重新获取数据
  useEffect(() => {
    if (appid) {
      fetchDraftList();
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
            <Button theme="primary" onClick={fetchDraftList}>查询</Button>
          </Form.FormItem>
          <Form.FormItem>
            <Button onClick={() => setCreateDialogVisible(true)}>新建草稿</Button>
          </Form.FormItem>
        </Form>
      </div>

      <Loading loading={loading}>
        <Table
          data={draftList}
          columns={columns as any}
          rowKey="media_id"
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

      {/* 新建草稿对话框 */}
      <Dialog
        header="新建草稿"
        visible={createDialogVisible}
        onClose={() => setCreateDialogVisible(false)}
        width={700}
        footer={
          <div>
            <Button onClick={() => setCreateDialogVisible(false)}>取消</Button>
            <Button theme="primary" loading={loading} onClick={createDraft}>确定</Button>
          </div>
        }
      >
        <Form labelWidth={80}>
          <Form.FormItem label="标题">
            <Input 
              value={newArticle.title} 
              onChange={(value) => handleInputChange('title', value)} 
            />
          </Form.FormItem>
          <Form.FormItem label="作者">
            <Input 
              value={newArticle.author} 
              onChange={(value) => handleInputChange('author', value)} 
            />
          </Form.FormItem>
          <Form.FormItem label="摘要">
            <Input 
              value={newArticle.digest} 
              onChange={(value) => handleInputChange('digest', value)} 
            />
          </Form.FormItem>
          <Form.FormItem label="内容">
            <Textarea 
              value={newArticle.content} 
              onChange={(value) => handleInputChange('content', value)}
              autosize={{ minRows: 5, maxRows: 10 }}
            />
          </Form.FormItem>
          <Form.FormItem label="原文链接">
            <Input 
              value={newArticle.content_source_url} 
              onChange={(value) => handleInputChange('content_source_url', value)} 
            />
          </Form.FormItem>
          <Form.FormItem label="封面图">
            <Input 
              value={newArticle.thumb_media_id} 
              onChange={(value) => handleInputChange('thumb_media_id', value)}
              placeholder="请输入媒体ID" 
            />
          </Form.FormItem>
        </Form>
      </Dialog>

      {/* 草稿详情对话框 */}
      <Dialog
        header="草稿详情"
        visible={detailDialogVisible}
        onClose={() => setDetailDialogVisible(false)}
        width={800}
        footer={
          <Button onClick={() => setDetailDialogVisible(false)}>关闭</Button>
        }
      >
        {selectedDraft && selectedDraft.content && selectedDraft.content.news_item && selectedDraft.content.news_item.length > 0 && (
          <Tabs defaultValue="0">
            {selectedDraft.content.news_item.map((item, index) => (
              <Tabs.TabPanel key={index} value={index.toString()} label={`文章${index + 1}: ${item.title}`}>
                <h3>{item.title}</h3>
                <p><strong>作者：</strong>{item.author}</p>
                <p><strong>摘要：</strong>{item.digest}</p>
                <div className={styles.contentPreview}>
                  <strong>内容：</strong>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
                {item.url && (
                  <p>
                    <strong>链接：</strong>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                  </p>
                )}
              </Tabs.TabPanel>
            ))}
          </Tabs>
        )}
      </Dialog>
    </div>
  );
};

export default DraftManagement; 