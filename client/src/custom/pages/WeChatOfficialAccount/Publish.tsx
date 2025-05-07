import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  draftAddRequest,
  draftGetRequest,
  draftDeleteRequest,
  draftUpdateRequest,
  draftCountRequest,
  draftBatchGetRequest,
  draftSwitchRequest,
  draftCheckSwitchRequest,
  publishSubmitRequest,
  publishGetRequest,
  publishDeleteRequest,
  publishGetArticleRequest,
  publishBatchGetRequest
} from '../../utils/apis';

const { Content } = Layout;

const PublishApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="draftAdd">
        <Tabs.TabPanel value="draftAdd" label="新建草稿">
          <ApiTester
            apiTitle="新建草稿"
            apiDescription="新建草稿图文消息"
            requestMsg={draftAddRequest}
            requestParams={{
              articles: '' // 草稿图文消息的内容，JSON字符串，例如：[{"title":"标题","author":"作者","digest":"摘要","content":"正文","content_source_url":"原文链接","thumb_media_id":"封面图片ID","need_open_comment":0,"only_fans_can_comment":0}]
            }}
            requiredParams={['articles']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftGet" label="获取草稿">
          <ApiTester
            apiTitle="获取草稿"
            apiDescription="获取草稿内容"
            requestMsg={draftGetRequest}
            requestParams={{
              media_id: '' // 草稿的media_id
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftDelete" label="删除草稿">
          <ApiTester
            apiTitle="删除草稿"
            apiDescription="删除草稿"
            requestMsg={draftDeleteRequest}
            requestParams={{
              media_id: '' // 草稿的media_id
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftUpdate" label="修改草稿">
          <ApiTester
            apiTitle="修改草稿"
            apiDescription="修改草稿内容"
            requestMsg={draftUpdateRequest}
            requestParams={{
              media_id: '', // 草稿的media_id
              index: '0', // 要更新的文章在图文消息中的位置
              articles: '' // 要更新的文章内容
            }}
            requiredParams={['media_id', 'index', 'articles']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftCount" label="获取草稿总数">
          <ApiTester
            apiTitle="获取草稿总数"
            apiDescription="获取草稿总数量"
            requestMsg={draftCountRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftBatchGet" label="获取草稿列表">
          <ApiTester
            apiTitle="获取草稿列表"
            apiDescription="获取草稿列表"
            requestMsg={draftBatchGetRequest}
            requestParams={{
              offset: '0', // 从全部素材的该偏移位置开始返回，0表示从第一个素材返回
              count: '20', // 返回素材的数量，取值在1到20之间
              no_content: '0' // 是否返回草稿正文内容，1为不返回，0为返回
            }}
            requiredParams={['offset', 'count']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftSwitch" label="开关评论">
          <ApiTester
            apiTitle="开关评论"
            apiDescription="修改草稿评论状态"
            requestMsg={draftSwitchRequest}
            requestParams={{
              media_id: '', // 草稿的media_id
              index: '0', // 要修改的文章在图文消息中的位置
              need_open_comment: '0', // 是否打开评论，0不打开，1打开
              only_fans_can_comment: '0' // 是否粉丝才可评论，0所有人可评论，1粉丝才可评论
            }}
            requiredParams={['media_id', 'index']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="draftCheckSwitch" label="查询评论开关状态">
          <ApiTester
            apiTitle="查询评论开关状态"
            apiDescription="查询草稿评论开关状态"
            requestMsg={draftCheckSwitchRequest}
            requestParams={{
              media_id: '', // 草稿的media_id
              index: '0' // 要查询的文章在图文消息中的位置
            }}
            requiredParams={['media_id', 'index']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="publishSubmit" label="发布">
          <ApiTester
            apiTitle="发布"
            apiDescription="发布草稿"
            requestMsg={publishSubmitRequest}
            requestParams={{
              media_id: '' // 要发布的草稿的media_id
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="publishGet" label="获取发布状态">
          <ApiTester
            apiTitle="获取发布状态"
            apiDescription="获取发布状态"
            requestMsg={publishGetRequest}
            requestParams={{
              publish_id: '' // 发布任务的id
            }}
            requiredParams={['publish_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="publishDelete" label="删除发布">
          <ApiTester
            apiTitle="删除发布"
            apiDescription="删除发布"
            requestMsg={publishDeleteRequest}
            requestParams={{
              article_id: '', // 要删除的图文消息的article_id
              index: '0' // 要删除的文章在图文消息中的位置
            }}
            requiredParams={['article_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="publishGetArticle" label="获取已发布文章">
          <ApiTester
            apiTitle="获取已发布文章"
            apiDescription="获取已发布的图文消息"
            requestMsg={publishGetArticleRequest}
            requestParams={{
              article_id: '' // 要获取的图文消息的article_id
            }}
            requiredParams={['article_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="publishBatchGet" label="获取发布列表">
          <ApiTester
            apiTitle="获取发布列表"
            apiDescription="获取发布列表"
            requestMsg={publishBatchGetRequest}
            requestParams={{
              offset: '0', // 从全部素材的该偏移位置开始返回，0表示从第一个素材返回
              count: '20', // 返回素材的数量，取值在1到20之间
              no_content: '0' // 是否返回文章正文内容，1为不返回，0为返回
            }}
            requiredParams={['offset', 'count']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default PublishApiPage; 