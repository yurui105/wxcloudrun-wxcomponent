import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { cardUpdateRequest } from '../../utils/apis';

const { Content } = Layout;

const CardApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="cardUpdate">
        <Tabs.TabPanel value="cardUpdate" label="更新卡券">
          <ApiTester
            apiTitle="更新卡券"
            apiDescription="更新卡券信息"
            requestMsg={cardUpdateRequest}
            requestParams={{
              card_id: '', // 卡券ID
              member_card: '', // 会员卡数据，JSON字符串
            }}
            requiredParams={['card_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default CardApiPage; 