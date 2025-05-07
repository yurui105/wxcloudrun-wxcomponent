package official_account

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// CommentOpen 打开已群发文章评论
func CommentOpen(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.Open(ctx.Request.Context(), msgID, 0)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentClose 关闭已群发文章评论
func CommentClose(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.Close(ctx.Request.Context(), msgID, 0)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentList 查看指定文章的评论数据
func CommentList(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.List(ctx.Request.Context(), msgID, 0, 0, 100, 0)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentMarkElect 将评论标记精选
func CommentMarkElect(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	commentIDStr := ctx.Query("commentID")
	commentID, _ := strconv.Atoi(commentIDStr)
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.MarkElect(ctx.Request.Context(), msgID, 0, commentID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentUnMarkElect 将评论取消精选
func CommentUnMarkElect(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	commentIDStr := ctx.Query("commentID")
	commentID, _ := strconv.Atoi(commentIDStr)
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.UnmarkElect(ctx.Request.Context(), msgID, 0, commentID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentDelete 删除评论
func CommentDelete(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	commentIDStr := ctx.Query("commentID")
	commentID, _ := strconv.Atoi(commentIDStr)
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.Delete(ctx.Request.Context(), msgID, 0, commentID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentReply 回复评论
func CommentReply(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	commentIDStr := ctx.Query("commentID")
	content := ctx.Query("content")
	commentID, _ := strconv.Atoi(commentIDStr)
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.Reply(ctx.Request.Context(), msgID, 0, commentID, content)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CommentDeleteReply 删除回复评论
func CommentDeleteReply(ctx *gin.Context) {
	msgID := ctx.Query("msgID")
	commentIDStr := ctx.Query("commentID")
	commentID, _ := strconv.Atoi(commentIDStr)
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.Comment.DeleteReply(ctx.Request.Context(), msgID, 0, commentID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
