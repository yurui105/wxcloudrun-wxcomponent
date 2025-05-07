package official_account

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func APIUpdate(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Card.Update(ctx.Request.Context(),
		"ph_gmt7cUVrlRk8swPwx7aDyF-pg",
		"member_card",
		nil,
	)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
