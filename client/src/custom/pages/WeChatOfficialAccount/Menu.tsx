import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  menuListRequest,
  menuGetRequest,
  menuCurrentRequest,
  menuCreateRequest,
  menuCreateConditionalRequest,
  menuDeleteRequest,
  menuDeleteConditionalRequest,
  menuMatchRequest
} from '../../utils/apis';

const { Content } = Layout;

const MenuApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="menuList">
        <Tabs.TabPanel value="menuList" label="获取菜单列表">
          <ApiTester
            apiTitle="获取菜单列表"
            apiDescription="获取公众号菜单列表"
            requestMsg={menuListRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuGet" label="获取菜单配置">
          <ApiTester
            apiTitle="获取菜单配置"
            apiDescription="获取公众号菜单配置信息"
            requestMsg={menuGetRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuCurrent" label="获取当前菜单">
          <ApiTester
            apiTitle="获取当前菜单"
            apiDescription="获取当前公众号的菜单配置"
            requestMsg={menuCurrentRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuCreate" label="创建菜单">
          <ApiTester
            apiTitle="创建自定义菜单"
            apiDescription="创建自定义菜单"
            requestMsg={menuCreateRequest}
            requestParams={{
              buttons: '' // 自定义菜单数据，JSON字符串格式，例如：[{"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC"},{"name":"菜单","sub_button":[{"type":"view","name":"搜索","url":"http://www.soso.com/"},{"type":"view","name":"视频","url":"http://v.qq.com/"}]}]
            }}
            requiredParams={['buttons']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuCreateConditional" label="创建个性化菜单">
          <ApiTester
            apiTitle="创建个性化菜单"
            apiDescription="创建个性化菜单，个性化菜单是指为特定用户群体显示的菜单"
            requestMsg={menuCreateConditionalRequest}
            requestParams={{
              buttons: '', // 自定义菜单数据，JSON字符串格式
              matchrule: '' // 菜单匹配规则，JSON字符串格式，例如：{"tag_id":"2","sex":"1","country":"中国","province":"广东","city":"广州","client_platform_type":"2","language":"zh_CN"}
            }}
            requiredParams={['buttons', 'matchrule']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuDelete" label="删除菜单">
          <ApiTester
            apiTitle="删除菜单"
            apiDescription="删除自定义菜单"
            requestMsg={menuDeleteRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuDeleteConditional" label="删除个性化菜单">
          <ApiTester
            apiTitle="删除个性化菜单"
            apiDescription="删除个性化菜单"
            requestMsg={menuDeleteConditionalRequest}
            requestParams={{
              menuid: '' // 个性化菜单的menuid
            }}
            requiredParams={['menuid']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="menuMatch" label="测试个性化菜单匹配">
          <ApiTester
            apiTitle="测试个性化菜单匹配结果"
            apiDescription="测试个性化菜单匹配结果，获取用户可以看到的菜单"
            requestMsg={menuMatchRequest}
            requestParams={{
              user_id: '' // 用户的OpenID或微信号
            }}
            requiredParams={['user_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default MenuApiPage; 