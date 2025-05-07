import React from 'react';
import { Layout, Row, Col, Divider } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';
import { customRoute } from '../../config/route';

const { Content } = Layout;

const WeChatOfficialAccount: React.FC = () => {
  const navigate = useNavigate();

  // 按类别组织API
  const apiGroups = [
    {
      title: '基础功能',
      items: [
        { key: 'baseApi', name: '基础接口', desc: '清空API调用配额、获取IP白名单等' },
        { key: 'jssdkApi', name: 'JSSDK', desc: 'JSSDK配置、获取ticket等' },
        { key: 'qrcodeApi', name: '二维码', desc: '生成临时和永久二维码' },
        { key: 'shortUrlApi', name: '短链接', desc: '长链接转短链接服务' },
        { key: 'replyApi', name: '自动回复', desc: '获取公众号自动回复规则' },
      ]
    },
    {
      title: '用户管理',
      items: [
        { key: 'userApi', name: '用户管理', desc: '获取用户基本信息、列表、黑名单等' },
        { key: 'userTagApi', name: '用户标签', desc: '用户标签管理、打标签等' },
        { key: 'oauthApi', name: 'OAuth认证', desc: '网页授权获取用户信息' },
      ]
    },
    {
      title: '消息管理',
      items: [
        { key: 'customerServiceApi', name: '客服消息', desc: '客服账号管理、发送消息等' },
        { key: 'templateMessageApi', name: '模板消息', desc: '发送模板消息、管理模板等' },
        { key: 'broadcastingApi', name: '群发消息', desc: '群发文本、图片、视频等消息' },
        { key: 'menuApi', name: '菜单管理', desc: '自定义菜单创建与管理' },
        { key: 'callbackApi', name: '消息回调', desc: '接收微信推送的消息和事件' },
      ]
    },
    {
      title: '内容管理',
      items: [
        { key: 'assetApi', name: '素材管理', desc: '临时素材和永久素材管理' },
        { key: 'publishApi', name: '草稿与发布', desc: '草稿箱管理、发布图文等' },
        { key: 'commentApi', name: '评论管理', desc: '图文消息留言管理' },
      ]
    },
    {
      title: '数据与营销',
      items: [
        { key: 'dataCubeApi', name: '数据统计', desc: '用户、图文、消息等数据分析' },
        { key: 'goodsApi', name: '返佣商品', desc: '导入商品、获取商品状态' },
        { key: 'cardApi', name: '卡券', desc: '卡券相关接口' },
      ]
    },
  ];

  const handleCardClick = (key: string) => {
    const route = customRoute[key as keyof typeof customRoute];
    if (route && route.path) {
      navigate(route.path);
    }
  };

  const cardStyle = {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    marginBottom: '16px'
  };

  const cardTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

  const cardSubtitle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px'
  };

  const itemCardStyle = {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    cursor: 'pointer',
    height: '150px',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'box-shadow 0.3s ease'
  };

  const itemCardHoverStyle = {
    ...itemCardStyle,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  };

  return (
    <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <div style={cardStyle}>
        <div style={cardTitle}>微信公众号API测试平台</div>
        <div style={cardSubtitle}>基于PowerWechat SDK的公众号接口测试</div>
        <p>
          本平台提供了对微信公众号API的完整测试能力，每个接口都可以单独测试，并提供实时的响应结果展示。
          所有接口都需要提供公众号的appid作为参数。
        </p>
        <Divider style={{ margin: '16px 0' }}/>
        
        {apiGroups.map((group, groupIndex) => (
          <div key={groupIndex} style={{ marginBottom: '20px' }}>
            <h3>{group.title}</h3>
            <Row gutter={[16, 16]}>
              {group.items.map((item, itemIndex) => (
                <Col key={itemIndex} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <div
                    style={itemCardStyle}
                    onClick={() => handleCardClick(item.key)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</div>
                    <div style={{ flex: 1 }}>{item.desc}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default WeChatOfficialAccount; 