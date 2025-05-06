import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Dialog, MessagePlugin, Loading, Tabs } from 'tdesign-react';
import { request } from '../../../utils/common';
import { getPublicationRecordsRequest } from '../../../utils/apis';
import styles from './index.module.less';

interface PublishedItem {
  article_id: string;
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

const PublishManagement: React.FC = () => {
  const [publishList, setPublishList] = useState<PublishedItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appid, setAppid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<PublishedItem | null>(null);
  const [detailDialogVisible, setDetailDialogVisible] = useState(false);

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
        request: getPublicationRecordsRequest,
        data: {
          appid,
          offset,
          count: pageSize,
          no_content: 0
        }
      });
      
      if (response && response.code === 0 && response.data) {
        setPublishList(response.data.item || []);
        setTotalCount(response.data.total_count || 0);
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

  // 查看详情
  const viewDetail = (record: PublishedItem) => {
    setSelectedItem(record);
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
        <Button theme="primary" variant="text" onClick={() => viewDetail(row)}>
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
          </Form.FormItem>
        </Form>
      </div>

      <Loading loading={loading}>
        <Table
          data={publishList}
          columns={columns as any}
          rowKey="article_id"
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

      {/* 发布详情对话框 */}
      <Dialog
        header="发布详情"
        visible={detailDialogVisible}
        onClose={() => setDetailDialogVisible(false)}
        width={800}
        footer={
          <Button onClick={() => setDetailDialogVisible(false)}>关闭</Button>
        }
      >
        {selectedItem && selectedItem.content && selectedItem.content.news_item && selectedItem.content.news_item.length > 0 && (
          <Tabs defaultValue="0">
            {selectedItem.content.news_item.map((item, index) => (
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

export default PublishManagement; 