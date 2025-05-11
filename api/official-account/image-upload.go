package official_account

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/wx"
	"io"
	"mime/multipart"
	"net/http"
	"strings"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
)

// ImageUploadResult 是上传图片后微信服务器返回的结果
type ImageUploadResult struct {
	URL       string `json:"url"`
	MediaID   string `json:"media_id"`
	ErrorCode int    `json:"errcode,omitempty"`
	ErrorMsg  string `json:"errmsg,omitempty"`
}

// ImageUpload godoc
// @Summary      上传图片到微信服务器
// @Description  将用户上传的图片直接转发到微信服务器
// @Tags         OfficialAccount.material.ImageUpload
// @Accept       multipart/form-data
// @Produce      json
// @Param        appid formData string true "公众号AppID"
// @Param        type formData string true "媒体文件类型，如image"
// @Param        media formData file true "要上传的图片文件"
// @Router       /uploadImage [post]
func ImageUpload(ctx *gin.Context, mediaType string) {
	// 获取参数
	appid, ok := GetAppID(ctx)
	if !ok {
		return
	}

	// 获取媒体类型
	if mediaType == "" {
		mediaType = "image"
	}

	// 获取文件
	fileHeader, err := ctx.FormFile("media")
	if err != nil {
		log.Error("获取上传文件失败: " + err.Error())
		ctx.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("获取上传文件失败: "+err.Error()))
		return
	}

	// 上传图片到微信服务器
	result, err := UploadImageToWeixin(ctx, appid, mediaType, fileHeader)
	if err != nil {
		log.Error("上传图片到微信服务器失败: " + err.Error())
		ctx.JSON(http.StatusOK, errno.ErrSystemError.WithData("上传图片到微信服务器失败: "+err.Error()))
		return
	}

	// 返回结果
	ctx.JSON(http.StatusOK, result)
}

// UploadImageToWeixin 上传图片到微信服务器
func UploadImageToWeixin(ctx *gin.Context, appid, mediaType string, fileHeader *multipart.FileHeader) (*ImageUploadResult, error) {
	token, err := wx.GetAuthorizerAccessToken(appid)
	if err != nil {
		return nil, errors.New("获取access_token失败: " + err.Error())
	}
	// 构建微信API请求URL
	apiURL := "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=" + token + "&type=" + mediaType

	return ForwardFileToWeixin(ctx, apiURL, fileHeader)
}

// DownloadImage 从URL下载图片并创建一个内存中的文件表示
func DownloadImage(url string) (*multipart.FileHeader, error) {
	// 发送HTTP GET请求获取图片
	resp, err := http.Get(url)
	if err != nil {
		return nil, errors.New("获取图片失败: " + err.Error() + ", URL: " + url)
	}
	defer resp.Body.Close()

	// 检查响应状态
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("获取图片失败，HTTP状态码: " + resp.Status + ", URL: " + url)
	}

	// 读取图片内容
	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("读取图片内容失败: " + err.Error() + ", URL: " + url)
	}

	// 从URL中提取文件名
	filename := "image.jpg" // 默认文件名
	parts := strings.Split(url, "/")
	if len(parts) > 0 {
		lastPart := parts[len(parts)-1]
		if lastPart != "" {
			// 如果URL最后部分包含查询参数，去除它们
			if idx := strings.Index(lastPart, "?"); idx > 0 {
				lastPart = lastPart[:idx]
			}
			if lastPart != "" {
				filename = lastPart
			}
		}
	}

	// 创建一个自定义的FileHeader
	header := &multipart.FileHeader{
		Filename: filename,
		Size:     int64(len(imageData)),
	}

	// 将图片数据存储在header的Header字段中
	if header.Header == nil {
		header.Header = make(map[string][]string)
	}
	// 将图片数据转换为字符串并存储在header中
	// 注意：这里我们不存储原始数据，而是存储URL，在需要时重新下载
	header.Header.Set("X-Image-URL", url)

	return header, nil
}

func UploadArticleImageToWeixin(ctx *gin.Context, appid string, fileHeader *multipart.FileHeader) (*ImageUploadResult, error) {
	token, err := wx.GetAuthorizerAccessToken(appid)
	if err != nil {
		return nil, errors.New("获取access_token失败: " + err.Error())
	}
	// 构建微信API请求URL
	apiURL := "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=" + token

	return ForwardFileToWeixin(ctx, apiURL, fileHeader)
}

// ForwardFileToWeixin 转发文件到微信服务器
func ForwardFileToWeixin(ctx *gin.Context, apiURL string, fileHeader *multipart.FileHeader) (*ImageUploadResult, error) {
	var fileContent []byte
	var err error

	// 检查是否是从URL下载的图片
	imageURL := fileHeader.Header.Get("X-Image-URL")
	if imageURL != "" {
		// 这是一个从URL下载的图片，我们需要重新下载
		resp, err := http.Get(imageURL)
		if err != nil {
			return nil, errors.New("重新下载图片失败: " + err.Error() + ", URL: " + imageURL)
		}
		defer resp.Body.Close()

		// 读取图片内容
		fileContent, err = io.ReadAll(resp.Body)
		if err != nil {
			return nil, errors.New("读取图片内容失败: " + err.Error() + ", URL: " + imageURL)
		}
	} else {
		// 这是一个普通的上传文件，直接打开并读取内容
		file, err := fileHeader.Open()
		if err != nil {
			return nil, errors.New("打开上传文件失败: " + err.Error())
		}
		defer file.Close()

		// 读取文件内容
		fileContent, err = io.ReadAll(file)
		if err != nil {
			return nil, errors.New("读取上传文件内容失败: " + err.Error())
		}
	}

	// 创建一个buffer用于构建multipart请求
	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	// 创建media表单字段
	fileWriter, err := bodyWriter.CreateFormFile("media", fileHeader.Filename)
	if err != nil {
		return nil, errors.New("创建表单字段失败: " + err.Error())
	}

	// 写入文件内容
	_, err = fileWriter.Write(fileContent)
	if err != nil {
		return nil, errors.New("写入文件内容失败: " + err.Error())
	}

	// 关闭bodyWriter
	contentType := bodyWriter.FormDataContentType()
	bodyWriter.Close()

	// 创建HTTP请求
	req, err := http.NewRequestWithContext(ctx.Request.Context(), "POST", apiURL, bodyBuf)
	if err != nil {
		return nil, errors.New("创建HTTP请求失败: " + err.Error())
	}
	req.Header.Set("Content-Type", contentType)

	// 发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, errors.New("发送HTTP请求失败: " + err.Error())
	}
	defer resp.Body.Close()

	// 读取响应
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("读取响应内容失败: " + err.Error())
	}

	// 解析响应
	result := &ImageUploadResult{}
	err = json.Unmarshal(respBody, result)
	if err != nil {
		return nil, errors.New("解析响应内容失败: " + err.Error())
	}

	// 检查错误码
	if result.ErrorCode != 0 {
		return nil, errors.New("微信API返回错误: " + result.ErrorMsg)
	}

	return result, nil
}
