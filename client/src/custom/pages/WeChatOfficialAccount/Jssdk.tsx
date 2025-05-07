import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { jssdkConfigRequest, jssdkGetTicketRequest } from '../../utils/apis';

const { Content } = Layout;

const JssdkApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="jssdkConfig">
        <Tabs.TabPanel value="jssdkConfig" label="获取JSSDK配置">
          <ApiTester
            apiTitle="获取JSSDK配置信息"
            apiDescription="获取JSSDK配置信息，用于网页调用微信JS接口。配置信息包括appId、timestamp、nonceStr、signature等。"
            requestMsg={jssdkConfigRequest}
            requestParams={{
              url: '', // 当前网页的URL，不包含#及其后面部分
              apis: '' // 需要使用的JS接口列表，格式如：["chooseImage", "previewImage"]
            }}
            requiredParams={['url']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="jssdkGetTicket" label="获取jsapi_ticket">
          <ApiTester
            apiTitle="获取jsapi_ticket"
            apiDescription="获取jsapi_ticket，用于生成JSSDK配置的签名。jsapi_ticket是公众号用于调用微信JS接口的临时票据。"
            requestMsg={jssdkGetTicketRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default JssdkApiPage; 