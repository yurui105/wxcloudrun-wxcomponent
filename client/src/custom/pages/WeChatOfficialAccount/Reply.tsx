import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { autoReplyCurrentRequest } from '../../utils/apis';

const { Content } = Layout;

const ReplyApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="autoReplyCurrent">
        <Tabs.TabPanel value="autoReplyCurrent" label="获取自动回复规则">
          <ApiTester
            apiTitle="获取自动回复规则"
            apiDescription="获取公众号的自动回复规则，包括关注后自动回复、消息自动回复和关键词自动回复。"
            requestMsg={autoReplyCurrentRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default ReplyApiPage; 