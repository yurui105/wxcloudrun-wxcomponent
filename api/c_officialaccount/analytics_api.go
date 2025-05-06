package c_officialaccount

import (
	"encoding/json"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 图文分析请求参数
type ArticleAnalysisRequest struct {
	BeginDate string `form:"begin_date" binding:"required"`
	EndDate   string `form:"end_date" binding:"required"`
}

// GetArticleSummary 获取图文群发每日数据
func GetArticleSummary(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getarticlesummary"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文群发每日数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文群发每日数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetArticleTotal 获取图文群发总数据
func GetArticleTotal(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getarticletotal"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文群发总数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文群发总数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetUserRead 获取图文统计数据
func GetUserRead(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getuserread"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文统计数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文统计数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetUserReadHour 获取图文统计分时数据
func GetUserReadHour(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getuserreadhour"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文统计分时数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文统计分时数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetUserShare 获取图文分享转发数据
func GetUserShare(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getusershare"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文分享转发数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文分享转发数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetUserShareHour 获取图文分享转发分时数据
func GetUserShareHour(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	beginDate := c.DefaultQuery("begin_date", "")
	if beginDate == "" {
		log.Error("缺少begin_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少begin_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(beginDate, endDate)
	if err != nil {
		log.Error(err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData(err.Error()))
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
		"begin_date": beginDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/datacube/getusersharehour"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取图文分享转发分时数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取图文分享转发分时数据失败: "+err.Error()))
		return
	}

	// 解析响应
	var response interface{}
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}
