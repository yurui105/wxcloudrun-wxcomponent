import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { callbackVerifyRequest, callbackNotifyRequest } from '../../utils/apis';

const { Content } = Layout;

const CallbackApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="verify">
        <Tabs.TabPanel value="verify" label="验证消息真实性">
          <ApiTester
            apiTitle="验证消息真实性"
            apiDescription="用于微信服务器验证消息的真实性，开发者配置服务器时使用。"
            requestMsg={callbackVerifyRequest}
            requestParams={{
              signature: '', // 微信加密签名
              timestamp: '', // 时间戳
              nonce: '', // 随机数
              echostr: '' // 随机字符串
            }}
            requiredParams={['signature', 'timestamp', 'nonce', 'echostr']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="notify" label="接收消息推送">
          <ApiTester
            apiTitle="接收消息推送"
            apiDescription="接收微信服务器推送的消息，包括普通消息、事件消息等。"
            requestMsg={callbackNotifyRequest}
            requestParams={{
              xml: '' // 微信POST过来的XML数据
            }}
            requiredParams={['xml']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default CallbackApiPage; 