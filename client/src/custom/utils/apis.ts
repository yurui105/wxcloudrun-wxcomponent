import * as _apis from "../../utils/apis";

export interface IRequestMsg {
    url: string
    method: "get" | "post" | "delete" | "put"
}

export const HOST = import.meta.env.DEV ? '/api/wxcomponent' : '/wxcomponent';

// 项目所有接口
export const apis = _apis;

// 公众号基础接口
export const clearQuotaRequest: IRequestMsg = {
    url: `${HOST}/official-account/base/clearQuota`,
    method: 'get'
};

export const getCallbackIPRequest: IRequestMsg = {
    url: `${HOST}/official-account/base/callbackIP`,
    method: 'get'
};

// JSSDK相关接口
export const jssdkConfigRequest: IRequestMsg = {
    url: `${HOST}/official-account/jssdk/config`,
    method: 'get'
};

export const jssdkGetTicketRequest: IRequestMsg = {
    url: `${HOST}/official-account/jssdk/getTicket`,
    method: 'get'
};

// 素材管理接口
export const uploadImageRequest: IRequestMsg = {
    url: `${HOST}/official-account/media/uploadImage`,
    method: 'post'
};

export const uploadVoiceRequest: IRequestMsg = {
    url: `${HOST}/official-account/media/uploadVoice`,
    method: 'post'
};

export const uploadVideoRequest: IRequestMsg = {
    url: `${HOST}/official-account/media/uploadVideo`,
    method: 'post'
};

export const uploadThumbRequest: IRequestMsg = {
    url: `${HOST}/official-account/media/uploadThumb`,
    method: 'post'
};

export const getMediaRequest: IRequestMsg = {
    url: `${HOST}/official-account/media/get`,
    method: 'get'
};

// 永久素材管理
export const uploadMaterialImageRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/uploadImage`,
    method: 'post'
};

export const uploadArticleImageRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/uploadArticleImage`,
    method: 'post'
};

export const uploadMaterialVoiceRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/uploadVoice`,
    method: 'post'
};

export const uploadMaterialVideoRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/uploadVideo`,
    method: 'post'
};

export const uploadMaterialThumbRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/uploadThumb`,
    method: 'post'
};

export const getMaterialListRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/list`,
    method: 'get'
};

export const getMaterialRequest: IRequestMsg = {
    url: `${HOST}/official-account/material/get`,
    method: 'get'
};

// 用户管理接口
export const getUserInfoRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/get`,
    method: 'get'
};

export const getBatchUserInfoRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/batchGet`,
    method: 'get'
};

export const getUserListRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/list`,
    method: 'get'
};

export const userRemarkRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/remark`,
    method: 'post'
};

export const getUserBlacklistRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/getBlockList`,
    method: 'get'
};

export const userBlockRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/block`,
    method: 'post'
};

export const userUnBlockRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/unBlock`,
    method: 'post'
};

export const userChangeOpenIDRequest: IRequestMsg = {
    url: `${HOST}/official-account/user/changeOpenID`,
    method: 'post'
};

// 用户标签管理
export const getUserTagListRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag/list`,
    method: 'get'
};

export const userTagCreateRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag`,
    method: 'post'
};

export const userTagUpdateRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag`,
    method: 'put'
};

export const userTagDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag`,
    method: 'delete'
};

export const getUserTagsByOpenIDRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag/getUserTagsByOpenID`,
    method: 'get'
};

export const getUsersOfTagRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag/getUsersOfTag`,
    method: 'get'
};

export const userTagBatchTagUsersRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag/batchTagUser`,
    method: 'post'
};

export const userTagBatchUnTagUsersRequest: IRequestMsg = {
    url: `${HOST}/official-account/userTag/unBatchTagUser`,
    method: 'post'
};

// 客服消息接口
export const getCustomerListRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/list`,
    method: 'get'
};

export const getCustomerOnlineRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/online`,
    method: 'get'
};

export const customerCreateRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/create`,
    method: 'post'
};

export const customerUpdateRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/update`,
    method: 'put'
};

export const customerDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/delete`,
    method: 'delete'
};

export const customerSetAvatarRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/setAvatar`,
    method: 'post'
};

export const customerMessagesRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/messages`,
    method: 'post'
};

export const customerInviteRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/invite`,
    method: 'post'
};

export const customerMessageSendTextRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendText`,
    method: 'post'
};

export const customerMessageSendImageRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendImage`,
    method: 'post'
};

export const customerMessageSendVideoRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendVideo`,
    method: 'post'
};

export const customerMessageSendVoiceRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendVoice`,
    method: 'post'
};

export const customerMessageSendLinkRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendLink`,
    method: 'post'
};

export const customerMessageSendMusicRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendMusic`,
    method: 'post'
};

export const customerMessageSendNewsRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendNews`,
    method: 'post'
};

export const customerMessageSendMsgMenuRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendMsgMenu`,
    method: 'post'
};

export const customerMessageSendRawRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/sendRaw`,
    method: 'post'
};

export const customerMessageSendRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerService/send`,
    method: 'post'
};

// 客服会话控制
export const customerSessionCreateRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerServiceSession/create`,
    method: 'post'
};

export const customerSessionCloseRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerServiceSession/close`,
    method: 'delete'
};

export const getCustomerSessionRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerServiceSession/get`,
    method: 'get'
};

export const customerSessionListRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerServiceSession/list`,
    method: 'get'
};

export const customerSessionWaitingRequest: IRequestMsg = {
    url: `${HOST}/official-account/customerServiceSession/waiting`,
    method: 'get'
};

// 草稿发布相关接口
export const draftAddRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftAdd`,
    method: 'get'
};

export const draftGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftGet`,
    method: 'get'
};

export const draftDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftDelete`,
    method: 'get'
};

export const draftUpdateRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftUpdate`,
    method: 'get'
};

export const draftCountRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftCount`,
    method: 'get'
};

export const draftBatchGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftBatchGet`,
    method: 'get'
};

export const draftSwitchRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftSwitch`,
    method: 'get'
};

export const draftCheckSwitchRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/draftCheckSwitch`,
    method: 'get'
};

export const publishSubmitRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/publishSubmit`,
    method: 'get'
};

export const publishGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/publishGet`,
    method: 'get'
};

export const publishDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/publishDelete`,
    method: 'get'
};

export const publishGetArticleRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/publishGetArticle`,
    method: 'get'
};

export const publishBatchGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/publish/publishBatchGet`,
    method: 'get'
};

// 卡券接口
export const cardUpdateRequest: IRequestMsg = {
    url: `${HOST}/official-account/card/update`,
    method: 'get'
};

// 数据统计接口
export const getUserSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/getUserSummary`,
    method: 'get'
};

export const getUserCumulateRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/getUserCumulate`,
    method: 'get'
};

export const getArticleSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/articleSummary`,
    method: 'get'
};

export const getArticleTotalRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/articleTotal`,
    method: 'get'
};

export const getUserReadSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/userReadSummary`,
    method: 'get'
};

export const getUserShareSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/userShareSummary`,
    method: 'get'
};

export const getUserShareHourlyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/userShareHourly`,
    method: 'get'
};

export const getUpstreamMessageSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageSummary`,
    method: 'get'
};

export const getUpstreamMessageHourlyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageHourly`,
    method: 'get'
};

export const getUpstreamMessageWeeklyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageWeekly`,
    method: 'get'
};

export const getUpstreamMessageMonthlyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageMonthly`,
    method: 'get'
};

export const getUpstreamMessageDistSummaryRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageDistSummary`,
    method: 'get'
};

export const getUpstreamMessageDistWeeklyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageDistWeekly`,
    method: 'get'
};

export const getUpstreamMessageDistMonthlyRequest: IRequestMsg = {
    url: `${HOST}/official-account/dateCube/upstreamMessageDistMonthly`,
    method: 'get'
};

// 二维码接口
export const getTempQrCodeRequest: IRequestMsg = {
    url: `${HOST}/official-account/qrcode/temp`,
    method: 'get'
};

export const getForeverQrCodeRequest: IRequestMsg = {
    url: `${HOST}/official-account/qrcode/forever`,
    method: 'get'
};

// 短链接接口
export const shortGenKeyRequest: IRequestMsg = {
    url: `${HOST}/official-account/shorten/gen`,
    method: 'get'
};

export const fetchShortGenRequest: IRequestMsg = {
    url: `${HOST}/official-account/shorten/fetch`,
    method: 'get'
};

// 自动回复
export const autoReplyCurrentRequest: IRequestMsg = {
    url: `${HOST}/official-account/autoReply/current`,
    method: 'get'
};

// OAuth接口
export const getAuthCodeRequest: IRequestMsg = {
    url: `${HOST}/official-account/oauth/getAuthCode`,
    method: 'get'
};

export const userFromCodeRequest: IRequestMsg = {
    url: `${HOST}/official-account/oauth/userFromCode`,
    method: 'get'
};

export const userFromTokenRequest: IRequestMsg = {
    url: `${HOST}/official-account/oauth/userFromToken`,
    method: 'get'
};

// 菜单接口
export const menuListRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/list`,
    method: 'get'
};

export const menuGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/get`,
    method: 'get'
};

export const menuCurrentRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/current`,
    method: 'get'
};

export const menuCreateRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/create`,
    method: 'post'
};

export const menuCreateConditionalRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/createConditional`,
    method: 'post'
};

export const menuDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/delete`,
    method: 'delete'
};

export const menuDeleteConditionalRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/deleteConditional`,
    method: 'delete'
};

export const menuMatchRequest: IRequestMsg = {
    url: `${HOST}/official-account/menu/match`,
    method: 'delete'
};

// 群发消息接口
export const broadcastSendTextRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/text`,
    method: 'post'
};

export const broadcastSendImageRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/image`,
    method: 'post'
};

export const broadcastSendNewsRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/news`,
    method: 'post'
};

export const broadcastSendVoiceRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/voice`,
    method: 'post'
};

export const broadcastSendVideoRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/video`,
    method: 'post'
};

export const broadcastSendCardRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/card`,
    method: 'post'
};

export const broadcastSendPreviewRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/preview`,
    method: 'post'
};

export const broadcastDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/delete`,
    method: 'delete'
};

export const broadcastStatusRequest: IRequestMsg = {
    url: `${HOST}/official-account/broadcasting/status`,
    method: 'get'
};

// 群发评论接口
export const commentOpenRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/open`,
    method: 'post'
};

export const commentCloseRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/close`,
    method: 'post'
};

export const commentDeleteRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/delete`,
    method: 'delete'
};

export const commentListRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/list`,
    method: 'get'
};

export const commentMarkElectRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/markElect`,
    method: 'post'
};

export const commentUnMarkElectRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/unMarkElect`,
    method: 'delete'
};

export const commentReplyRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/reply`,
    method: 'post'
};

export const commentDeleteReplyRequest: IRequestMsg = {
    url: `${HOST}/official-account/comment/reply`,
    method: 'delete'
};

// 返佣商品接口
export const goodsListRequest: IRequestMsg = {
    url: `${HOST}/official-account/goods/list`,
    method: 'get'
};

export const goodsGetRequest: IRequestMsg = {
    url: `${HOST}/official-account/goods/get`,
    method: 'get'
};

export const goodsStatusRequest: IRequestMsg = {
    url: `${HOST}/official-account/goods/status`,
    method: 'get'
};

export const goodsAddRequest: IRequestMsg = {
    url: `${HOST}/official-account/goods/add`,
    method: 'post'
};

export const goodsUpdateRequest: IRequestMsg = {
    url: `${HOST}/official-account/goods/update`,
    method: 'put'
};

// 消息回调接口
export const callbackVerifyRequest: IRequestMsg = {
    url: `${HOST}/official-account/callback/message`,
    method: 'get'
};

export const callbackNotifyRequest: IRequestMsg = {
    url: `${HOST}/official-account/callback/message`,
    method: 'post'
};

// 模板消息接口
export const templateMessageGetIndustryRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/getIndustry`,
    method: 'get'
};

export const getPrivateTemplatesRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/getPrivateTemplates`,
    method: 'get'
};

export const templateMessageSendRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/send`,
    method: 'post'
};

export const sendSubscribeRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/sendSubscribe`,
    method: 'post'
};

export const templateMessageSetIndustryRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/setIndustry`,
    method: 'post'
};

export const delPrivateTemplateRequest: IRequestMsg = {
    url: `${HOST}/official-account/templateMessage/delPrivateTemplate`,
    method: 'delete'
};
