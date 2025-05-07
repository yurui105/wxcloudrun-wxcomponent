import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  getUserInfoRequest, 
  getBatchUserInfoRequest, 
  getUserListRequest,
  userRemarkRequest,
  getUserBlacklistRequest,
  userBlockRequest,
  userUnBlockRequest,
  userChangeOpenIDRequest
} from '../../utils/apis';

const { Content } = Layout;

const UserApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="getUserInfo">
        <Tabs.TabPanel value="getUserInfo" label="获取用户基本信息">
          <ApiTester
            apiTitle="获取用户基本信息"
            apiDescription="通过openid获取用户基本信息，包括昵称、头像、性别、所在城市、语言和关注时间等。"
            requestMsg={getUserInfoRequest}
            requestParams={{
              openid: ''
            }}
            requiredParams={['openid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getBatchUserInfo" label="批量获取用户信息">
          <ApiTester
            apiTitle="批量获取用户信息"
            apiDescription="批量获取用户基本信息，每次最多支持100个OpenID。"
            requestMsg={getBatchUserInfoRequest}
            requestParams={{
              openids: '',  // 格式：["OPENID1", "OPENID2",...]
              lang: 'zh_CN'
            }}
            requiredParams={['openids']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getUserList" label="获取用户列表">
          <ApiTester
            apiTitle="获取用户列表"
            apiDescription="获取公众号的关注者列表，一次拉取调用最多拉取10000个关注者的OpenID。"
            requestMsg={getUserListRequest}
            requestParams={{
              next_openid: ''  // 第一个拉取时为空，后续根据返回值传入
            }}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userRemark" label="设置用户备注名">
          <ApiTester
            apiTitle="设置用户备注名"
            apiDescription="设置公众号用户的备注名，该接口暂时开放给微信认证的服务号。"
            requestMsg={userRemarkRequest}
            requestParams={{
              openid: '',
              remark: ''
            }}
            requiredParams={['openid', 'remark']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getUserBlacklist" label="获取黑名单列表">
          <ApiTester
            apiTitle="获取黑名单列表"
            apiDescription="获取公众号的黑名单列表，每次最多能拉取10000个OpenID。"
            requestMsg={getUserBlacklistRequest}
            requestParams={{
              begin_openid: ''  // 第一次拉取时为空，后续根据返回值传入
            }}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userBlock" label="拉黑用户">
          <ApiTester
            apiTitle="拉黑用户"
            apiDescription="将用户加入黑名单，被加入黑名单的用户，将会限制公众号推送消息给该用户。"
            requestMsg={userBlockRequest}
            requestParams={{
              openid_list: ''  // 格式：["OPENID1", "OPENID2",...]，最多支持20个
            }}
            requiredParams={['openid_list']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userUnBlock" label="取消拉黑用户">
          <ApiTester
            apiTitle="取消拉黑用户"
            apiDescription="将用户从黑名单中移除，取消限制。"
            requestMsg={userUnBlockRequest}
            requestParams={{
              openid_list: ''  // 格式：["OPENID1", "OPENID2",...]，最多支持20个
            }}
            requiredParams={['openid_list']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userChangeOpenID" label="变更用户OpenID">
          <ApiTester
            apiTitle="变更用户OpenID"
            apiDescription="微信公众号在迁移用户时，需要将原有用户的OpenID变更到新的OpenID。"
            requestMsg={userChangeOpenIDRequest}
            requestParams={{
              from_appid: '',  // 原公众号的AppID
              openid_list: ''  // 格式：["OPENID1", "OPENID2",...]，最多支持100个
            }}
            requiredParams={['from_appid', 'openid_list']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default UserApiPage; 