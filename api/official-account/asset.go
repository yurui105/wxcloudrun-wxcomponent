package official_account

import (
	"io"
	"net/http"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/material/request"
	"github.com/gin-gonic/gin"
)

// APIUploadImage 上传临时图片
func APIUploadImage(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Media.UploadImage(c.Request.Context(), "/resource/cloud.jpg")

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, res)
}

// APIUploadVoice 上传临时语音
func APIUploadVoice(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Media.UploadVoice(c.Request.Context(), "./resource/cha-cha-ender.mp3")

	if err != nil {
		panic(err)
	}
	c.JSON(200, res)
}

// APIUploadVideo 上传临时视频
func APIUploadVideo(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Media.UploadVideo(c.Request.Context(), "./resource/3d_ocean_1590675653.mp4")
	if err != nil {
		panic(err)
	}

	c.JSON(200, res)
}

// APIUploadThumb 上传缩略图
func APIUploadThumb(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Media.UploadThumb(c.Request.Context(), "/resource/cloud.jpg")
	if err != nil {
		panic(err)
	}

	c.JSON(200, res)
}

// APIGetMedia 获取临时素材
func APIGetMedia(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Media.Get(c.Request.Context(), c.DefaultQuery("mediaID", "YbE2OL2Wz5b09q8rw1FGhgeEPsQBDbSxzpZHmZ7Zk_Yz7eMzql7xfCy7U-9mcHFm"))
	if err != nil {
		panic(err)
	}

	_, err = io.Copy(c.Writer, res.Body)
	if err != nil {
		return
	}
}

// APIUploadMaterialImage 上传永久图片
func APIUploadMaterialImage(c *gin.Context) {
	ImageUpload(c, "image")
}

// APIUploadArticleImage 上传图文消息内的图片获取URL
func APIUploadArticleImage(c *gin.Context) {
	ImageUpload(c, "image")
}

// APIUploadMaterialVoice 上传永久语音
func APIUploadMaterialVoice(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Material.UploadVoice(c.Request.Context(), "./resource/cha-cha-ender.mp3")

	if err != nil {
		panic(err)
	}
	c.JSON(200, res)
}

// APIUploadMaterialVideo 上传永久视频
func APIUploadMaterialVideo(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Material.UploadVideo(c.Request.Context(), "./resource/3d_ocean_1590675653.mp4", "test title", "test description")
	if err != nil {
		panic(err)
	}

	c.JSON(200, res)
}

// APIUploadMaterialThumb 上传缩略图
func APIUploadMaterialThumb(c *gin.Context) {
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Material.UploadThumb(c.Request.Context(), "./resource/cloud.jpg")
	if err != nil {
		panic(err)
	}

	c.JSON(200, res)
}

// APIGetMaterial 获取永久素材
func APIGetMaterial(c *gin.Context) {
	mediaID := c.Query("mediaID")
	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Material.Get(c.Request.Context(), mediaID)
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, res)
}

// APIGetMaterialList 获取永久素材列表
func APIGetMaterialList(c *gin.Context) {
	//materialType := c.DefaultQuery("type", "image")
	//materialType := c.DefaultQuery("type", "video")
	materialType := c.DefaultQuery("type", "voice")

	app, err := GetOfficialAccountAppByContext(c)
	if err != nil {
		return
	}
	res, err := app.Material.List(c.Request.Context(), &request.RequestMaterialBatchGetMaterial{
		Offset: 0,
		Count:  100,
		Type:   materialType,
	})
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, res)
}

//// APIUploadImage 新增永久文件
//// https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Adding_Permanent_Assets.html
//func APIUploadImage(c *gin.Context) {
//  app, err := GetOfficialAccountAppByContext(c)
//	if err != nil {
//		return
//	}
//        res, err := app.Media.UploadImage("./resource/cloud.jpg", nil)
//  if err != nil {
//    panic(err)
//  }
//
//  c.JSON(200, res)
//}
//func APIUploadVoice(c *gin.Context) {
//  var outRes interface{}
//  _, err := services.OfficialAccountApp.Media.UploadImage("./resource/cloud.jpg", nil)
//  if err != nil {
//    panic(err)
//  }
//
//  c.JSON(200, outRes)
//}
//func APIUploadVideo(c *gin.Context) {
//  var outRes interface{}
//  _, err := services.OfficialAccountApp.Media.UploadImage("./resource/cloud.jpg", nil)
//  if err != nil {
//    panic(err)
//  }
//
//  c.JSON(200, outRes)
//}
