import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  commentOpenRequest,
  commentCloseRequest,
  commentDeleteRequest,
  commentListRequest,
  commentMarkElectRequest,
  commentUnMarkElectRequest,
  commentReplyRequest,
  commentDeleteReplyRequest
} from '../../utils/apis';

const { Content } = Layout;

const CommentApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="commentOpen">
        <Tabs.TabPanel value="commentOpen" label="打开已群发文章评论">
          <ApiTester
            apiTitle="打开已群发文章评论"
            apiDescription="打开已群发文章评论功能"
            requestMsg={commentOpenRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0' // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
            }}
            requiredParams={['msg_data_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentClose" label="关闭已群发文章评论">
          <ApiTester
            apiTitle="关闭已群发文章评论"
            apiDescription="关闭已群发文章评论功能"
            requestMsg={commentCloseRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0' // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
            }}
            requiredParams={['msg_data_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentDelete" label="删除评论">
          <ApiTester
            apiTitle="删除评论"
            apiDescription="删除评论"
            requestMsg={commentDeleteRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              user_comment_id: '' // 用户评论id
            }}
            requiredParams={['msg_data_id', 'user_comment_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentList" label="查看评论">
          <ApiTester
            apiTitle="查看评论"
            apiDescription="查看指定文章的评论数据"
            requestMsg={commentListRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              begin: '0', // 起始位置
              count: '50', // 获取数目（最大50）
              type: '0' // type=0 普通评论&精选评论 type=1 普通评论 type=2 精选评论
            }}
            requiredParams={['msg_data_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentMarkElect" label="将评论标记精选">
          <ApiTester
            apiTitle="将评论标记精选"
            apiDescription="将评论标记为精选评论"
            requestMsg={commentMarkElectRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              user_comment_id: '' // 用户评论id
            }}
            requiredParams={['msg_data_id', 'user_comment_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentUnMarkElect" label="取消评论精选">
          <ApiTester
            apiTitle="取消评论精选"
            apiDescription="将评论取消精选"
            requestMsg={commentUnMarkElectRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              user_comment_id: '' // 用户评论id
            }}
            requiredParams={['msg_data_id', 'user_comment_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentReply" label="回复评论">
          <ApiTester
            apiTitle="回复评论"
            apiDescription="回复评论"
            requestMsg={commentReplyRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              user_comment_id: '', // 用户评论id
              content: '' // 回复内容
            }}
            requiredParams={['msg_data_id', 'user_comment_id', 'content']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="commentDeleteReply" label="删除回复">
          <ApiTester
            apiTitle="删除回复"
            apiDescription="删除回复"
            requestMsg={commentDeleteReplyRequest}
            requestParams={{
              msg_data_id: '', // 群发返回的msg_data_id
              index: '0', // 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
              user_comment_id: '' // 用户评论id
            }}
            requiredParams={['msg_data_id', 'user_comment_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default CommentApiPage; 