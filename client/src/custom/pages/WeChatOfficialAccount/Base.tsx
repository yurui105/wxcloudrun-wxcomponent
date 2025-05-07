import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { clearQuotaRequest, getCallbackIPRequest } from '../../utils/apis';

const { Content } = Layout;

const BaseApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="clearQuota">
        <Tabs.TabPanel value="clearQuota" label="清空配额">
          <ApiTester
            apiTitle="清空接口调用配额"
            apiDescription="公众号调用接口并发送成功后，微信服务器每次调用都会产生调用次数，调用量过大会对接口调用做限制，原则上每个帐号的每个接口都有调用次数限制。清零的接口为所有接口调用次数。"
            requestMsg={clearQuotaRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getCallbackIP" label="获取回调IP">
          <ApiTester
            apiTitle="获取微信服务器IP地址"
            apiDescription="如果公众号基于安全等考虑，需要获知微信服务器的IP地址列表，以便进行相关限制，可以通过该接口获取微信服务器IP地址列表或者IP网段信息。"
            requestMsg={getCallbackIPRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default BaseApiPage; 