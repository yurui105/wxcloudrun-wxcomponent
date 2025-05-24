package official_account

import (
	"net/http"
	"strconv"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/publish/request"
	"github.com/gin-gonic/gin"
)

// DraftAddRequest 新建草稿请求结构体
type DraftAddRequest struct {
	Articles []ArticleRequest `json:"articles" binding:"required"`
}

// ArticleRequest 文章请求结构体
type ArticleRequest struct {
	Title              string `json:"title" binding:"required"`
	Author             string `json:"author"`
	Digest             string `json:"digest"`
	Content            string `json:"content" binding:"required"`
	ContentSourceUrl   string `json:"content_source_url"`
	ThumbMediaId       string `json:"thumb_media_id"`
	NeedOpenComment    int    `json:"need_open_comment"`
	OnlyFansCanComment int    `json:"only_fans_can_comment"`
}

// buildDraftAddRequest 构建草稿添加请求参数
func buildDraftAddRequest(req *DraftAddRequest) *request.RequestDraftAdd {
	articles := make([]*request.Article, len(req.Articles))
	for i, article := range req.Articles {
		articles[i] = &request.Article{
			Title:              article.Title,
			Author:             article.Author,
			Digest:             article.Digest,
			Content:            article.Content,
			ContentSourceUrl:   article.ContentSourceUrl,
			ThumbMediaId:       article.ThumbMediaId,
			NeedOpenComment:    article.NeedOpenComment,
			OnlyFansCanComment: article.OnlyFansCanComment,
		}
	}
	return &request.RequestDraftAdd{
		Articles: articles,
	}
}

// APIDraftAdd  新建草稿
func APIDraftAdd(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}

	// 绑定JSON请求体
	var req DraftAddRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.String(http.StatusBadRequest, "请求参数错误: %v", err)
		return
	}

	// 构建请求参数
	draftAddReq := buildDraftAddRequest(&req)

	// 调用API
	response, err := app.Publish.DraftAdd(ctx.Request.Context(), draftAddReq)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, response)
}

func APIDraftGet(ctx *gin.Context) {
	mediaID := ctx.Query("mediaID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftGet(ctx.Request.Context(), mediaID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftDelete(ctx *gin.Context) {

	mediaID := ctx.Query("mediaID")

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftDelete(ctx.Request.Context(), mediaID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftUpdate(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftUpdate(ctx.Request.Context(), &request.RequestDraftUpdate{
		MediaId: "123",
		Index:   1,
		Articles: &request.Article{
			Title:              "testTitle",
			Author:             "testAuthor",
			Digest:             "testDigest",
			Content:            "testContent",
			ContentSourceUrl:   "test url",
			ThumbMediaId:       "test",
			NeedOpenComment:    0,
			OnlyFansCanComment: 1,
		},
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftCount(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}

	data, err := app.Publish.DraftCount(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftBatchGet(ctx *gin.Context) {
	offset, _ := strconv.Atoi(ctx.Query("offset"))
	count, _ := strconv.Atoi(ctx.Query("count"))
	noContent, _ := strconv.Atoi(ctx.Query("noContent"))

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftBatchGet(ctx.Request.Context(), &request.RequestBatchGet{
		Offset:    offset,
		Count:     count,
		NoContent: noContent,
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftSwitch(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftSwitch(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIDraftCheckSwitch(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.DraftCheckSwitch(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIPublishSubmit(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.PublishSubmit(ctx.Request.Context(), "123")
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIPublishGet(ctx *gin.Context) {
	publishID := ctx.GetUint64("publishID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.PublishGet(ctx.Request.Context(), publishID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIPublishDelete(ctx *gin.Context) {
	articleID := ctx.Query("articleID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.PublishDelete(ctx.Request.Context(), articleID, 1)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIPublishGetArticle(ctx *gin.Context) {

	articleID := ctx.Query("articleID")

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.PublishGetArticle(ctx.Request.Context(), articleID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func APIPublishBatchGet(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Publish.PublishBatchGet(ctx.Request.Context(), &request.RequestBatchGet{
		Offset:    0,
		Count:     10,
		NoContent: 1,
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
