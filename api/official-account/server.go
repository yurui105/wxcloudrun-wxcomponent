package official_account

import (
	"github.com/ArtisanCloud/PowerLibs/v3/fmt"
	"github.com/ArtisanCloud/PowerLibs/v3/http/helper"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/contract"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/messages"
	models2 "github.com/ArtisanCloud/PowerWeChat/v3/src/kernel/models"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/server/handlers/models"
	"github.com/gin-gonic/gin"
)

// CallbackVerify 回调配置
// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
func CallbackVerify(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	rs, err := app.Server.VerifyURL(c.Request)
	if err != nil {
		panic(err)
	}

	// 选择1
	//text, _ := ioutil.ReadAll(rs.Body)
	//c.String(http.StatusOK, string(text))

	// 选择2
	err = helper.HttpResponseSend(rs, c.Writer)

}

// CallbackNotify 回调配置
// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
func CallbackNotify(c *gin.Context) {

	//requestXML, _ := io.ReadAll(c.Request.Body)
	//c.Request.Body = io.NopCloser(bytes.NewBuffer(requestXML))
	//contentType := c.Request.Header.Get("Content-Type")
	//
	//println(contentType)
	//println(string(requestXML))

	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	rs, err := app.Server.Notify(c.Request, func(event contract.EventInterface) interface{} {
		fmt.Dump("event", event)
		//return  "handle callback"

		switch event.GetMsgType() {

		case models2.CALLBACK_MSG_TYPE_EVENT:
			switch event.GetEvent() {
			case models.CALLBACK_EVENT_SUBSCRIBE:
				msg := models.EventSubscribe{}
				err := event.ReadMessage(&msg)
				if err != nil {
					println(err.Error())
					return "error"
				}
				fmt.Dump(msg)
				return kernel.SUCCESS_EMPTY_RESPONSE

			case models.CALLBACK_EVENT_UNSUBSCRIBE:
				msg := models.EventUnSubscribe{}
				err := event.ReadMessage(&msg)
				if err != nil {
					println(err.Error())
					return "error"
				}
				fmt.Dump(msg)
				return kernel.SUCCESS_EMPTY_RESPONSE

			}

		case models2.CALLBACK_MSG_TYPE_TEXT:
			msg := models.MessageText{}
			err := event.ReadMessage(&msg)
			if err != nil {
				println(err.Error())
				return "error"
			}
			fmt.Dump(msg)
		case models.CALLBACK_EVENT_SCAN:
			msg := models.EventScanCodePush{}
			err := event.ReadMessage(&msg)
			if err != nil {
				println(err.Error())
				return "error"
			}
		}

		//return replyData
		return messages.NewText("ok")

		//media_id := "JRzcFCs0neDADadmOep2YOszEXI0ZFesCRP75VgIX7UgLzy7Uqk2YeYcwyHtOmAe"
		//return messages.NewImage(media_id, &power.HashMap{})
		//return kernel.SUCCESS_EMPTY_RESPONSE

	})
	if err != nil {
		panic(err)
	}

	err = helper.HttpResponseSend(rs, c.Writer)

	if err != nil {
		panic(err)
	}

}
