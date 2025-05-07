import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { getAuthCodeRequest, userFromCodeRequest, userFromTokenRequest } from '../../utils/apis';

const { Content } = Layout;

const OAuthApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="getAuthCode">
        <Tabs.TabPanel value="getAuthCode" label="获取授权链接">
          <ApiTester
            apiTitle="获取网页授权链接"
            apiDescription="获取网页授权链接，用户同意授权后，会重定向跳转到指定的redirect_uri，并带上code参数"
            requestMsg={getAuthCodeRequest}
            requestParams={{
              redirect_uri: '', // 授权后重定向的回调链接地址
              scope: 'snsapi_base', // 应用授权作用域，snsapi_base或snsapi_userinfo
              state: '' // 重定向后会带上state参数，可以用于防止CSRF攻击
            }}
            requiredParams={['redirect_uri']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userFromCode" label="通过code获取用户信息">
          <ApiTester
            apiTitle="通过code获取用户信息"
            apiDescription="通过code获取用户信息，code只能使用一次，过期时间为5分钟"
            requestMsg={userFromCodeRequest}
            requestParams={{
              code: '', // 授权后获取的code参数
              lang: 'zh_CN' // 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
            }}
            requiredParams={['code']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userFromToken" label="通过token获取用户信息">
          <ApiTester
            apiTitle="通过access_token获取用户信息"
            apiDescription="通过网页授权access_token和openid获取用户基本信息"
            requestMsg={userFromTokenRequest}
            requestParams={{
              access_token: '', // 网页授权access_token
              openid: '', // 用户的唯一标识
              lang: 'zh_CN' // 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
            }}
            requiredParams={['access_token', 'openid']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default OAuthApiPage; 