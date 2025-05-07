package official_account

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ClearQuota godoc
// @Summary      公众号里清空api的调用quota：https://developers.weixin.qq.com/doc/offiaccount/openApi/clear_quota.html
// @Description.markdown official-account.clearQuota
// @Tags         OfficialAccount.base.ClearQuota
// @Router       /clearQuota [get]
func ClearQuota(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Base.ClearQuota(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetCallbackIP godoc
// @Summary  获取公众号回调的IP地址：https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_the_WeChat_server_IP_address.html
// @Description.markdown official-account.getCallbackIp
// @Tags         OfficialAccount.base.GetCallbackIP
// @Router       /getCallbackIp [get]
func GetCallbackIP(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Base.GetCallbackIP(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
