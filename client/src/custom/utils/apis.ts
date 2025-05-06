import * as _apis from "../../utils/apis";

type IRequestMsg = {
    url: string
    method: "get" | "post" | "delete" | "put"
}

export const HOST = import.meta.env.DEV ? '/api/wxcomponent' : '/wxcomponent'

// 项目所有接口
export const apis = _apis

// 公众号接口
// 图片上传接口
export const uploadImageRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/upload-image`,
    method: 'post'
}

// 草稿箱相关接口
export const addDraftRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/draft/add`,
    method: 'post'
}

export const getDraftListRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/draft/list`,
    method: 'get'
}

export const getDraftCountRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/draft/count`,
    method: 'get'
}

// 发布能力相关接口
export const getPublicationRecordsRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/publish/list`,
    method: 'get'
}

// 图文分析相关接口
export const getArticleSummaryRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/article/summary`,
    method: 'get'
}

export const getArticleTotalRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/article/total`,
    method: 'get'
}

export const getUserReadRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/user/read`,
    method: 'get'
}

export const getUserReadHourRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/user/read/hour`,
    method: 'get'
}

export const getUserShareRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/user/share`,
    method: 'get'
}

export const getUserShareHourRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/user/share/hour`,
    method: 'get'
}

// 广告分析相关接口
export const getPublisherAdposGeneralRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/ad/adpos`,
    method: 'get'
}

export const getPublisherCpsGeneralRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/ad/cps`,
    method: 'get'
}

export const getPublisherSettlementRequest: IRequestMsg = {
    url: `${HOST}/officialaccount/analytics/ad/settlement`,
    method: 'get'
}

export const demoRequest: IRequestMsg =  {
    url: `${HOST}/test/demo`,
    method: 'post'
}
