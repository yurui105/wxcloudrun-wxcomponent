import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Form, Input, Dialog, 
  MessagePlugin, Loading, Textarea 
} from 'tdesign-react';
import { PrimaryTableCol, TableRowData } from 'tdesign-react/es/table/type';
import { request } from '../../../utils/common';
import { 
  commentListRequest as getCommentListRequest,
  commentReplyRequest as replyCommentRequest,
  commentDeleteRequest as deleteCommentRequest
} from '../../../utils/apis';
import { CommentItem, CommentListResponse } from '../../../types';
import styles from './index.module.less';

// 响应数据类型，用于处理noLoginError返回的情况
interface ResponseData {
  code: number;
  errorMsg?: string;
  data?: any;
}

const CommentManagement: React.FC = () => {
  const [commentList, setCommentList] = useState<CommentItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appid, setAppid] = useState('');
  const [msgDataId, setMsgDataId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);
  const [replyDialogVisible, setReplyDialogVisible] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // 获取评论列表
  const fetchCommentList = async () => {
    if (!appid || !msgDataId) {
      MessagePlugin.error('请输入APPID和消息ID');
      return;
    }
    
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const response = await request({
        request: getCommentListRequest,
        data: {
          appid,
          msg_data_id: msgDataId,
          index: 0,
          begin: offset,
          count: pageSize
        }
      }) as ResponseData;
      
      if (response && response.code === 0 && response.data) {
        const data = response.data as CommentListResponse;
        setCommentList(data.comment || []);
        setTotalCount(data.total || 0);
      } else {
        MessagePlugin.error(response?.errorMsg || '获取评论列表失败');
      }
    } catch (error) {
      console.error('获取评论列表出错:', error);
      MessagePlugin.error('获取评论列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 回复评论
  const replyComment = async () => {
    if (!selectedComment || !replyContent.trim()) {
      MessagePlugin.error('请选择评论并输入回复内容');
      return;
    }
    
    setLoading(true);
    try {
      const response = await request({
        request: replyCommentRequest,
        data: {
          appid,
          msg_data_id: msgDataId,
          user_comment_id: selectedComment.user_comment_id,
          content: replyContent
        }
      }) as ResponseData;
      
      if (response && response.code === 0) {
        MessagePlugin.success('回复成功');
        setReplyDialogVisible(false);
        setReplyContent('');
        // 刷新列表
        fetchCommentList();
      } else {
        MessagePlugin.error(response?.errorMsg || '回复失败');
      }
    } catch (error) {
      console.error('回复评论出错:', error);
      MessagePlugin.error('回复失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除评论
  const deleteComment = async (comment: CommentItem) => {
    if (!comment) return;
    
    setLoading(true);
    try {
      const response = await request({
        request: deleteCommentRequest,
        data: {
          appid,
          msg_data_id: msgDataId,
          user_comment_id: comment.user_comment_id
        }
      }) as ResponseData;
      
      if (response && response.code === 0) {
        MessagePlugin.success('删除成功');
        // 刷新列表
        fetchCommentList();
      } else {
        MessagePlugin.error(response?.errorMsg || '删除失败');
      }
    } catch (error) {
      console.error('删除评论出错:', error);
      MessagePlugin.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns: PrimaryTableCol<TableRowData>[] = [
    {
      title: '评论内容',
      colKey: 'content',
      render: (props) => {
        const row = props.row as CommentItem;
        return (
          <div className={styles.commentContent}>
            <div>{row.content}</div>
            {row.reply && (
              <div className={styles.replyContent}>
                <strong>回复：</strong>{row.reply.content}
              </div>
            )}
          </div>
        );
      }
    },
    {
      title: '评论时间',
      colKey: 'create_time',
      render: (props) => {
        const row = props.row as CommentItem;
        return new Date(row.create_time * 1000).toLocaleString();
      }
    },
    {
      title: '操作',
      colKey: 'operation',
      render: (props) => {
        const row = props.row as CommentItem;
        return (
          <div>
            <Button 
              theme="primary" 
              variant="text" 
              onClick={() => {
                setSelectedComment(row);
                setReplyDialogVisible(true);
              }}
              disabled={!!row.reply}
            >
              回复
            </Button>
            <Button 
              theme="danger" 
              variant="text" 
              onClick={() => deleteComment(row)}
            >
              删除
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
    if (appid && msgDataId) {
      fetchCommentList();
    }
  }, [currentPage, pageSize, appid, msgDataId]);

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
          <Form.FormItem label="消息ID">
            <Input 
              value={msgDataId} 
              onChange={(value) => setMsgDataId(String(value))} 
              placeholder="请输入消息ID" 
            />
          </Form.FormItem>
          <Form.FormItem>
            <Button theme="primary" onClick={fetchCommentList}>查询</Button>
          </Form.FormItem>
        </Form>
      </div>

      <Loading loading={loading}>
        <Table
          data={commentList}
          columns={columns}
          rowKey="user_comment_id"
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

      {/* 回复评论对话框 */}
      <Dialog
        header="回复评论"
        visible={replyDialogVisible}
        onClose={() => setReplyDialogVisible(false)}
        width={600}
        footer={
          <div>
            <Button onClick={() => setReplyDialogVisible(false)}>取消</Button>
            <Button theme="primary" loading={loading} onClick={replyComment}>确定</Button>
          </div>
        }
      >
        <div className={styles.replyDialog}>
          <div className={styles.originalComment}>
            <strong>原评论：</strong>
            <p>{selectedComment?.content}</p>
          </div>
          <Form.FormItem label="回复内容">
            <Textarea 
              value={replyContent} 
              onChange={(value) => setReplyContent(String(value))}
              placeholder="请输入回复内容"
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.FormItem>
        </div>
      </Dialog>
    </div>
  );
};

export default CommentManagement; 