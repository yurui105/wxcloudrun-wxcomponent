package official_account

import (
	"github.com/ArtisanCloud/PowerLibs/v3/fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GetAuthCode(ctx *gin.Context) {

	//result, err := services.OfficialAccountApp.JSSDK.ConfigSignature(ctx, "text", "", 0)
	//if err != nil {
	//	panic(err.Error())
	//}
	//ctx.JSON(http.StatusOK, gin.H{"result": result})
	//return
	code := ctx.Query("code")
	state := ctx.Query("state")

	ctx.JSON(http.StatusOK, gin.H{"code": code, "state": state})
}

func UserFromCode(ctx *gin.Context) {
	code := ctx.Query("code")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	app.OAuth.SetScopes([]string{"snsapi_base"})
	user, err := app.OAuth.UserFromCode(code)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func UserFromToken(ctx *gin.Context) {
	token := ctx.Query("token")
	openID := ctx.Query("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	user, err := app.OAuth.UserFromToken(token, openID)
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{"code": 0, "openID": openID})
		return
	}
	rsToken := user.GetTokenResponse()
	fmt.Dump(rsToken, (*rsToken)["openid"])
	log.Println(err)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, user)
}
