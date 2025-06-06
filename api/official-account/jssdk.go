package official_account

import (
	"net/http"

	"github.com/ArtisanCloud/PowerLibs/v3/fmt"
	"github.com/ArtisanCloud/PowerLibs/v3/object"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/response"
	"github.com/gin-gonic/gin"
)

func APITicketGet(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	app.AccessToken.SetCacheKey("456")
	app.AccessToken.SetCustomToken = func(token *response.ResponseGetToken) interface{} {
		fmt.Dump("SetCustomToken", token)
		return nil
		//return "72_iraMZORXFIW6IM7bLyP3e3MMcEDkkrRXywvPAy3D7KI5lpSbMWh5ZgQUUSfl7tXg2Uq-aU_C3Vkj551IUTBPD58WFbgTdEt-csoGPQ8Hkf88DpUVs0MKtrDVhGwXNQiAFACSV"
	}
	app.AccessToken.GetCustomToken = func(key string, refresh bool) object.HashMap {
		fmt.Dump("GetCustomToken", key, refresh)
		return object.HashMap{
			"access_token": "72_ggzUdSgH99StJ2EhmuaIbHHUP9_3rDvdnQVQ9eoX5gwmNfuLpJgBUb5uPgdoh4aoVv9jYz3EKglRT73ppWqgRwzirNQM-bHaToDQ83ux1sFdCr5GK7jxYQfAESoCOEaAHAKWM",
			"expires_in":   float64(7200),
		}
	}

	res, err := app.JSSDK.GetTicket(c.Request.Context(), false, "jsapi")

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, res)
}

func JSSDKBuildConfig(ctx *gin.Context) {
	url := "https://www.artisan-cloud.com/"
	jsapiList := []string{"chooseImage"}
	debug := false
	beta := false
	openTagList := []string{"wx-open-launch-app", "wx-open-launch-weapp"}
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.JSSDK.BuildConfig(ctx.Request.Context(), jsapiList, debug, beta, openTagList, url)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
