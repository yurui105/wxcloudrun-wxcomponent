package official_account

import (
	"net/http"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/menu/request"
	"github.com/gin-gonic/gin"
)

func MenuList(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.Get(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuGet(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.Get(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuCurrent(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.CurrentSelfMenu(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuCreate(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.Create(ctx.Request.Context(), []*request.Button{
		{
			Type: "view",
			Name: "最新文章",
			URL:  "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg5NDY5ODc5NA==&action=getalbum&album_id=2690448178684411909#wechat_redirect",
		},
		//{
		//	Name: "知识分类",
		//	SubButtons: []request.SubButton{
		//		{
		//			Type: "click",
		//			Name: "AI市场",
		//			URL:  "V1001_AI_MARKET",
		//		},
		//		{
		//			Type: "click",
		//			Name: "AI技术",
		//			Key:  "V1001_AI_TECH",
		//		},
		//		{
		//			Type: "click",
		//			Name: "AI运营",
		//			Key:  "V1001_AI_OPERATION",
		//		},
		//		{
		//			Type: "view",
		//			Name: "AI方案",
		//			Key:  "V1001_AI_SOLUTION",
		//		},
		//	},
		//}
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuCreateConditional(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.CreateConditional(ctx.Request.Context(), []*request.Button{
		{
			Type: "click",
			Name: "今日歌曲",
			Key:  "V1001_TODAY_MUSIC",
		},
	}, &request.RequestMatchRule{
		Sex:                "1",
		Country:            "中国",
		Province:           "广东",
		City:               "广州",
		ClientPlatformType: "2",
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuDelete(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.Delete(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuDeleteConditional(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.DeleteConditional(ctx.Request.Context(), 1)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func MenuMatch(ctx *gin.Context) {
	userID := ctx.Query("userID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Menu.TryMatch(ctx.Request.Context(), userID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
