package official_account

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AutoReply 获取当前设置的回复规则
func AutoReplyCurrent(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.AutoReply.Current(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}
	ctx.JSON(http.StatusOK, data)
}
