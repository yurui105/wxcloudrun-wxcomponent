import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  broadcastSendTextRequest,
  broadcastSendImageRequest,
  broadcastSendNewsRequest,
  broadcastSendVoiceRequest,
  broadcastSendVideoRequest,
  broadcastSendCardRequest,
  broadcastSendPreviewRequest,
  broadcastDeleteRequest,
  broadcastStatusRequest
} from '../../utils/apis';

const { Content } = Layout;

const BroadcastingApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="sendText">
        <Tabs.TabPanel value="sendText" label="群发文本消息">
          <ApiTester
            apiTitle="群发文本消息"
            apiDescription="群发文本消息给用户"
            requestMsg={broadcastSendTextRequest}
            requestParams={{
              content: '', // 文本消息内容
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '' // 开发者侧群发消息ID，长度不超过64字节
            }}
            requiredParams={['content']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendImage" label="群发图片消息">
          <ApiTester
            apiTitle="群发图片消息"
            apiDescription="群发图片消息给用户"
            requestMsg={broadcastSendImageRequest}
            requestParams={{
              media_id: '', // 图片的media_id
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '' // 开发者侧群发消息ID，长度不超过64字节
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendNews" label="群发图文消息">
          <ApiTester
            apiTitle="群发图文消息"
            apiDescription="群发图文消息给用户"
            requestMsg={broadcastSendNewsRequest}
            requestParams={{
              media_id: '', // 图文消息的media_id
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '', // 开发者侧群发消息ID，长度不超过64字节
              send_ignore_reprint: '0' // 图文消息被判定为转载时，是否继续群发。1为继续群发（转载），0为停止群发。默认为0
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendVoice" label="群发语音消息">
          <ApiTester
            apiTitle="群发语音消息"
            apiDescription="群发语音消息给用户"
            requestMsg={broadcastSendVoiceRequest}
            requestParams={{
              media_id: '', // 语音的media_id
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '' // 开发者侧群发消息ID，长度不超过64字节
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendVideo" label="群发视频消息">
          <ApiTester
            apiTitle="群发视频消息"
            apiDescription="群发视频消息给用户"
            requestMsg={broadcastSendVideoRequest}
            requestParams={{
              media_id: '', // 视频的media_id
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '', // 开发者侧群发消息ID，长度不超过64字节
              title: '', // 视频标题
              description: '' // 视频描述
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendCard" label="群发卡券">
          <ApiTester
            apiTitle="群发卡券"
            apiDescription="群发卡券给用户"
            requestMsg={broadcastSendCardRequest}
            requestParams={{
              card_id: '', // 卡券ID
              is_to_all: 'true', // 是否群发给所有用户，true为群发给所有用户，false为群发给特定用户
              tag_id: '', // 用户标签ID，is_to_all为false时必填
              clientmsgid: '' // 开发者侧群发消息ID，长度不超过64字节
            }}
            requiredParams={['card_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendPreview" label="预览消息">
          <ApiTester
            apiTitle="预览消息"
            apiDescription="预览消息，在群发消息正式发送前，可以通过预览接口将消息发送给指定的用户，预览接收人可以是公众号的openid，也可以是测试号的微信号"
            requestMsg={broadcastSendPreviewRequest}
            requestParams={{
              towxname: '', // 微信号（如果设置了towxname则优先发给wxname用户，如果没有则发给openid用户）
              touser: '', // OpenID
              msgtype: 'text', // 消息类型，text/image/mpnews/voice/video/wxcard
              text: '', // 文本消息内容，msgtype=text时必填
              image: '', // 图片消息media_id，msgtype=image时必填
              mpnews: '', // 图文消息media_id，msgtype=mpnews时必填
              voice: '', // 语音消息media_id，msgtype=voice时必填
              video: '', // 视频消息ID，msgtype=video时必填
              wxcard: '' // 卡券ID，msgtype=wxcard时必填
            }}
            requiredParams={['msgtype']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="delete" label="删除群发">
          <ApiTester
            apiTitle="删除群发"
            apiDescription="删除群发消息，删除群发消息只能删除图文消息和视频消息，其他类型的消息一经发送，无法删除。"
            requestMsg={broadcastDeleteRequest}
            requestParams={{
              msg_id: '', // 消息ID
              article_idx: '0' // 要删除的文章在图文消息中的位置，第一篇为0，该参数不填或填0会删除全部文章
            }}
            requiredParams={['msg_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="status" label="查询群发状态">
          <ApiTester
            apiTitle="查询群发状态"
            apiDescription="查询群发消息发送状态"
            requestMsg={broadcastStatusRequest}
            requestParams={{
              msg_id: '' // 消息ID
            }}
            requiredParams={['msg_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default BroadcastingApiPage; 