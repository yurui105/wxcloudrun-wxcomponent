package c_officialaccount

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/wx"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/services"
	"github.com/gin-gonic/gin"
)

// Response 通用响应结构
type Response struct {
	Code     int         `json:"code"`
	ErrorMsg string      `json:"errorMsg"`
	Data     interface{} `json:"data,omitempty"`
}

// WxError 微信API错误响应
type WxError struct {
	ErrCode int    `json:"errcode"`
	ErrMsg  string `json:"errmsg"`
}

// 检查appid参数并获取OfficialAccountApp
func getOfficialAccountApp(c *gin.Context) (*services.OfficialAccountManager, string, bool) {
	appid := c.DefaultQuery("appid", "")
	if appid == "" {
		log.Error("缺少appid参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少appid参数"))
		return nil, "", false
	}

	manager := services.GetOfficialAccountManager()
	return manager, appid, true
}

// 检查appid参数
func getAppID(c *gin.Context) (string, bool) {
	appid := c.DefaultQuery("appid", "")
	if appid == "" {
		log.Error("缺少appid参数")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("缺少appid参数"))
		return "", false
	}
	return appid, true
}

// 获取授权Token
func getAccessToken(appid string) (string, error) {
	return wx.GetAuthorizerAccessToken(appid)
}

// 发送GET请求到微信API
func sendWxGetRequest(url string, accessToken string) ([]byte, error) {
	client := &http.Client{Timeout: 5 * time.Second}

	fullURL := fmt.Sprintf("%s?access_token=%s", url, accessToken)
	log.Debugf("发送GET请求到: %s", fullURL)

	req, err := http.NewRequest(http.MethodGet, fullURL, nil)
	if err != nil {
		log.Error("创建请求失败: " + err.Error())
		return nil, err
	}

	resp, err := client.Do(req)
	if err != nil {
		log.Error("发送请求失败: " + err.Error())
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {

		}
	}(resp.Body)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Error("读取响应失败: " + err.Error())
		return nil, err
	}

	// 检查是否有错误
	var wxError WxError
	if err := json.Unmarshal(body, &wxError); err == nil {
		if wxError.ErrCode != 0 {
			log.Errorf("微信API返回错误: %d, %s", wxError.ErrCode, wxError.ErrMsg)
			return nil, fmt.Errorf("微信API错误: %s", wxError.ErrMsg)
		}
	}

	return body, nil
}

// 发送POST请求到微信API
func sendWxPostRequest(url string, accessToken string, data interface{}) ([]byte, error) {
	client := &http.Client{Timeout: 5 * time.Second}

	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Error("JSON编码失败: " + err.Error())
		return nil, err
	}

	fullURL := fmt.Sprintf("%s?access_token=%s", url, accessToken)
	log.Debugf("发送POST请求到: %s, 数据: %s", fullURL, string(jsonData))

	req, err := http.NewRequest(http.MethodPost, fullURL, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Error("创建请求失败: " + err.Error())
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		log.Error("发送请求失败: " + err.Error())
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {

		}
	}(resp.Body)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Error("读取响应失败: " + err.Error())
		return nil, err
	}

	// 检查是否有错误
	var wxError WxError
	if err := json.Unmarshal(body, &wxError); err == nil {
		if wxError.ErrCode != 0 {
			log.Errorf("微信API返回错误: %d, %s", wxError.ErrCode, wxError.ErrMsg)
			return nil, fmt.Errorf("微信API错误: %s", wxError.ErrMsg)
		}
	}

	return body, nil
}

// 验证日期格式和范围
func validateDateRange(beginDate, endDate string) (time.Time, time.Time, error) {
	beginTime, err := time.Parse("2006-01-02", beginDate)
	if err != nil {
		return time.Time{}, time.Time{}, fmt.Errorf("开始日期格式错误，应为YYYY-MM-DD")
	}

	endTime, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		return time.Time{}, time.Time{}, fmt.Errorf("结束日期格式错误，应为YYYY-MM-DD")
	}

	if endTime.Before(beginTime) {
		return time.Time{}, time.Time{}, fmt.Errorf("结束日期不能早于开始日期")
	}

	return beginTime, endTime, nil
}

// 解析整数参数
func parseIntParam(c *gin.Context, paramName string, defaultValue int) (int, error) {
	paramStr := c.DefaultQuery(paramName, "")
	if paramStr == "" {
		return defaultValue, nil
	}

	value, err := strconv.Atoi(paramStr)
	if err != nil {
		return defaultValue, fmt.Errorf("参数 %s 必须是整数", paramName)
	}

	return value, nil
}
