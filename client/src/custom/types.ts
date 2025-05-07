export interface IRequestMsg {
  url: string;
  method: "get" | "post" | "delete" | "put";
}

// API响应数据统一类型定义
export interface ApiResponse<T = any> {
  code: number;
  message?: string;
  errorMsg?: string;
  data?: T;
}

// 用户分析数据类型
export interface UserSummaryItem {
  ref_date: string;
  user_source: number;
  new_user: number;
  cancel_user: number;
}

export interface UserCumulateItem {
  ref_date: string;
  cumulate_user: number;
}

// 图文分析数据类型
export interface ArticleSummaryItem {
  ref_date: string;
  msgid: string;
  title: string;
  int_page_read_user: number;
  int_page_read_count: number;
  ori_page_read_user: number;
  ori_page_read_count: number;
  share_user: number;
  share_count: number;
  add_to_fav_user: number;
  add_to_fav_count: number;
}

export interface ArticleTotalItem {
  ref_date: string;
  msgid: string;
  title: string;
  url: string;
  total_read_user: number;
  total_read_count: number;
  total_share_user: number;
  total_share_count: number;
}

export interface UserReadSummaryItem {
  ref_date: string;
  int_page_read_user: number;
  int_page_read_count: number;
  ori_page_read_user: number;
  ori_page_read_count: number;
  share_user: number;
  share_count: number;
  add_to_fav_user: number;
  add_to_fav_count: number;
}

export interface UserShareSummaryItem {
  ref_date: string;
  share_user: number;
  share_count: number;
}

export interface UserShareHourlyItem {
  ref_date: string;
  ref_hour: number;
  share_user: number;
  share_count: number;
}

// 草稿数据类型
export interface NewsItem {
  title: string;
  author: string;
  digest: string;
  content: string;
  content_source_url: string;
  thumb_media_id: string;
  url?: string;
  need_open_comment?: number;
  only_fans_can_comment?: number;
}

export interface DraftItem {
  media_id: string;
  update_time: number;
  content: {
    news_item: NewsItem[];
  };
}

export interface DraftListResponse {
  item: DraftItem[];
  total_count: number;
}

export interface DraftCountResponse {
  total_count: number;
}

// 菜单数据类型
export interface MenuItem {
  type?: string;
  name: string;
  key?: string;
  url?: string;
  appid?: string;
  pagepath?: string;
  sub_button?: MenuItem[];
}

export interface MenuResponse {
  menu: {
    button: MenuItem[];
  };
}

// 评论数据类型
export interface CommentItem {
  user_comment_id: number;
  openid: string;
  create_time: number;
  content: string;
  comment_type: number;
  reply?: {
    content: string;
    create_time: number;
  };
}

export interface CommentListResponse {
  total: number;
  comment: CommentItem[];
}

// 模板消息数据类型
export interface TemplateItem {
  template_id: string;
  title: string;
  primary_industry: string;
  deputy_industry: string;
  content: string;
  example: string;
}

export interface TemplateListResponse {
  template_list: TemplateItem[];
}

export interface IndustryInfo {
  primary_industry: {
    first_class: string;
    second_class: string;
  };
  secondary_industry: {
    first_class: string;
    second_class: string;
  };
}

// 商品相关类型定义
export interface GoodsItem {
  goods_id: string;
  title: string;
  price: number;
  description: string;
  image_url?: string;
  create_time: number;
  update_time: number;
}

export interface GoodsListResponse {
  goods_list: GoodsItem[];
  total_count: number;
}

// 发布相关类型定义
export interface PublishItem {
  publish_id: string;
  title: string;
  content: string;
  digest: string;
  thumb_media_id?: string;
  status: number; // 0: 待发布, 1: 已发布, 2: 发布失败
  create_time: number;
  update_time: number;
}

export interface PublishListResponse {
  publish_list: PublishItem[];
  total_count: number;
} 