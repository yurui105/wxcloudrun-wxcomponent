package official_account

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetTempQrCode 创建临时二维码
func GetTempQrCode(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.QRCode.Temporary(ctx.Request.Context(), "val1", 30*24*3600)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetForeverQrCode 创建永久二维码
func GetForeverQrCode(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.QRCode.Forever(ctx.Request.Context(), "val1")
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetQrCodeUrl 获取二维码网址
func GetQrCodeUrl(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	url := app.QRCode.URL("from")
	ctx.String(http.StatusOK, url)
}
