package c_officialaccount

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
)

// 图片上传响应
type UploadImageResponse struct {
	URL string `json:"url"`
}

// UploadImage 上传图片接口
func UploadImage(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 从请求中获取上传的文件
	file, fileHeader, err := c.Request.FormFile("image")
	if err != nil {
		log.Error("获取上传文件失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("获取上传文件失败: "+err.Error()))
		return
	}
	defer func(file multipart.File) {
		err := file.Close()
		if err != nil {
			log.Error("关闭文件失败: " + err.Error())
		}
	}(file)

	// 创建临时文件保存上传的图片
	tempDir := os.TempDir()
	tempFilePath := filepath.Join(tempDir, fileHeader.Filename)

	// 创建临时文件
	tempFile, err := os.Create(tempFilePath)
	if err != nil {
		log.Error("创建临时文件失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("创建临时文件失败: "+err.Error()))
		return
	}
	defer func(tempFile *os.File) {
		err := tempFile.Close()
		if err != nil {
			log.Error("关闭临时文件失败: " + err.Error())
		}
	}(tempFile)
	defer func(name string) {
		err := os.Remove(name)
		if err != nil {
			log.Error("删除临时文件失败: " + err.Error())
		}
	}(tempFilePath) // 使用完后删除临时文件

	// 将上传的文件内容复制到临时文件
	_, err = io.Copy(tempFile, file)
	if err != nil {
		log.Error("复制文件失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("复制文件失败: "+err.Error()))
		return
	}

	// 确保文件内容写入磁盘
	err = tempFile.Sync()
	if err != nil {
		log.Error("同步临时文件失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("同步临时文件失败: "+err.Error()))
		return
	}

	// 获取访问令牌
	accessToken, err := getAccessToken(appid)
	if err != nil {
		log.Error("获取访问令牌失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取访问令牌失败: "+err.Error()))
		return
	}

	// 创建一个新的HTTP请求
	url := fmt.Sprintf("https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s", accessToken)

	// 创建一个缓冲区来保存请求体
	bodyBuf := &bytes.Buffer{}
	writer := multipart.NewWriter(bodyBuf)

	// 打开文件
	fileContent, err := os.Open(tempFilePath)
	if err != nil {
		log.Error("打开文件失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("打开文件失败: "+err.Error()))
		return
	}
	defer fileContent.Close()

	// 创建表单文件字段
	part, err := writer.CreateFormFile("media", filepath.Base(tempFilePath))
	if err != nil {
		log.Error("创建表单文件字段失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("创建表单文件字段失败: "+err.Error()))
		return
	}

	// 将文件内容复制到表单字段
	_, err = io.Copy(part, fileContent)
	if err != nil {
		log.Error("复制文件内容失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("复制文件内容失败: "+err.Error()))
		return
	}

	// 关闭写入器
	err = writer.Close()
	if err != nil {
		log.Error("关闭写入器失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("关闭写入器失败: "+err.Error()))
		return
	}

	// 创建请求
	req, err := http.NewRequest("POST", url, bodyBuf)
	if err != nil {
		log.Error("创建请求失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("创建请求失败: "+err.Error()))
		return
	}

	// 设置请求头
	req.Header.Set("Content-Type", writer.FormDataContentType())

	// 发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Error("发送请求失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("发送请求失败: "+err.Error()))
		return
	}
	defer resp.Body.Close()

	// 读取响应
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Error("读取响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("读取响应失败: "+err.Error()))
		return
	}

	// 检查是否有错误
	var wxError WxError
	if err := json.Unmarshal(respBody, &wxError); err == nil && wxError.ErrCode != 0 {
		log.Errorf("微信API返回错误: %d, %s", wxError.ErrCode, wxError.ErrMsg)
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData(fmt.Sprintf("微信API错误: %s", wxError.ErrMsg)))
		return
	}

	// 解析响应
	var response UploadImageResponse
	if err := json.Unmarshal(respBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	// 返回上传结果
	c.JSON(http.StatusOK, errno.OK.WithData(response))
}
