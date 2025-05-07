import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { shortGenKeyRequest, fetchShortGenRequest } from '../../utils/apis';

const { Content } = Layout;

const ShortUrlApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="genShortUrl">
        <Tabs.TabPanel value="genShortUrl" label="生成短链接">
          <ApiTester
            apiTitle="生成短链接"
            apiDescription="将长链接转换为短链接。主要使用场景：开发者用于生成二维码的原链接（商品、支付二维码等）太长导致扫码速度和成功率下降，将原长链接通过此接口转成短链接再生成二维码。"
            requestMsg={shortGenKeyRequest}
            requestParams={{
              long_url: '', // 长链接，支持http://、https://、weixin://wxpay格式的URL
              expire_seconds: '604800' // 短链接有效期，最大值：604800（即7天）
            }}
            requiredParams={['long_url']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="fetchShortUrl" label="查询短链接">
          <ApiTester
            apiTitle="查询短链接"
            apiDescription="查询短链接信息"
            requestMsg={fetchShortGenRequest}
            requestParams={{
              short_key: '' // 短链接对应的短key，即生成短链接接口返回的short_url字段中的key值
            }}
            requiredParams={['short_key']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default ShortUrlApiPage; 