import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Form, Input, Dialog, 
  MessagePlugin, Loading, Textarea 
} from 'tdesign-react';
import { PrimaryTableCol, TableRowData } from 'tdesign-react/es/table/type';
import { request } from '../../../utils/common';
import { 
  goodsListRequest as getGoodsListRequest,
  goodsAddRequest as addGoodsRequest,
  goodsGetRequest as getGoodsRequest
} from '../../../utils/apis';
import { GoodsItem, GoodsListResponse } from '../../../types';
import styles from './index.module.less';

// 响应数据类型，用于处理noLoginError返回的情况
interface ResponseData {
  code: number;
  errorMsg?: string;
  data?: any;
}

const GoodsManagement: React.FC = () => {
  const [goodsList, setGoodsList] = useState<GoodsItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appid, setAppid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [newGoods, setNewGoods] = useState<Partial<GoodsItem>>({
    title: '',
    price: 0,
    description: '',
    image_url: ''
  });

  // 获取商品列表
  const fetchGoodsList = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const response = await request({
        request: getGoodsListRequest,
        data: {
          appid,
          offset,
          count: pageSize
        }
      }) as ResponseData;
      
      if (response && response.code === 0 && response.data) {
        const data = response.data as GoodsListResponse;
        setGoodsList(data.goods_list || []);
        setTotalCount(data.total_count || 0);
      } else {
        MessagePlugin.error(response?.errorMsg || '获取商品列表失败');
      }
    } catch (error) {
      console.error('获取商品列表出错:', error);
      MessagePlugin.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 添加商品
  const addGoods = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }
    
    if (!newGoods.title || !newGoods.price || !newGoods.description) {
      MessagePlugin.error('请填写完整的商品信息');
      return;
    }
    
    setLoading(true);
    try {
      const response = await request({
        request: addGoodsRequest,
        data: {
          appid,
          goods: newGoods
        }
      }) as ResponseData;
      
      if (response && response.code === 0) {
        MessagePlugin.success('添加商品成功');
        setCreateDialogVisible(false);
        // 重置表单
        setNewGoods({
          title: '',
          price: 0,
          description: '',
          image_url: ''
        });
        // 刷新列表
        fetchGoodsList();
      } else {
        MessagePlugin.error(response?.errorMsg || '添加商品失败');
      }
    } catch (error) {
      console.error('添加商品出错:', error);
      MessagePlugin.error('添加商品失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除商品
  const deleteGoods = async (goods: GoodsItem) => {
    if (!goods) return;
    
    setLoading(true);
    try {
      const response = await request({
        request: getGoodsRequest,
        data: {
          appid,
          goods_id: goods.goods_id,
          action: 'delete'
        }
      }) as ResponseData;
      
      if (response && response.code === 0) {
        MessagePlugin.success('删除成功');
        // 刷新列表
        fetchGoodsList();
      } else {
        MessagePlugin.error(response?.errorMsg || '删除失败');
      }
    } catch (error) {
      console.error('删除商品出错:', error);
      MessagePlugin.error('删除失败');
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns: PrimaryTableCol<TableRowData>[] = [
    {
      title: '商品名称',
      colKey: 'title',
      render: (props) => {
        const row = props.row as GoodsItem;
        return row.title;
      }
    },
    {
      title: '价格',
      colKey: 'price',
      render: (props) => {
        const row = props.row as GoodsItem;
        return `¥${row.price.toFixed(2)}`;
      }
    },
    {
      title: '描述',
      colKey: 'description',
      render: (props) => {
        const row = props.row as GoodsItem;
        return row.description;
      }
    },
    {
      title: '图片',
      colKey: 'image_url',
      render: (props) => {
        const row = props.row as GoodsItem;
        return row.image_url ? (
          <img 
            src={row.image_url} 
            alt={row.title} 
            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
          />
        ) : '无图片';
      }
    },
    {
      title: '操作',
      colKey: 'operation',
      render: (props) => {
        const row = props.row as GoodsItem;
        return (
          <div>
            <Button 
              theme="danger" 
              variant="text" 
              onClick={() => deleteGoods(row)}
            >
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  // 分页变化
  const handlePageChange = (pageInfo: { current: number, pageSize: number }) => {
    setCurrentPage(pageInfo.current);
    setPageSize(pageInfo.pageSize);
  };

  // 监听页码变化重新获取数据
  useEffect(() => {
    if (appid) {
      fetchGoodsList();
    }
  }, [currentPage, pageSize, appid]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Form layout="inline">
          <Form.FormItem label="APPID">
            <Input 
              value={appid} 
              onChange={(value) => setAppid(String(value))} 
              placeholder="请输入公众号APPID" 
            />
          </Form.FormItem>
          <Form.FormItem>
            <Button theme="primary" onClick={fetchGoodsList}>查询</Button>
            <Button 
              theme="primary" 
              style={{ marginLeft: '8px' }}
              onClick={() => setCreateDialogVisible(true)}
            >
              添加商品
            </Button>
          </Form.FormItem>
        </Form>
      </div>

      <Loading loading={loading}>
        <Table
          data={goodsList}
          columns={columns}
          rowKey="goods_id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalCount,
            onChange: handlePageChange,
            showJumper: true,
            pageSizeOptions: [5, 10, 20]
          }}
          empty="暂无数据"
        />
      </Loading>

      {/* 添加商品对话框 */}
      <Dialog
        header="添加商品"
        visible={createDialogVisible}
        onClose={() => setCreateDialogVisible(false)}
        width={600}
        footer={
          <div>
            <Button onClick={() => setCreateDialogVisible(false)}>取消</Button>
            <Button theme="primary" loading={loading} onClick={addGoods}>确定</Button>
          </div>
        }
      >
        <div className={styles.createDialog}>
          <Form.FormItem label="商品名称">
            <Input 
              value={newGoods.title} 
              onChange={(value) => setNewGoods({ ...newGoods, title: String(value) })}
              placeholder="请输入商品名称"
            />
          </Form.FormItem>
          <Form.FormItem label="价格">
            <Input 
              type="number"
              value={newGoods.price} 
              onChange={(value) => setNewGoods({ ...newGoods, price: Number(value) })}
              placeholder="请输入商品价格"
            />
          </Form.FormItem>
          <Form.FormItem label="描述">
            <Textarea 
              value={newGoods.description} 
              onChange={(value) => setNewGoods({ ...newGoods, description: String(value) })}
              placeholder="请输入商品描述"
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.FormItem>
          <Form.FormItem label="图片URL">
            <Input 
              value={newGoods.image_url} 
              onChange={(value) => setNewGoods({ ...newGoods, image_url: String(value) })}
              placeholder="请输入商品图片URL"
            />
          </Form.FormItem>
        </div>
      </Dialog>
    </div>
  );
};

export default GoodsManagement; 