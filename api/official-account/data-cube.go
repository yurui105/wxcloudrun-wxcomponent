package official_account

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// 用户分析

// GetUserSummary 获取用户增减数据
func GetUserSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.GetUserSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetUserCumulate 获取累计用户数据
func GetUserCumulate(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.GetUserCumulate(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// 图文分析

// ArticleSummary 获取图文群发每日数据
func ArticleSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.ArticleSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// ArticleTotal 获取图文群发总数据
func ArticleTotal(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.ArticleTotal(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserReadSummary 获取图文统计数据
func UserReadSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UserReadSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// TODO: 缺少getuserreadhour

// 获取图文统计分时数据（getuserreadhour）
//func UserShareHourly(ctx *gin.Context) {
//  from := ctx.Query("from")
//  to := ctx.Query("to")
//  app, err := GetOfficialAccountAppByContext(ctx)
//	if err != nil {
//		return
//	}
//        data, err := app.DataCube.UserShareHourly(from, to)
//  if err != nil {
//    ctx.String(http.StatusBadRequest, err.Error())
//    return
//  }
//  ctx.JSON(http.StatusOK, data)
//}

// UserShareSummary 获取图文分享转发数据
func UserShareSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserShareHourly 获取图文分享转发分时数据
func UserShareHourly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UserShareHourly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// 消息分析

// UpstreamMessageSummary 获取消息发送概况数据
func UpstreamMessageSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageHourly 获取消息发送分时数据
func UpstreamMessageHourly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageHourly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageWeekly 获取消息发送周数据
func UpstreamMessageWeekly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageWeekly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageMonthly 获取消息发送月数据
func UpstreamMessageMonthly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageMonthly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageDistSummary 获取消息发送分布数据
func UpstreamMessageDistSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageDistSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageDistWeekly 获取消息发送分布周数据
func UpstreamMessageDistWeekly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageDistWeekly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UpstreamMessageDistMonthly 获取消息发送分布月数据
func UpstreamMessageDistMonthly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.UpstreamMessageDistMonthly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// 广告分析

// 获取公众号分广告位数据
//func GetUserCumulate(ctx *gin.Context) {
//  from := ctx.Query("from")
//  to := ctx.Query("to")
//  app, err := GetOfficialAccountAppByContext(ctx)
//	if err != nil {
//		return
//	}
//        data, err := app.DataCube.GetUserCumulate(from, to)
//  if err != nil {
//    ctx.String(http.StatusBadRequest, err.Error())
//    return
//  }
//  ctx.JSON(http.StatusOK, data)
//}
//
//// 获取公众号返佣商品数据
//func GetUserCumulate(ctx *gin.Context) {
//  from := ctx.Query("from")
//  to := ctx.Query("to")
//  app, err := GetOfficialAccountAppByContext(ctx)
//	if err != nil {
//		return
//	}
//        data, err := app.DataCube.GetUserCumulate(from, to)
//  if err != nil {
//    ctx.String(http.StatusBadRequest, err.Error())
//    return
//  }
//  ctx.JSON(http.StatusOK, data)
//}
//
//// 获取公众号结算收入数据及结算主体信息
//func GetUserCumulate(ctx *gin.Context) {
//  from := ctx.Query("from")
//  to := ctx.Query("to")
//  app, err := GetOfficialAccountAppByContext(ctx)
//	if err != nil {
//		return
//	}
//        data, err := app.DataCube.GetUserCumulate(from, to)
//  if err != nil {
//    ctx.String(http.StatusBadRequest, err.Error())
//    return
//  }
//  ctx.JSON(http.StatusOK, data)
//}

// 接口分析

// InterfaceSummary 获取接口分析数据
func InterfaceSummary(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.InterfaceSummary(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// InterfaceSummaryHourly 获取接口分析分时数据
func InterfaceSummaryHourly(ctx *gin.Context) {
	from := ctx.Query("from")
	to := ctx.Query("to")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.DataCube.InterfaceSummaryHourly(ctx.Request.Context(), from, to)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
