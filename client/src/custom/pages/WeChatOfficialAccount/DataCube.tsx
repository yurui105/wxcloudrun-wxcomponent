import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  getUserSummaryRequest,
  getUserCumulateRequest,
  getArticleSummaryRequest,
  getArticleTotalRequest,
  getUserReadSummaryRequest,
  getUserShareSummaryRequest,
  getUserShareHourlyRequest,
  getUpstreamMessageSummaryRequest,
  getUpstreamMessageHourlyRequest,
  getUpstreamMessageWeeklyRequest,
  getUpstreamMessageMonthlyRequest,
  getUpstreamMessageDistSummaryRequest,
  getUpstreamMessageDistWeeklyRequest,
  getUpstreamMessageDistMonthlyRequest
} from '../../utils/apis';

const { Content } = Layout;

const DataCubeApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="userSummary">
        <Tabs.TabPanel value="userSummary" label="用户增减数据">
          <ApiTester
            apiTitle="获取用户增减数据"
            apiDescription="获取用户增减数据，最大时间跨度为7天"
            requestMsg={getUserSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userCumulate" label="用户累计数据">
          <ApiTester
            apiTitle="获取用户累计数据"
            apiDescription="获取用户累计数据，最大时间跨度为7天"
            requestMsg={getUserCumulateRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="articleSummary" label="图文群发每日数据">
          <ApiTester
            apiTitle="获取图文群发每日数据"
            apiDescription="获取图文群发每日数据，最大时间跨度为1天"
            requestMsg={getArticleSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="articleTotal" label="图文群发总数据">
          <ApiTester
            apiTitle="获取图文群发总数据"
            apiDescription="获取图文群发总数据，最大时间跨度为1天"
            requestMsg={getArticleTotalRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userReadSummary" label="图文统计数据">
          <ApiTester
            apiTitle="获取图文统计数据"
            apiDescription="获取图文统计数据，最大时间跨度为3天"
            requestMsg={getUserReadSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userShareSummary" label="图文分享数据">
          <ApiTester
            apiTitle="获取图文分享数据"
            apiDescription="获取图文分享数据，最大时间跨度为7天"
            requestMsg={getUserShareSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="userShareHourly" label="图文分享小时数据">
          <ApiTester
            apiTitle="获取图文分享小时数据"
            apiDescription="获取图文分享小时数据，最大时间跨度为1天"
            requestMsg={getUserShareHourlyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageSummary" label="消息发送概况数据">
          <ApiTester
            apiTitle="获取消息发送概况数据"
            apiDescription="获取消息发送概况数据，最大时间跨度为7天"
            requestMsg={getUpstreamMessageSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageHourly" label="消息分送分时数据">
          <ApiTester
            apiTitle="获取消息分送分时数据"
            apiDescription="获取消息分送分时数据，最大时间跨度为1天"
            requestMsg={getUpstreamMessageHourlyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageWeekly" label="消息发送周数据">
          <ApiTester
            apiTitle="获取消息发送周数据"
            apiDescription="获取消息发送周数据，最大时间跨度为30天"
            requestMsg={getUpstreamMessageWeeklyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageMonthly" label="消息发送月数据">
          <ApiTester
            apiTitle="获取消息发送月数据"
            apiDescription="获取消息发送月数据，最大时间跨度为30天"
            requestMsg={getUpstreamMessageMonthlyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageDistSummary" label="消息发送分布数据">
          <ApiTester
            apiTitle="获取消息发送分布数据"
            apiDescription="获取消息发送分布数据，最大时间跨度为15天"
            requestMsg={getUpstreamMessageDistSummaryRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageDistWeekly" label="消息发送分布周数据">
          <ApiTester
            apiTitle="获取消息发送分布周数据"
            apiDescription="获取消息发送分布周数据，最大时间跨度为30天"
            requestMsg={getUpstreamMessageDistWeeklyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="upstreamMessageDistMonthly" label="消息发送分布月数据">
          <ApiTester
            apiTitle="获取消息发送分布月数据"
            apiDescription="获取消息发送分布月数据，最大时间跨度为30天"
            requestMsg={getUpstreamMessageDistMonthlyRequest}
            requestParams={{
              begin_date: '', // 开始日期，格式为YYYY-MM-DD
              end_date: '' // 结束日期，格式为YYYY-MM-DD
            }}
            requiredParams={['begin_date', 'end_date']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default DataCubeApiPage; 