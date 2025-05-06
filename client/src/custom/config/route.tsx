import { IRoute } from "../../commonType";
import OfficialAccount from "../pages/OfficialAccount";
import DraftManagement from "../pages/OfficialAccount/Draft";
import PublishManagement from "../pages/OfficialAccount/Publish";
import ImageUpload from "../pages/OfficialAccount/Image";
import AnalyticsPage from "../pages/OfficialAccount/Analytics";

// 页面路由
export const customRoute: IRoute = {
  // 公众号管理
  officialAccount: {
    label: '公众号管理',
    path: '/official-account',
    element: <OfficialAccount />
  },
  // 草稿箱管理
  officialAccountDraft: {
    label: '草稿箱管理',
    path: '/official-account/draft',
    element: <DraftManagement />
  },
  // 发布管理
  officialAccountPublish: {
    label: '发布管理',
    path: '/official-account/publish',
    element: <PublishManagement />
  },
  // 图文分析
  officialAccountAnalytics: {
    label: '数据分析',
    path: '/official-account/analytics',
    element: <AnalyticsPage />
  },
  // 图片上传
  officialAccountImage: {
    label: '图片上传',
    path: '/official-account/image',
    element: <ImageUpload />
  }
}
