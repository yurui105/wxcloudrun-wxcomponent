import {IMenuList} from "../../commonType";
import { customRoute as routes } from './route';

// 页面menu
export const customMenuList: IMenuList = [
  {
    label: '公众号',
    icon: <div>📱</div>,
    item: [
      routes.officialAccount,
      routes.officialAccountDraft,
      routes.officialAccountPublish,
      routes.officialAccountAnalytics,
      routes.officialAccountImage
    ]
  }
]
