import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  goodsListRequest,
  goodsGetRequest,
  goodsStatusRequest,
  goodsAddRequest,
  goodsUpdateRequest
} from '../../utils/apis';

const { Content } = Layout;

const GoodsApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="goodsList">
        <Tabs.TabPanel value="goodsList" label="获取商品列表">
          <ApiTester
            apiTitle="获取商品列表"
            apiDescription="获取已添加的商品列表"
            requestMsg={goodsListRequest}
            requestParams={{
              status: '', // 商品状态，0-全部，1-正常，2-审核中，3-审核失败，4-已删除
              page: '1', // 页码
              page_size: '10' // 每页数量
            }}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="goodsGet" label="获取商品详情">
          <ApiTester
            apiTitle="获取商品详情"
            apiDescription="获取单个商品的详细信息"
            requestMsg={goodsGetRequest}
            requestParams={{
              product_id: '' // 商品ID
            }}
            requiredParams={['product_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="goodsStatus" label="获取商品状态">
          <ApiTester
            apiTitle="获取商品状态"
            apiDescription="获取商品审核状态"
            requestMsg={goodsStatusRequest}
            requestParams={{
              product_id: '' // 商品ID
            }}
            requiredParams={['product_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="goodsAdd" label="添加商品">
          <ApiTester
            apiTitle="添加商品"
            apiDescription="添加新的商品，需要提供商品详细信息"
            requestMsg={goodsAddRequest}
            requestParams={{
              product_data: '' // 商品信息，JSON格式字符串，包含商品名称、描述、价格等信息
            }}
            requiredParams={['product_data']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="goodsUpdate" label="更新商品">
          <ApiTester
            apiTitle="更新商品"
            apiDescription="更新商品信息"
            requestMsg={goodsUpdateRequest}
            requestParams={{
              product_id: '', // 商品ID
              product_data: '' // 商品更新信息，JSON格式字符串
            }}
            requiredParams={['product_id', 'product_data']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default GoodsApiPage; 