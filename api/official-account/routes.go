package official_account

import (
	"github.com/gin-gonic/gin"
)

func Routers(g *gin.RouterGroup) {

	officialRouter := g.Group("/official-account")
	{
		// Base
		officialRouter.GET("/base/clearQuota", ClearQuota)
		officialRouter.GET("/base/callbackIP", GetCallbackIP)

		// jssdk
		officialRouter.GET("/jssdk/config", JSSDKBuildConfig)

		// 临时素材管理
		officialRouter.POST("/media/uploadImage", APIUploadImage)
		officialRouter.POST("/media/uploadVoice", APIUploadVoice)
		officialRouter.POST("/media/uploadVideo", APIUploadVideo)
		officialRouter.POST("/media/uploadThumb", APIUploadThumb)
		officialRouter.GET("/media/get", APIGetMedia)

		// 永久素材管理
		officialRouter.POST("/material/uploadImage", APIUploadMaterialImage)
		officialRouter.POST("/material/uploadArticleImage", APIUploadArticleImage)
		officialRouter.POST("/material/uploadVoice", APIUploadMaterialVoice)
		officialRouter.POST("/material/uploadVideo", APIUploadMaterialVideo)
		officialRouter.POST("/material/uploadThumb", APIUploadMaterialThumb)
		officialRouter.GET("/material/list", APIGetMaterialList)
		officialRouter.GET("/material/get", APIGetMaterial)

		// 用户管理
		officialRouter.GET("/user/get", GetUserInfo)
		officialRouter.GET("/user/batchGet", GetBatchUserInfo)
		officialRouter.GET("/user/list", GetUserList)
		officialRouter.POST("/user/remark", UserRemark)
		officialRouter.GET("/user/getBlockList", GetUserBlacklist)
		officialRouter.POST("/user/block", UserBlock)
		officialRouter.POST("/user/unBlock", UserUnBlock)
		officialRouter.POST("/user/changeOpenID", UserChangeOpenID)

		// 用户标签管理
		officialRouter.GET("/userTag/list", GetUserTagList)
		officialRouter.POST("/userTag", UserTagCreate)
		officialRouter.PUT("/userTag", UserTagUpdate)
		officialRouter.DELETE("/userTag", UserTagDelete)
		officialRouter.GET("/userTag/getUserTagsByOpenID", GetUserTagsByOpenID)
		officialRouter.GET("/userTag/getUsersOfTag", GetUsersOfTag)
		officialRouter.POST("/userTag/batchTagUser", UserTagBatchTagUsers)
		officialRouter.POST("/userTag/unBatchTagUser", UserTagBatchUnTagUsers)

		// 客服消息
		officialRouter.GET("/customerService/list", GetCustomerList)
		officialRouter.GET("/customerService/online", GetCustomerOnline)
		officialRouter.POST("/customerService/create", CustomerCreate)
		officialRouter.PUT("/customerService/update", CustomerUpdate)
		officialRouter.DELETE("/customerService/delete", CustomerDelete)
		officialRouter.POST("/customerService/setAvatar", CustomerSetAvatar)
		officialRouter.POST("/customerService/messages", CustomerMessages)
		officialRouter.POST("/customerService/invite", CustomerInvite)
		officialRouter.POST("/customerService/sendText", CustomerMessageSendText)
		officialRouter.POST("/customerService/sendImage", CustomerMessageSendImage)
		officialRouter.POST("/customerService/sendVideo", CustomerMessageSendVideo)
		officialRouter.POST("/customerService/sendVoice", CustomerMessageSendVoice)
		officialRouter.POST("/customerService/sendLink", CustomerMessageSendLink)
		officialRouter.POST("/customerService/sendMusic", CustomerMessageSendMusic)
		officialRouter.POST("/customerService/sendNews", CustomerMessageSendNews)
		officialRouter.POST("/customerService/sendMsgMenu", CustomerMessageSendMsgMenu)
		officialRouter.POST("/customerService/sendRaw", CustomerMessageSendRaw)
		officialRouter.POST("/customerService/send", CustomerMessageSend)

		// 客服会话控制
		officialRouter.POST("/customerServiceSession/create", CustomerSessionCreate)
		officialRouter.DELETE("/customerServiceSession/close", CustomerSessionClose)
		officialRouter.GET("/customerServiceSession/get", GetCustomerSession)
		officialRouter.GET("/customerServiceSession/list", CustomerSessionList)
		officialRouter.GET("/customerServiceSession/waiting", CustomerSessionWaiting)

		// 草稿发布
		officialRouter.GET("/publish/draftAdd", APIDraftAdd)
		officialRouter.GET("/publish/draftGet", APIDraftGet)
		officialRouter.GET("/publish/draftDelete", APIDraftDelete)
		officialRouter.GET("/publish/draftUpdate", APIDraftUpdate)
		officialRouter.GET("/publish/draftCount", APIDraftCount)
		officialRouter.GET("/publish/draftBatchGet", APIDraftBatchGet)
		officialRouter.GET("/publish/draftSwitch", APIDraftSwitch)
		officialRouter.GET("/publish/draftCheckSwitch", APIDraftCheckSwitch)
		officialRouter.GET("/publish/publishSubmit", APIPublishSubmit)
		officialRouter.GET("/publish/publishGet", APIPublishGet)
		officialRouter.GET("/publish/publishDelete", APIPublishDelete)
		officialRouter.GET("/publish/publishGetArticle", APIPublishGetArticle)
		officialRouter.GET("/publish/publishBatchGet", APIPublishBatchGet)

		// Card
		officialRouter.GET("/card/update", APIUpdate)

		// 数据统计
		officialRouter.GET("/dateCube/getUserSummary", GetUserSummary)
		officialRouter.GET("/dateCube/getUserCumulate", GetUserCumulate)
		officialRouter.GET("/dateCube/articleSummary", ArticleSummary)
		officialRouter.GET("/dateCube/articleTotal", ArticleTotal)
		officialRouter.GET("/dateCube/userReadSummary", UserReadSummary)
		officialRouter.GET("/dateCube/userShareSummary", UserShareSummary)
		officialRouter.GET("/dateCube/userShareHourly", UserShareHourly)
		officialRouter.GET("/dateCube/upstreamMessageSummary", UpstreamMessageSummary)
		officialRouter.GET("/dateCube/upstreamMessageHourly", UpstreamMessageHourly)
		officialRouter.GET("/dateCube/upstreamMessageWeekly", UpstreamMessageWeekly)
		officialRouter.GET("/dateCube/upstreamMessageMonthly", UpstreamMessageMonthly)
		officialRouter.GET("/dateCube/upstreamMessageDistSummary", UpstreamMessageDistSummary)
		officialRouter.GET("/dateCube/upstreamMessageDistWeekly", UpstreamMessageDistWeekly)
		officialRouter.GET("/dateCube/upstreamMessageDistMonthly", UpstreamMessageDistMonthly)

		// 生成二维码
		officialRouter.GET("/qrcode/temp", GetTempQrCode)
		officialRouter.GET("/qrcode/forever", GetForeverQrCode)

		// 短key托管
		officialRouter.GET("/shorten/gen", ShortGenKey)
		officialRouter.GET("/shorten/fetch", FetchShortGen)

		// 自动回复
		officialRouter.GET("/autoReply/current", AutoReplyCurrent)

		// OAUTH2
		officialRouter.GET("/oauth/getAuthCode", GetAuthCode)
		officialRouter.GET("/oauth/userFromCode", UserFromCode)
		officialRouter.GET("/oauth/userFromToken", UserFromToken)

		// 菜单
		officialRouter.GET("/menu/list", MenuList)
		officialRouter.GET("/menu/get", MenuGet)
		officialRouter.GET("/menu/current", MenuCurrent)
		officialRouter.POST("/menu/create", MenuCreate)
		officialRouter.POST("/menu/createConditional", MenuCreateConditional)
		officialRouter.DELETE("/menu/delete", MenuDelete)
		officialRouter.DELETE("/menu/deleteConditional", MenuDeleteConditional)
		officialRouter.DELETE("/menu/match", MenuMatch)

		// 消息群发
		officialRouter.POST("/broadcasting/text", BroadcastSendText)
		officialRouter.POST("/broadcasting/image", BroadcastSendImage)
		officialRouter.POST("/broadcasting/news", BroadcastSendNews)
		officialRouter.POST("/broadcasting/voice", BroadcastSendVoice)
		officialRouter.POST("/broadcasting/video", BroadcastSendVideo)
		officialRouter.POST("/broadcasting/card", BroadcastSendCard)
		officialRouter.POST("/broadcasting/preview", BroadcastSendPreview)
		officialRouter.DELETE("/broadcasting/delete", BroadcastDelete)
		officialRouter.GET("/broadcasting/status", BroadcastStatus)

		// 群发评论
		officialRouter.POST("/comment/open", CommentOpen)
		officialRouter.POST("/comment/close", CommentClose)
		officialRouter.DELETE("/comment/delete", CommentDelete)
		officialRouter.GET("/comment/list", CommentList)
		officialRouter.POST("/comment/markElect", CommentMarkElect)
		officialRouter.DELETE("/comment/unMarkElect", CommentUnMarkElect)
		officialRouter.POST("/comment/reply", CommentReply)
		officialRouter.DELETE("/comment/reply", CommentDeleteReply)

		// 返佣商品
		officialRouter.GET("/goods/list", GoodsList)
		officialRouter.GET("/goods/get", GoodsGet)
		officialRouter.GET("/goods/status", GoodsStatus)
		officialRouter.POST("/goods/add", GoodsAdd)
		officialRouter.PUT("/goods/update", GoodsUpdate)

		// 消息回调
		officialRouter.GET("/callback/message", CallbackVerify)
		officialRouter.POST("/callback/message", CallbackNotify)

		// 统一服务消息
		//officialRouter.POST("/uniformMessage/send", UniformMessageSend)

		officialRouter.GET("jssdk/getTicket", APITicketGet)

		// 模板消息
		officialRouter.GET("/templateMessage/getIndustry", TemplateMessageGetIndustry)
		officialRouter.GET("/templateMessage/getPrivateTemplates", GetPrivateTemplates)
		officialRouter.POST("/templateMessage/send", TemplateMessageSend)
		officialRouter.POST("/templateMessage/sendSubscribe", SendSubscribe)
		officialRouter.POST("/templateMessage/setIndustry", TemplateMessageSetIndustry)
		//officialRouter.POST("/templateMessage/addTemplate", TemplateMessageAddTemplate)
		officialRouter.DELETE("/templateMessage/delPrivateTemplate", DelPrivateTemplate)

	}
}
