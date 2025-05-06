package c_officialaccount

import (
	"github.com/gin-gonic/gin"
)

// Routers 路由
func Routers(e *gin.RouterGroup) {
	g := e.Group("/officialaccount")

	// 原有的上传图片接口
	g.POST("/upload-image", UploadImage)

	// 草稿箱相关接口
	g.POST("/draft/add", AddDraft)       // 新建草稿
	g.GET("/draft/list", GetDraftList)   // 获取草稿列表
	g.GET("/draft/count", GetDraftCount) // 获取草稿总数

	// 发布能力相关接口
	g.GET("/publish/list", GetPublicationRecords) // 获取成功发布列表

	// 图文分析相关接口
	g.GET("/analytics/article/summary", GetArticleSummary) // 获取图文群发每日数据
	g.GET("/analytics/article/total", GetArticleTotal)     // 获取图文群发总数据
	g.GET("/analytics/user/read", GetUserRead)             // 获取图文统计数据
	g.GET("/analytics/user/read/hour", GetUserReadHour)    // 获取图文统计分时数据
	g.GET("/analytics/user/share", GetUserShare)           // 获取图文分享转发数据
	g.GET("/analytics/user/share/hour", GetUserShareHour)  // 获取图文分享转发分时数据

	// 广告分析相关接口
	g.GET("/analytics/ad/adpos", GetPublisherAdposGeneral)    // 获取公众号分广告位数据
	g.GET("/analytics/ad/cps", GetPublisherCpsGeneral)        // 获取公众号返佣商品数据
	g.GET("/analytics/ad/settlement", GetPublisherSettlement) // 获取公众号结算收入数据及结算主体信息
}
