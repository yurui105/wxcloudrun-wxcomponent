package official_account

import (
	"net/http"
	"strconv"

	"github.com/ArtisanCloud/PowerLibs/v3/object"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/messages"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/power"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/customerService/request"
	"github.com/gin-gonic/gin"
)

// GetCustomerList 获取所有客服
func GetCustomerList(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.List(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// GetCustomerOnline 获取所有在线的客服
func GetCustomerOnline(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Online(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerCreate 新建客服
func CustomerCreate(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	nickname, _ := ctx.GetPostForm("nickname")

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Create(ctx.Request.Context(), account, nickname)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerUpdate 更新客服
func CustomerUpdate(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	nickname, _ := ctx.GetPostForm("nickname")

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Update(ctx.Request.Context(), account, nickname)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerDelete 删除客服 err
func CustomerDelete(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Delete(ctx.Request.Context(), account)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerSetAvatar 设置客户头像
func CustomerSetAvatar(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	avatarPath := "./resource/cloud.jpg"
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.SetAvatar(ctx.Request.Context(), account, avatarPath)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerMessages 获取客服与客户聊天记录
func CustomerMessages(ctx *gin.Context) {
	startTimeStr := ctx.Query("startTime") // eg: 2015-06-01
	endTimeStr := ctx.Query("endTime")

	startTime, _ := strconv.Atoi(startTimeStr)
	endTime, _ := strconv.Atoi(endTimeStr)
	msgId := 1
	number := 1000

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Messages(ctx.Request.Context(), &request.RequestMessages{
		StartTime: startTime,
		EndTime:   endTime,
		MsgID:     msgId,
		Number:    number,
	})
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func CustomerMessageSend(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	content, _ := ctx.GetPostForm("content")
	_ = content

	//msg := messages.NewText(content)
	msg := messages.NewVideo("RWhYObhxAi-gwnUf3ifNhcYpLJCXRbBW6Bd4n4cEdY32ksf_tCOxACYwbOHdn3bF", &power.HashMap{
		//"media_id": "UVv55kEBGGIsWD0__1DNy0c37swPHr_IOggttifIQUAmjuNaFKehwQYps8MeAdLW",
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.Message(ctx.Request.Context(), msg).From(account).SetTo(openID).Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}
func CustomerMessageSendText(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	content, _ := ctx.GetPostForm("content")
	_ = content

	msg := messages.NewText(content)

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}
func CustomerMessageSendImage(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	mediaID, _ := ctx.GetPostForm("mediaID")

	msg := messages.NewImage(mediaID, &power.HashMap{})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendVoice(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	mediaID, _ := ctx.GetPostForm("mediaID")

	msg := messages.NewVoice(mediaID, &power.HashMap{})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendVideo(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	mediaID, _ := ctx.GetPostForm("mediaID")

	msg := messages.NewVideo(mediaID, &power.HashMap{
		"title":          "test title",
		"description":    "test desc...",
		"thumb_media_id": "test thumb media id",
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendLink(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")

	msg := messages.NewLink(&power.HashMap{
		"title":       "ArtisanCloud",
		"description": "desc...",
		"url":         "https://www.artisan-cloud.com",
		"picurl":      "https://powerwechat.artisan-cloud.com/images/icons/favicon-32x32.png",
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendMusic(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")

	msg := messages.NewMusic(&power.HashMap{
		"title":          "MUSIC_TITLE",
		"description":    "MUSIC_DESCRIPTION",
		"musicurl":       "MUSIC_URL",
		"hqmusicurl":     "HQ_MUSIC_URL",
		"thumb_media_id": "THUMB_MEDIA_ID",
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendNewArticles(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	articleID, _ := ctx.GetPostForm("articleID")

	msg := messages.NewNewsArticle(&power.HashMap{
		"article_id": articleID,
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendNews(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")

	msg := messages.NewNews([]*object.HashMap{
		{
			"title":       "Happy Day",
			"description": "Is Really A Happy Day",
			"url":         "URL",
			"picurl":      "PIC_URL",
		},
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendMsgMenu(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")

	msg := messages.NewMsgMenu(&power.HashMap{
		"head_content": "您对本次服务是否满意呢?",
		"list": []object.StringMap{
			{
				"id":      "101",
				"content": "满意",
			}, {
				"id":      "102",
				"content": "不满意",
			},
		},
		"tail_content": "欢迎再次光临",
	})

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerMessageSendRaw(ctx *gin.Context) {
	openID, _ := ctx.GetPostForm("openID")
	account, _ := ctx.GetPostForm("account")
	content, _ := ctx.GetPostForm("content")

	msg := messages.NewRaw(`
    {
      "touser":"` + openID + `",
      "msgtype":"text",
      "text":{"content":"` + content + `"}"}}
  `)

	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	result, err := app.CustomerService.
		Message(ctx.Request.Context(), msg).
		From(account).
		SetTo(openID).
		Send(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, result)
}

func CustomerInvite(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	wechatID, _ := ctx.GetPostForm("wechatID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerService.Invite(ctx.Request.Context(), account, wechatID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func CustomerSessionCreate(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	openID, _ := ctx.GetPostForm("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerServiceSession.Create(ctx.Request.Context(), account, openID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func CustomerSessionClose(ctx *gin.Context) {
	account, _ := ctx.GetPostForm("account")
	openID, _ := ctx.GetPostForm("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerServiceSession.Close(ctx.Request.Context(), account, openID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
func GetCustomerSession(ctx *gin.Context) {
	openID := ctx.Query("openID")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerServiceSession.Get(ctx.Request.Context(), openID)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

// CustomerSessionList err
func CustomerSessionList(ctx *gin.Context) {
	account := ctx.Query("account")
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerServiceSession.List(ctx.Request.Context(), account)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}

func CustomerSessionWaiting(ctx *gin.Context) {
	app, err := GetOfficialAccountAppByContext(ctx)
	if err != nil {
		return
	}
	data, err := app.CustomerServiceSession.Waiting(ctx.Request.Context())
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, data)
}
