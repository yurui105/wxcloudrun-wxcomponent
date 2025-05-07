import {IMenuList} from "../../commonType";
import { customRoute as routes } from './route';

// 页面menu
export const customMenuList: IMenuList = [
    {
        label: '微信公众号API',
        icon: <div>🔌</div>,
        item: [
            routes.wechatOfficialAccount,
            {
                ...routes.baseApi,
                hideItem: []
            },
            {
                ...routes.assetApi,
                hideItem: []
            },
            {
                ...routes.jssdkApi,
                hideItem: []
            },
            {
                ...routes.userApi,
                hideItem: []
            },
            {
                ...routes.userTagApi,
                hideItem: []
            },
            {
                ...routes.customerServiceApi,
                hideItem: []
            },
            {
                ...routes.publishApi,
                hideItem: []
            },
            {
                ...routes.cardApi,
                hideItem: []
            },
            {
                ...routes.dataCubeApi,
                hideItem: []
            },
            {
                ...routes.qrcodeApi,
                hideItem: []
            },
            {
                ...routes.shortUrlApi,
                hideItem: []
            },
            {
                ...routes.replyApi,
                hideItem: []
            },
            {
                ...routes.oauthApi,
                hideItem: []
            },
            {
                ...routes.menuApi,
                hideItem: []
            },
            {
                ...routes.broadcastingApi,
                hideItem: []
            },
            {
                ...routes.commentApi,
                hideItem: []
            },
            {
                ...routes.goodsApi,
                hideItem: []
            },
            {
                ...routes.callbackApi,
                hideItem: []
            },
            {
                ...routes.templateMessageApi,
                hideItem: []
            }
        ]
    }
]
