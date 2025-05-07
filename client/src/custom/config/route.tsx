import { IRoute } from "../../commonType";
import WeChatOfficialAccount from "../pages/WeChatOfficialAccount";

// 基础接口页面
import BaseApiPage from "../pages/WeChatOfficialAccount/Base";
import AssetApiPage from "../pages/WeChatOfficialAccount/Asset";
import JssdkApiPage from "../pages/WeChatOfficialAccount/Jssdk";
import UserApiPage from "../pages/WeChatOfficialAccount/User";
import UserTagApiPage from "../pages/WeChatOfficialAccount/UserTag";
import CustomerServiceApiPage from "../pages/WeChatOfficialAccount/CustomerService";
import PublishApiPage from "../pages/WeChatOfficialAccount/Publish";
import CardApiPage from "../pages/WeChatOfficialAccount/Card";
import DataCubeApiPage from "../pages/WeChatOfficialAccount/DataCube";
import QrcodeApiPage from "../pages/WeChatOfficialAccount/Qrcode";
import ShortUrlApiPage from "../pages/WeChatOfficialAccount/ShortUrl";
import ReplyApiPage from "../pages/WeChatOfficialAccount/Reply";
import OAuthApiPage from "../pages/WeChatOfficialAccount/OAuth";
import MenuApiPage from "../pages/WeChatOfficialAccount/Menu";
import BroadcastingApiPage from "../pages/WeChatOfficialAccount/Broadcasting";
import CommentApiPage from "../pages/WeChatOfficialAccount/Comment";
import GoodsApiPage from "../pages/WeChatOfficialAccount/Goods";
import CallbackApiPage from "../pages/WeChatOfficialAccount/Callback";
import TemplateMessageApiPage from "../pages/WeChatOfficialAccount/TemplateMessage";

// 页面路由
export const customRoute: IRoute = {
  // 公众号API测试平台
  wechatOfficialAccount: {
    label: '公众号API测试',
    path: '/wechat-official-account',
    element: <WeChatOfficialAccount />
  },
  // 基础接口
  baseApi: {
    label: '基础接口',
    path: '/wechat-official-account/base',
    element: <BaseApiPage />
  },
  // 素材管理
  assetApi: {
    label: '素材管理',
    path: '/wechat-official-account/asset',
    element: <AssetApiPage />
  },
  // JSSDK
  jssdkApi: {
    label: 'JSSDK',
    path: '/wechat-official-account/jssdk',
    element: <JssdkApiPage />
  },
  // 用户管理
  userApi: {
    label: '用户管理',
    path: '/wechat-official-account/user',
    element: <UserApiPage />
  },
  // 用户标签管理
  userTagApi: {
    label: '用户标签',
    path: '/wechat-official-account/user-tag',
    element: <UserTagApiPage />
  },
  // 客服消息
  customerServiceApi: {
    label: '客服消息',
    path: '/wechat-official-account/customer-service',
    element: <CustomerServiceApiPage />
  },
  // 草稿与发布
  publishApi: {
    label: '草稿与发布',
    path: '/wechat-official-account/publish',
    element: <PublishApiPage />
  },
  // 卡券
  cardApi: {
    label: '卡券',
    path: '/wechat-official-account/card',
    element: <CardApiPage />
  },
  // 数据统计
  dataCubeApi: {
    label: '数据统计',
    path: '/wechat-official-account/data-cube',
    element: <DataCubeApiPage />
  },
  // 二维码
  qrcodeApi: {
    label: '二维码',
    path: '/wechat-official-account/qrcode',
    element: <QrcodeApiPage />
  },
  // 短链接
  shortUrlApi: {
    label: '短链接',
    path: '/wechat-official-account/short-url',
    element: <ShortUrlApiPage />
  },
  // 自动回复
  replyApi: {
    label: '自动回复',
    path: '/wechat-official-account/reply',
    element: <ReplyApiPage />
  },
  // OAuth2认证
  oauthApi: {
    label: 'OAuth2认证',
    path: '/wechat-official-account/oauth',
    element: <OAuthApiPage />
  },
  // 菜单管理
  menuApi: {
    label: '菜单管理',
    path: '/wechat-official-account/menu',
    element: <MenuApiPage />
  },
  // 群发消息
  broadcastingApi: {
    label: '群发消息',
    path: '/wechat-official-account/broadcasting',
    element: <BroadcastingApiPage />
  },
  // 评论管理
  commentApi: {
    label: '评论管理',
    path: '/wechat-official-account/comment',
    element: <CommentApiPage />
  },
  // 返佣商品
  goodsApi: {
    label: '返佣商品',
    path: '/wechat-official-account/goods',
    element: <GoodsApiPage />
  },
  // 消息回调
  callbackApi: {
    label: '消息回调',
    path: '/wechat-official-account/callback',
    element: <CallbackApiPage />
  },
  // 模板消息
  templateMessageApi: {
    label: '模板消息',
    path: '/wechat-official-account/template-message',
    element: <TemplateMessageApiPage />
  }
}
