package c_officialaccount

import (
	"encoding/json"
	"net/http"

	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/gin-gonic/gin"
)

// 草稿箱文章结构
type Article struct {
	ArticleType        string       `json:"article_type"`
	Title              string       `json:"title"`
	Author             string       `json:"author,omitempty"`
	Digest             string       `json:"digest,omitempty"`
	Content            string       `json:"content"`
	ContentSourceUrl   string       `json:"content_source_url,omitempty"`
	ThumbMediaId       string       `json:"thumb_media_id,omitempty"`
	NeedOpenComment    int          `json:"need_open_comment"`
	OnlyFansCanComment int          `json:"only_fans_can_comment"`
	PicCrop2351        string       `json:"pic_crop_235_1,omitempty"`
	PicCrop11          string       `json:"pic_crop_1_1,omitempty"`
	ImageInfo          *ImageInfo   `json:"image_info,omitempty"`
	CoverInfo          *CoverInfo   `json:"cover_info,omitempty"`
	ProductInfo        *ProductInfo `json:"product_info,omitempty"`
}

type ImageInfo struct {
	ImageList []ImageItem `json:"image_list"`
}

type ImageItem struct {
	ImageMediaId string `json:"image_media_id"`
}

type CoverInfo struct {
	CropPercentList []CropPercent `json:"crop_percent_list"`
}

type CropPercent struct {
	Ratio string `json:"ratio"`
	X1    string `json:"x1"`
	Y1    string `json:"y1"`
	X2    string `json:"x2"`
	Y2    string `json:"y2"`
}

type ProductInfo struct {
	FooterProductInfo FooterProduct `json:"footer_product_info"`
}

type FooterProduct struct {
	ProductKey string `json:"product_key"`
}

// 新建草稿请求
type AddDraftRequest struct {
	Articles []Article `json:"articles"`
}

// 新建草稿响应
type AddDraftResponse struct {
	MediaId string `json:"media_id"`
}

// 获取草稿列表响应
type GetDraftListResponse struct {
	TotalCount int         `json:"total_count"`
	ItemCount  int         `json:"item_count"`
	Item       []DraftItem `json:"item"`
}

// 草稿项
type DraftItem struct {
	MediaId    string       `json:"media_id"`
	Content    DraftContent `json:"content"`
	UpdateTime int64        `json:"update_time"`
}

// 草稿内容
type DraftContent struct {
	NewsItem []NewsItem `json:"news_item"`
}

// 图文消息
type NewsItem struct {
	Title              string `json:"title"`
	Author             string `json:"author"`
	Digest             string `json:"digest"`
	Content            string `json:"content"`
	ContentSourceUrl   string `json:"content_source_url"`
	ThumbMediaId       string `json:"thumb_media_id"`
	ShowCoverPic       int    `json:"show_cover_pic"`
	NeedOpenComment    int    `json:"need_open_comment"`
	OnlyFansCanComment int    `json:"only_fans_can_comment"`
	URL                string `json:"url"`
}

// 获取草稿总数响应
type GetDraftCountResponse struct {
	TotalCount int `json:"total_count"`
}

// AddDraft 新建草稿
func AddDraft(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 解析请求参数
	var req AddDraftRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Error("解析请求参数失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("解析请求参数失败: "+err.Error()))
		return
	}

	// 参数验证
	if len(req.Articles) == 0 {
		log.Error("文章列表不能为空")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("文章列表不能为空"))
		return
	}

	// 获取访问令牌
	accessToken, err := getAccessToken(appid)
	if err != nil {
		log.Error("获取访问令牌失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取访问令牌失败: "+err.Error()))
		return
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/cgi-bin/draft/add"
	responseBody, err := sendWxPostRequest(url, accessToken, req)
	if err != nil {
		log.Error("添加草稿失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("添加草稿失败: "+err.Error()))
		return
	}

	// 解析响应
	var response AddDraftResponse
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetDraftList 获取草稿列表
func GetDraftList(c *gin.Context) {
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
	url := "https://api.weixin.qq.com/cgi-bin/draft/batchget"
	responseBody, err := sendWxPostRequest(url, accessToken, requestData)
	if err != nil {
		log.Error("获取草稿列表失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取草稿列表失败: "+err.Error()))
		return
	}

	// 解析响应
	var response GetDraftListResponse
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}

// GetDraftCount 获取草稿总数
func GetDraftCount(c *gin.Context) {
	// 获取appid
	appid, ok := getAppID(c)
	if !ok {
		return
	}

	// 获取访问令牌
	accessToken, err := getAccessToken(appid)
	if err != nil {
		log.Error("获取访问令牌失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取访问令牌失败: "+err.Error()))
		return
	}

	// 发送请求到微信API
	url := "https://api.weixin.qq.com/cgi-bin/draft/count"
	responseBody, err := sendWxGetRequest(url, accessToken)
	if err != nil {
		log.Error("获取草稿总数失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("获取草稿总数失败: "+err.Error()))
		return
	}

	// 解析响应
	var response GetDraftCountResponse
	if err := json.Unmarshal(responseBody, &response); err != nil {
		log.Error("解析响应失败: " + err.Error())
		c.JSON(http.StatusOK, errno.ErrSystemError.WithData("解析响应失败: "+err.Error()))
		return
	}

	c.JSON(http.StatusOK, errno.OK.WithData(response))
}
