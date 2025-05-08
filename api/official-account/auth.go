package official_account

import (
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/api/admin"
	"github.com/gin-gonic/gin"
)

func GetOfficialAccountInfo(c *gin.Context) {
	admin.GetAuthorizerListHandler(c)
	return
}
