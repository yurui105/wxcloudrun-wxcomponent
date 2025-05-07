package official_account

import (
	"net/http"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/power"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/broadcasting/request"
	"github.com/gin-gonic/gin"
)

var testUserOpenID = "oF-S35jfUZNlcJ8RvtpqKaRbUON4"

func BroadcastSendText(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	message := ctx.DefaultPostForm("chat-bot", "hello, broadcasting test...")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendText(ctx.Request.Context(), message, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendImage(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	mediaID := ctx.DefaultPostForm("mediaID", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendImage(ctx.Request.Context(), mediaID, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendNews(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	mediaID := ctx.DefaultPostForm("mediaID", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendNews(ctx.Request.Context(), mediaID, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendVoice(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	mediaID := ctx.DefaultPostForm("mediaID", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendVoice(ctx.Request.Context(), mediaID, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendVideo(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	mediaID := ctx.DefaultPostForm("mediaID", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendVideo(ctx.Request.Context(), mediaID, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendCard(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	mediaID := ctx.DefaultPostForm("mediaID", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.SendCard(ctx.Request.Context(), mediaID, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, &power.HashMap{})

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastSendPreview(ctx *gin.Context) {
	openID := ctx.DefaultPostForm("openID", testUserOpenID)
	message := ctx.DefaultPostForm("chat-bot", "")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.PreviewText(ctx.Request.Context(), message, &request.Reception{
		ToUser: []string{openID},
		Filter: &request.Filter{
			IsToAll: false,
			TagID:   0,
		},
	}, "")

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastDelete(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.Delete(ctx.Request.Context(), msgID, 0)

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}

func BroadcastStatus(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Broadcasting.Status(ctx.Request.Context(), msgID)

	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, data)
}
