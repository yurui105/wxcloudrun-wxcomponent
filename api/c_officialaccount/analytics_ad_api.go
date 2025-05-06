package c_officialaccount

import (
	"encoding/json"
	"net/http"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
)

// 广告分析请求参数
type AdAnalysisRequest struct {
	Action    string `form:"action" binding:"required"`
	StartDate string `form:"start_date" binding:"required"`
	EndDate   string `form:"end_date" binding:"required"`
}

// GetPublisherAdposGeneral 获取公众号分广告位数据
func GetPublisherAdposGeneral(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	action := c.DefaultQuery("action", "")
	if action == "" {
		log.Error("缺少action参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少action参数"))
		return
	}

	startDate := c.DefaultQuery("start_date", "")
	if startDate == "" {
		log.Error("缺少start_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少start_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(startDate, endDate)
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
		"action":     action,
		"start_date": startDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/publisher/stat?action=publisher_adpos_general"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取公众号分广告位数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取公众号分广告位数据失败: "+err.Error()))
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

// GetPublisherCpsGeneral 获取公众号返佣商品数据
func GetPublisherCpsGeneral(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	action := c.DefaultQuery("action", "")
	if action == "" {
		log.Error("缺少action参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少action参数"))
		return
	}

	startDate := c.DefaultQuery("start_date", "")
	if startDate == "" {
		log.Error("缺少start_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少start_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(startDate, endDate)
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
		"action":     action,
		"start_date": startDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/publisher/stat?action=publisher_cps_general"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取公众号返佣商品数据失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取公众号返佣商品数据失败: "+err.Error()))
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

// GetPublisherSettlement 获取公众号结算收入数据及结算主体信息
func GetPublisherSettlement(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	action := c.DefaultQuery("action", "")
	if action == "" {
		log.Error("缺少action参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少action参数"))
		return
	}

	startDate := c.DefaultQuery("start_date", "")
	if startDate == "" {
		log.Error("缺少start_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少start_date参数"))
		return
	}

	endDate := c.DefaultQuery("end_date", "")
	if endDate == "" {
		log.Error("缺少end_date参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少end_date参数"))
		return
	}

	// 验证日期格式和范围
	_, _, err := validateDateRange(startDate, endDate)
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
		"action":     action,
		"start_date": startDate,
		"end_date":   endDate,
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/publisher/stat?action=publisher_settlement"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取公众号结算收入数据及结算主体信息失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取公众号结算收入数据及结算主体信息失败: "+err.Error()))
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
