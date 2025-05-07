package official_account

import (
	"errors"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GetAppID 检查appid参数
func GetAppID(c *gin.Context) (string, bool) {
	appid := c.DefaultQuery("appid", "")
	if appid == "" {
		log.Error("缺少appid参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少appid参数"))
		return "", false
	}
	return appid, true
}

func GetOfficialAccountAppByContext(c *gin.Context) (*officialAccount.OfficialAccount, error) {
	appid, ok := GetAppID(c)
	if !ok {
		return nil, errors.New("缺少appid参数")
	}

	app, err := GetOfficialAccount(appid)
	if err != nil {
		log.Error("获取OfficialAccountApp失败，appid:" + appid)
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData(err.Error()))
		return nil, err
	}

	return app, nil
}
