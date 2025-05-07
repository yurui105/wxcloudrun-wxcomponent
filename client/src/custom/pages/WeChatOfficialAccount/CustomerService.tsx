import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  getCustomerListRequest,
  getCustomerOnlineRequest,
  customerCreateRequest,
  customerUpdateRequest,
  customerDeleteRequest,
  customerSetAvatarRequest,
  customerMessagesRequest,
  customerInviteRequest,
  customerMessageSendTextRequest,
  customerMessageSendImageRequest,
  customerMessageSendVideoRequest,
  customerMessageSendVoiceRequest,
  customerMessageSendLinkRequest,
  customerMessageSendMusicRequest,
  customerMessageSendNewsRequest,
  customerMessageSendMsgMenuRequest,
  customerMessageSendRawRequest,
  customerMessageSendRequest,
  customerSessionCreateRequest,
  customerSessionCloseRequest,
  getCustomerSessionRequest,
  customerSessionListRequest,
  customerSessionWaitingRequest
} from '../../utils/apis';

const { Content } = Layout;

const CustomerServiceApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="customerList">
        <Tabs.TabPanel value="customerList" label="获取客服列表">
          <ApiTester
            apiTitle="获取客服列表"
            apiDescription="获取所有客服账号列表"
            requestMsg={getCustomerListRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerOnline" label="获取在线客服">
          <ApiTester
            apiTitle="获取在线客服列表"
            apiDescription="获取所有在线客服的客服账号列表"
            requestMsg={getCustomerOnlineRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerCreate" label="添加客服账号">
          <ApiTester
            apiTitle="添加客服账号"
            apiDescription="添加客服账号，每个公众号最多添加100个客服账号"
            requestMsg={customerCreateRequest}
            requestParams={{
              kf_account: '', // 完整客服账号，格式为：账号前缀@公众号微信号
              nickname: '', // 客服昵称
            }}
            requiredParams={['kf_account', 'nickname']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerUpdate" label="修改客服账号">
          <ApiTester
            apiTitle="修改客服账号"
            apiDescription="修改已有的客服账号"
            requestMsg={customerUpdateRequest}
            requestParams={{
              kf_account: '', // 完整客服账号，格式为：账号前缀@公众号微信号
              nickname: '', // 客服昵称
            }}
            requiredParams={['kf_account', 'nickname']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerDelete" label="删除客服账号">
          <ApiTester
            apiTitle="删除客服账号"
            apiDescription="删除已有的客服账号"
            requestMsg={customerDeleteRequest}
            requestParams={{
              kf_account: '', // 完整客服账号，格式为：账号前缀@公众号微信号
            }}
            requiredParams={['kf_account']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerSetAvatar" label="设置客服头像">
          <ApiTester
            apiTitle="设置客服头像"
            apiDescription="为客服账号设置头像"
            requestMsg={customerSetAvatarRequest}
            requestParams={{
              kf_account: '', // 完整客服账号，格式为：账号前缀@公众号微信号
            }}
            requiredParams={['kf_account']}
            isFileUpload={true}
            fileTypes={['.jpg', '.png']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerMessages" label="获取聊天记录">
          <ApiTester
            apiTitle="获取客服聊天记录"
            apiDescription="获取客服和用户的聊天记录"
            requestMsg={customerMessagesRequest}
            requestParams={{
              starttime: '', // 起始时间，unix时间戳
              endtime: '', // 结束时间，unix时间戳
              msgid: '1', // 起始消息id，默认为1
              number: '10000' // 每次获取条数，最多10000条
            }}
            requiredParams={['starttime', 'endtime']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="customerInvite" label="邀请绑定客服账号">
          <ApiTester
            apiTitle="邀请绑定客服账号"
            apiDescription="邀请微信用户绑定客服账号"
            requestMsg={customerInviteRequest}
            requestParams={{
              kf_account: '', // 完整客服账号
              invite_wx: '' // 绑定的微信号
            }}
            requiredParams={['kf_account', 'invite_wx']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendText" label="发送文本消息">
          <ApiTester
            apiTitle="发送文本客服消息"
            apiDescription="发送文本类型的客服消息"
            requestMsg={customerMessageSendTextRequest}
            requestParams={{
              touser: '', // 用户OpenID
              content: '' // 文本消息内容
            }}
            requiredParams={['touser', 'content']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendImage" label="发送图片消息">
          <ApiTester
            apiTitle="发送图片客服消息"
            apiDescription="发送图片类型的客服消息"
            requestMsg={customerMessageSendImageRequest}
            requestParams={{
              touser: '', // 用户OpenID
              media_id: '' // 发送的图片的媒体ID
            }}
            requiredParams={['touser', 'media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendVideo" label="发送视频消息">
          <ApiTester
            apiTitle="发送视频客服消息"
            apiDescription="发送视频类型的客服消息"
            requestMsg={customerMessageSendVideoRequest}
            requestParams={{
              touser: '', // 用户OpenID
              media_id: '', // 发送的视频的媒体ID
              thumb_media_id: '', // 视频消息的缩略图
              title: '', // 视频消息的标题
              description: '' // 视频消息的描述
            }}
            requiredParams={['touser', 'media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendVoice" label="发送语音消息">
          <ApiTester
            apiTitle="发送语音客服消息"
            apiDescription="发送语音类型的客服消息"
            requestMsg={customerMessageSendVoiceRequest}
            requestParams={{
              touser: '', // 用户OpenID
              media_id: '' // 发送的语音的媒体ID
            }}
            requiredParams={['touser', 'media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendLink" label="发送图文链接">
          <ApiTester
            apiTitle="发送图文链接客服消息"
            apiDescription="发送图文链接的客服消息"
            requestMsg={customerMessageSendLinkRequest}
            requestParams={{
              touser: '', // 用户OpenID
              title: '', // 图文链接标题
              description: '', // 图文链接描述
              url: '', // 图文链接的URL
              thumb_url: '' // 图文链接的图片URL
            }}
            requiredParams={['touser', 'title', 'url']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendMusic" label="发送音乐消息">
          <ApiTester
            apiTitle="发送音乐客服消息"
            apiDescription="发送音乐类型的客服消息"
            requestMsg={customerMessageSendMusicRequest}
            requestParams={{
              touser: '', // 用户OpenID
              title: '', // 音乐标题
              description: '', // 音乐描述
              musicurl: '', // 音乐链接
              hqmusicurl: '', // 高品质音乐链接
              thumb_media_id: '' // 缩略图的媒体ID
            }}
            requiredParams={['touser', 'musicurl', 'thumb_media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendNews" label="发送图文消息">
          <ApiTester
            apiTitle="发送图文客服消息"
            apiDescription="发送图文类型的客服消息，图文消息条数限制在1条以内"
            requestMsg={customerMessageSendNewsRequest}
            requestParams={{
              touser: '', // 用户OpenID
              articles: '' // 图文消息，格式为JSON字符串，例如：[{"title":"Happy Day","description":"Is Really A Happy Day","url":"URL","picurl":"PIC_URL"}]
            }}
            requiredParams={['touser', 'articles']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendMsgMenu" label="发送菜单消息">
          <ApiTester
            apiTitle="发送菜单客服消息"
            apiDescription="发送菜单类型的客服消息"
            requestMsg={customerMessageSendMsgMenuRequest}
            requestParams={{
              touser: '', // 用户OpenID
              head_content: '', // 菜单头部内容
              list: '', // 菜单项列表，格式为JSON字符串，例如：[{"id":"1","content":"101"},{"id":"2","content":"102"}]
              tail_content: '' // 菜单尾部内容
            }}
            requiredParams={['touser', 'list']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sessionCreate" label="创建会话">
          <ApiTester
            apiTitle="创建客服会话"
            apiDescription="创建一个客服会话"
            requestMsg={customerSessionCreateRequest}
            requestParams={{
              kf_account: '', // 完整客服账号
              openid: '', // 用户OpenID
              text: '' // 附加信息，可选
            }}
            requiredParams={['kf_account', 'openid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sessionClose" label="关闭会话">
          <ApiTester
            apiTitle="关闭客服会话"
            apiDescription="关闭一个客服会话"
            requestMsg={customerSessionCloseRequest}
            requestParams={{
              kf_account: '', // 完整客服账号
              openid: '', // 用户OpenID
              text: '' // 附加信息，可选
            }}
            requiredParams={['kf_account', 'openid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sessionGet" label="获取会话状态">
          <ApiTester
            apiTitle="获取客服会话状态"
            apiDescription="获取用户与客服的会话状态"
            requestMsg={getCustomerSessionRequest}
            requestParams={{
              openid: '' // 用户OpenID
            }}
            requiredParams={['openid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sessionList" label="获取客服会话列表">
          <ApiTester
            apiTitle="获取客服会话列表"
            apiDescription="获取指定客服正在接待的会话列表"
            requestMsg={customerSessionListRequest}
            requestParams={{
              kf_account: '' // 完整客服账号
            }}
            requiredParams={['kf_account']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sessionWaiting" label="获取未接入会话">
          <ApiTester
            apiTitle="获取未接入会话列表"
            apiDescription="获取当前正在等待队列中的会话列表"
            requestMsg={customerSessionWaitingRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default CustomerServiceApiPage; 