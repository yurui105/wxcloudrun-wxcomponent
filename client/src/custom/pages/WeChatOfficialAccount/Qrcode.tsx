import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { getTempQrCodeRequest, getForeverQrCodeRequest } from '../../utils/apis';

const { Content } = Layout;

const QrcodeApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="tempQrcode">
        <Tabs.TabPanel value="tempQrcode" label="创建临时二维码">
          <ApiTester
            apiTitle="创建临时二维码"
            apiDescription="创建临时二维码，有效期可以设置。最大不超过30天（即2592000秒）。"
            requestMsg={getTempQrCodeRequest}
            requestParams={{
              expire_seconds: '604800', // 二维码有效期，单位：秒，最大不超过2592000（30天）
              scene_id: '' // 场景值ID，临时二维码时为32位非0整型
            }}
            requiredParams={['scene_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="foreverQrcode" label="创建永久二维码">
          <ApiTester
            apiTitle="创建永久二维码"
            apiDescription="创建永久二维码，永久二维码主要用于适用于账号绑定、用户来源统计等场景。"
            requestMsg={getForeverQrCodeRequest}
            requestParams={{
              scene_id: '', // 场景值ID，永久二维码时最大值为100000（目前参数只支持1--100000）
              scene_str: '' // 场景值ID（字符串形式），字符串类型，长度限制为1到64
            }}
            requiredParams={[]}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default QrcodeApiPage; 