package official_account

import (
	"github.com/ArtisanCloud/PowerLibs/v3/object"
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/wx"
)

var OfficialAccountApp = make(map[string]*officialAccount.OfficialAccount)

func GetOfficialAccount(appid string) (*officialAccount.OfficialAccount, error) {
	client, ok := OfficialAccountApp[appid]
	if ok {
		return client, nil
	}

	token, err := wx.GetAuthorizerAccessToken(appid)
	if err != nil {
		return nil, err
	}

	app, err := officialAccount.NewOfficialAccount(&officialAccount.UserConfig{
		AppID:  appid, // 公众号、小程序的appid
		Secret: token, //
	})

	app.AccessToken.GetCustomToken = func(key string, refresh bool) object.HashMap {
		return object.HashMap{
			"access_token": token,
			"expires_in":   float64(7200),
		}
	}

	if err != nil {
		return nil, err
	}
	OfficialAccountApp[appid] = app

	return app, nil
}
