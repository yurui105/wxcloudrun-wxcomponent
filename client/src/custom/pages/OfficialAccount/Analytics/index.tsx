import React, { useState } from 'react';
import { Tabs, Form, Input, Button, DatePicker, MessagePlugin, Loading, Table } from 'tdesign-react';
import { request } from '../../../utils/common';
import { 
  getArticleSummaryRequest,
  getArticleTotalRequest,
  getUserReadRequest,
  getUserReadHourRequest,
  getUserShareRequest,
  getUserShareHourRequest,
  getPublisherAdposGeneralRequest,
  getPublisherCpsGeneralRequest,
  getPublisherSettlementRequest
} from '../../../utils/apis';
import styles from './index.module.less';

// 定义Tab类型
type TabValue = 'articleSummary' | 'articleTotal' | 'userRead' | 'userReadHour' | 'userShare' | 'userShareHour' | 'adpos' | 'cps' | 'settlement';

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('articleSummary');
  const [appid, setAppid] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // 日期选择处理
  const handleDateChange = (value: string, field: 'begin' | 'end') => {
    if (field === 'begin') {
      setBeginDate(value);
    } else {
      setEndDate(value);
    }
  };

  // 查询数据
  const fetchData = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }

    if (!beginDate || !endDate) {
      MessagePlugin.error('请选择开始和结束日期');
      return;
    }

    setLoading(true);
    try {
      let requestApi;
      const params = { appid, begin_date: beginDate, end_date: endDate };

      // 根据当前Tab选择API
      switch (activeTab) {
        case 'articleSummary':
          requestApi = getArticleSummaryRequest;
          break;
        case 'articleTotal':
          requestApi = getArticleTotalRequest;
          break;
        case 'userRead':
          requestApi = getUserReadRequest;
          break;
        case 'userReadHour':
          requestApi = getUserReadHourRequest;
          break;
        case 'userShare':
          requestApi = getUserShareRequest;
          break;
        case 'userShareHour':
          requestApi = getUserShareHourRequest;
          break;
        case 'adpos':
          requestApi = getPublisherAdposGeneralRequest;
          break;
        case 'cps':
          requestApi = getPublisherCpsGeneralRequest;
          break;
        case 'settlement':
          requestApi = getPublisherSettlementRequest;
          break;
      }

      const response = await request({
        request: requestApi,
        data: params
      });

      if (response && response.code === 0 && response.data) {
        // 根据不同API处理响应数据
        processResponseData(response.data);
      } else {
        MessagePlugin.error(response?.errorMsg || '获取数据失败');
        setTableData([]);
        setColumns([]);
      }
    } catch (error) {
      console.error('获取数据出错:', error);
      MessagePlugin.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理响应数据，设置表格列和数据
  const processResponseData = (data: any) => {
    // 根据当前选中的Tab处理不同的数据结构
    switch (activeTab) {
      case 'articleSummary':
        if (data.list && data.list.length > 0) {
          // 文章每日数据
          setColumns([
            { title: '日期', colKey: 'ref_date' },
            { title: '图文ID', colKey: 'msgid' },
            { title: '图文标题', colKey: 'title' },
            { title: '阅读人数', colKey: 'int_page_read_user' },
            { title: '阅读次数', colKey: 'int_page_read_count' },
            { title: '分享人数', colKey: 'share_user' },
            { title: '分享次数', colKey: 'share_count' },
            { title: '收藏人数', colKey: 'add_to_fav_user' },
            { title: '收藏次数', colKey: 'add_to_fav_count' }
          ]);
          setTableData(data.list);
        } else {
          MessagePlugin.info('暂无数据');
          setTableData([]);
        }
        break;
        
      case 'articleTotal':
        if (data.list && data.list.length > 0) {
          // 图文群发总数据
          setColumns([
            { title: '日期', colKey: 'ref_date' },
            { title: '图文ID', colKey: 'msgid' },
            { title: '图文标题', colKey: 'title' },
            { title: '图文链接', colKey: 'url' },
            { title: '总阅读人数', colKey: 'total_read_user' },
            { title: '总阅读次数', colKey: 'total_read_count' },
            { title: '总分享人数', colKey: 'total_share_user' },
            { title: '总分享次数', colKey: 'total_share_count' }
          ]);
          setTableData(data.list);
        } else {
          MessagePlugin.info('暂无数据');
          setTableData([]);
        }
        break;
        
      case 'userRead':
      case 'userReadHour':
      case 'userShare':
      case 'userShareHour':
        if (data.list && data.list.length > 0) {
          // 动态生成列
          const firstItem = data.list[0];
          const dynamicColumns: any[] = [{ title: '日期', colKey: 'ref_date' }];
          
          // 对于userReadHour和userShareHour添加小时列
          if (activeTab === 'userReadHour' || activeTab === 'userShareHour') {
            dynamicColumns.push({ title: '小时', colKey: 'ref_hour' });
          }
          
          // 添加其他数据列
          Object.keys(firstItem).forEach(key => {
            if (key !== 'ref_date' && key !== 'ref_hour') {
              // 格式化列标题
              let title = key.replace(/_/g, ' ');
              title = title.charAt(0).toUpperCase() + title.slice(1);
              dynamicColumns.push({ title, colKey: key });
            }
          });
          
          setColumns(dynamicColumns);
          setTableData(data.list);
        } else {
          MessagePlugin.info('暂无数据');
          setTableData([]);
        }
        break;
        
      case 'adpos':
      case 'cps':
      case 'settlement':
        if (data.list && data.list.length > 0) {
          // 动态生成列
          const firstItem = data.list[0];
          const dynamicColumns: any[] = [];
          
          // 添加数据列
          Object.keys(firstItem).forEach(key => {
            // 格式化列标题
            let title = key.replace(/_/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            dynamicColumns.push({ title, colKey: key });
          });
          
          setColumns(dynamicColumns);
          setTableData(data.list);
        } else {
          MessagePlugin.info('暂无数据');
          setTableData([]);
        }
        break;
        
      default:
        setTableData([]);
        setColumns([]);
    }
  };

  // Tab切换
  const handleTabChange = (value: TabValue) => {
    setActiveTab(value);
    // 清空当前数据
    setTableData([]);
    setColumns([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.queryForm}>
        <Form layout="inline">
          <Form.FormItem label="APPID">
            <Input 
              value={appid} 
              onChange={(value) => setAppid(String(value))} 
              placeholder="请输入公众号APPID" 
            />
          </Form.FormItem>
          <Form.FormItem label="开始日期">
            <DatePicker 
              value={beginDate}
              onChange={(value) => handleDateChange(value as string, 'begin')}
              mode="date"
              format="YYYY-MM-DD"
            />
          </Form.FormItem>
          <Form.FormItem label="结束日期">
            <DatePicker 
              value={endDate}
              onChange={(value) => handleDateChange(value as string, 'end')}
              mode="date"
              format="YYYY-MM-DD"
            />
          </Form.FormItem>
          <Form.FormItem>
            <Button theme="primary" onClick={fetchData}>查询</Button>
          </Form.FormItem>
        </Form>
      </div>

      <Tabs 
        value={activeTab} 
        onChange={(value) => handleTabChange(value as TabValue)}
      >
        <Tabs.TabPanel value="articleSummary" label="文章每日数据" />
        <Tabs.TabPanel value="articleTotal" label="图文群发总数据" />
        <Tabs.TabPanel value="userRead" label="用户阅读数据" />
        <Tabs.TabPanel value="userReadHour" label="用户阅读分时数据" />
        <Tabs.TabPanel value="userShare" label="用户分享数据" />
        <Tabs.TabPanel value="userShareHour" label="用户分享分时数据" />
        <Tabs.TabPanel value="adpos" label="广告位数据" />
        <Tabs.TabPanel value="cps" label="返佣商品数据" />
        <Tabs.TabPanel value="settlement" label="结算收入数据" />
      </Tabs>

      <div className={styles.tableContainer}>
        <Loading loading={loading}>
          {tableData.length > 0 ? (
            <Table
              data={tableData}
              columns={columns as any}
              rowKey="ref_date"
              pagination={{
                pageSize: 10,
                showJumper: true,
              }}
            />
          ) : (
            <div className={styles.emptyData}>
              请选择条件并点击查询按钮获取数据
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
};

export default AnalyticsPage; 