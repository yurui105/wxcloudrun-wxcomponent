package official_account

import (
	"net/http"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/user/request"
	"github.com/gin-gonic/gin"
)

// GetUserInfo 获取单个用户信息
func GetUserInfo(ctx *gin.Context) {
	openID := ctx.Query("openID")
	lang := ctx.Query("lang")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.Get(ctx.Request.Context(), openID, lang)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// 获取多个用户信息
func GetBatchUserInfo(ctx *gin.Context) {
	openID := ctx.Query("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.BatchGet(ctx.Request.Context(), &request.RequestBatchGetUserInfo{
		UserList: []*request.UserList{
			{
				Openid: openID,
			},
		},
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetUserList 获取用户列表
func GetUserList(ctx *gin.Context) {
	nextOpenId := ctx.Query("nextOpenId")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.List(ctx.Request.Context(), nextOpenId)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserRemark 修改用户备注
func UserRemark(ctx *gin.Context) {
	openID := ctx.Query("openID")
	remark := ctx.Query("remark")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.Remark(ctx.Request.Context(), openID, remark)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserBlock 拉黑用户
func UserBlock(ctx *gin.Context) {
	openID := ctx.Query("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.Block(ctx.Request.Context(), []string{openID})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserUnBlock 取消拉黑用户
func UserUnBlock(ctx *gin.Context) {
	openID := ctx.Query("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.Unblock(ctx.Request.Context(), []string{openID})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetUserBlacklist 获取用户列表
func GetUserBlacklist(ctx *gin.Context) {
	beginOpenid := ctx.Query("beginOpenid")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.Blacklist(ctx.Request.Context(), beginOpenid)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// UserChangeOpenID 账号迁移 openid 转换
func UserChangeOpenID(ctx *gin.Context) {
	oldAppId := ctx.Query("oldAppId")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.User.ChangeOpenID(ctx.Request.Context(), oldAppId, []string{})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
