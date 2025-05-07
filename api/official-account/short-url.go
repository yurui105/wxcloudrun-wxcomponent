package official_account

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ShortGenKey 短key托管
func ShortGenKey(ctx *gin.Context) {
	longData := ctx.DefaultQuery("longData", "longData test.....")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.URL.ShortGenKey(ctx.Request.Context(), longData, 30*24*3600)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}
	ctx.JSON(http.StatusOK, data)
}

// FetchShortGen 短key还原
func FetchShortGen(ctx *gin.Context) {
	shortKey := ctx.Query("shortKey")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.URL.FetchShorten(ctx.Request.Context(), shortKey)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}
	ctx.JSON(http.StatusOK, data)
}
