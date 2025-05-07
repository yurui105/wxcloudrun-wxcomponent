import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  getUserTagListRequest,
  userTagCreateRequest,
  userTagUpdateRequest,
  userTagDeleteRequest,
  getUserTagsByOpenIDRequest,
  getUsersOfTagRequest,
  userTagBatchTagUsersRequest,
  userTagBatchUnTagUsersRequest
} from '../../utils/apis';

const { Content } = Layout;

const UserTagApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="getUserTagList">
        <Tabs.TabPanel value="getUserTagList" label="获取标签列表">
          <ApiTester
            apiTitle="获取公众号已创建的标签"
            apiDescription="获取公众号已创建的标签，一个公众号最多可以创建100个标签。"
            requestMsg={getUserTagListRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userTagCreate" label="创建标签">
          <ApiTester
            apiTitle="创建标签"
            apiDescription="创建一个新的标签。"
            requestMsg={userTagCreateRequest}
            requestParams={{
              name: '' // 标签名，最长30个字符
            }}
            requiredParams={['name']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userTagUpdate" label="编辑标签">
          <ApiTester
            apiTitle="编辑标签"
            apiDescription="编辑已有的标签。"
            requestMsg={userTagUpdateRequest}
            requestParams={{
              id: '', // 标签ID
              name: '' // 新标签名，最长30个字符
            }}
            requiredParams={['id', 'name']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userTagDelete" label="删除标签">
          <ApiTester
            apiTitle="删除标签"
            apiDescription="删除一个已有的标签。"
            requestMsg={userTagDeleteRequest}
            requestParams={{
              id: '' // 标签ID
            }}
            requiredParams={['id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getUserTagsByOpenID" label="获取用户标签">
          <ApiTester
            apiTitle="获取用户身上的标签列表"
            apiDescription="获取某个用户所有的标签。"
            requestMsg={getUserTagsByOpenIDRequest}
            requestParams={{
              openid: '' // 用户的OpenID
            }}
            requiredParams={['openid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getUsersOfTag" label="获取标签下的用户">
          <ApiTester
            apiTitle="获取标签下的用户列表"
            apiDescription="获取某个标签下的用户列表。"
            requestMsg={getUsersOfTagRequest}
            requestParams={{
              tagid: '', // 标签ID
              next_openid: '' // 第一次拉取时填空，后续使用返回值
            }}
            requiredParams={['tagid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userTagBatchTagUsers" label="批量为用户打标签">
          <ApiTester
            apiTitle="批量为用户打标签"
            apiDescription="为多个用户打上同一个标签。"
            requestMsg={userTagBatchTagUsersRequest}
            requestParams={{
              openid_list: '', // 格式: ["OPENID1", "OPENID2", ...] 最多支持50个
              tagid: '' // 标签ID
            }}
            requiredParams={['openid_list', 'tagid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userTagBatchUnTagUsers" label="批量为用户取消标签">
          <ApiTester
            apiTitle="批量为用户取消标签"
            apiDescription="为多个用户取消同一个标签。"
            requestMsg={userTagBatchUnTagUsersRequest}
            requestParams={{
              openid_list: '', // 格式: ["OPENID1", "OPENID2", ...] 最多支持50个
              tagid: '' // 标签ID
            }}
            requiredParams={['openid_list', 'tagid']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default UserTagApiPage; 