package official_account

import (
	"io"
	"net/http"
	"sync"

	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount/material/request"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/errno"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
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

// APIUploadArticleImageByUrl 通过URL上传图文消息内的图片
// @Summary      通过URL上传图文消息内的图片
// @Description  从URL下载图片并上传到微信服务器，获取图片URL
// @Tags         OfficialAccount.material.UploadArticleImageByUrl
// @Accept       application/json
// @Produce      json
// @Param        appid query string true "公众号AppID"
// @Param        images formData []string true "图片URL列表"
// @Router       /uploadArticleImageByUrl [post]
func APIUploadArticleImageByUrl(c *gin.Context) {
	// 获取appid参数
	appid, ok := GetAppID(c)
	if !ok {
		return
	}

	// 获取图片URL列表
	var requestData struct {
		Images []string `json:"images" form:"images"`
	}

	// 尝试从JSON请求体解析
	if err := c.ShouldBindJSON(&requestData); err != nil {
		// 如果JSON解析失败，尝试从表单解析
		if err := c.ShouldBind(&requestData); err != nil {
			log.Error("解析请求参数失败: " + err.Error())
			c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("解析请求参数失败: "+err.Error()))
			return
		}
	}

	// 检查图片URL列表是否为空
	if len(requestData.Images) == 0 {
		log.Error("图片URL列表为空")
		c.JSON(http.StatusOK, errno.ErrInvalidParam.WithData("图片URL列表为空"))
		return
	}

	// 创建结果映射，key为原始URL，value为微信返回的URL
	resultMap := make(map[string]string)

	// 创建等待组和互斥锁，用于并发处理
	var wg sync.WaitGroup
	var mutex sync.Mutex

	// 设置最大并发数
	maxConcurrent := 5
	semaphore := make(chan struct{}, maxConcurrent)

	// 并发处理每个图片URL
	for _, imageURL := range requestData.Images {
		wg.Add(1)
		semaphore <- struct{}{} // 获取信号量

		go func(url string) {
			defer wg.Done()
			defer func() { <-semaphore }() // 释放信号量

			// 下载图片
			fileHeader, err := DownloadImage(url)
			if err != nil {
				log.Error("下载图片失败: " + err.Error() + ", URL: " + url)
				mutex.Lock()
				resultMap[url] = "" // 下载失败，设置为空字符串
				mutex.Unlock()
				return
			}

			// 上传图片到微信
			result, err := UploadArticleImageToWeixin(c, appid, fileHeader)
			if err != nil {
				log.Error("上传图片到微信失败: " + err.Error() + ", URL: " + url)
				mutex.Lock()
				resultMap[url] = "" // 上传失败，设置为空字符串
				mutex.Unlock()
				return
			}

			// 保存结果
			mutex.Lock()
			resultMap[url] = result.URL
			mutex.Unlock()
		}(imageURL)
	}

	// 等待所有图片处理完成
	wg.Wait()

	// 返回结果
	c.JSON(http.StatusOK, errno.OK.WithData(resultMap))
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
