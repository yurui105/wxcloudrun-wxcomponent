package c_officialaccount

import (
	"encoding/json"
	"net/http"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
)

// 获取发布列表响应
type GetPublicationRecordsResponse struct {
	TotalCount int             `json:"total_count"`
	ItemCount  int             `json:"item_count"`
	Item       []PublishedItem `json:"item"`
}

// 发布项
type PublishedItem struct {
	ArticleId  string         `json:"article_id"`
	Content    PublishContent `json:"content"`
	UpdateTime int64          `json:"update_time"`
}

// 发布内容
type PublishContent struct {
	NewsItem []NewsItem `json:"news_item"`
}

// GetPublicationRecords 获取成功发布列表
func GetPublicationRecords(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	offset, err := parseIntParam(c, "offset", 0)
	if err != nil {
		log.Error("解析offset参数失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("解析offset参数失败: "+err.Error()))
		return
	}

	count, err := parseIntParam(c, "count", 10)
	if err != nil {
		log.Error("解析count参数失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("解析count参数失败: "+err.Error()))
		return
	}

	if count < 1 || count > 20 {
		log.Error("count参数必须在1到20之间")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("count参数必须在1到20之间"))
		return
	}

	noContent, err := parseIntParam(c, "no_content", 0)
	if err != nil {
		log.Error("解析no_content参数失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("解析no_content参数失败: "+err.Error()))
		return
	}

	// 获取访问令牌
	accessToken, err := getAccessToken(appid)
	if err != nil {
		log.Error("获取访问令牌失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取访问令牌失败: "+err.Error()))
		return
	}

	// 构建请求参数
	requestData := map[string]interface{}{
		"offset":     offset,
		"count":      count,
		"no_content": noContent,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/cgi-bin/freepublish/batchget"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取发布列表失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取发布列表失败: "+err.Error()))
		return
	}

	// 解析响应
	var response GetPublicationRecordsResponse
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}
