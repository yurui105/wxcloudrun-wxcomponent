# 公众号接口文档

本文档描述了公众号相关接口的请求参数和返回数据结构。

## 通用参数

所有接口都需要携带以下参数：

| 参数名 | 类型   | 必填 | 说明                   |
|--------|--------|------|------------------------|
| appid  | string | 是   | 公众号的appid，用于确定是对哪一个公众号进行操作 |

## 草稿箱相关接口

### 1. 新建草稿

- **接口地址**：`/officialaccount/upload-image/draft/add`
- **请求方式**：POST
- **请求参数**：

```json
{
    "articles": [
        // 图文消息结构
        {
            "article_type": "news",
            "title": "标题",
            "author": "作者",
            "digest": "摘要",
            "content": "正文内容",
            "content_source_url": "原文链接",
            "thumb_media_id": "封面图片media_id",
            "need_open_comment": 0,
            "only_fans_can_comment": 0,
            "pic_crop_235_1": "x1_y1_x2_y2",
            "pic_crop_1_1": "x1_y1_x2_y2"
        },
        // 图片消息结构
        {
            "article_type": "newspic",
            "title": "标题",
            "content": "正文内容",
            "need_open_comment": 0,
            "only_fans_can_comment": 0,
            "image_info": {
                "image_list": [
                    {
                        "image_media_id": "图片media_id"
                    }
                ]
            },
            "cover_info": {
                "crop_percent_list": [
                    {
                        "ratio": "1_1",
                        "x1": "0.166454",
                        "y1": "0",
                        "x2": "0.833545",
                        "y2": "1"
                    }
                ]
            },
            "product_info": {
                "footer_product_info": {
                    "product_key": "商品key"
                }
            }
        }
    ]
}
```

- **返回参数**：

```json
{
    "code": 0,
    "errorMsg": "OK",
    "data": {
        "media_id": "MEDIA_ID"
    }
}
```

### 2. 获取草稿列表

- **接口地址**：`/officialaccount/upload-image/draft/list`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型 | 必填 | 说明                                           |
|------------|------|------|------------------------------------------------|
| offset     | int  | 是   | 从全部素材的该偏移位置开始返回，0表示从第一个素材返回 |
| count      | int  | 是   | 返回素材的数量，取值在1到20之间                |
| no_content | int  | 否   | 1表示不返回content字段，0表示正常返回，默认为0 |

- **返回参数**：

```json
{
    "code": 0,
    "errorMsg": "OK",
    "data": {
        "total_count": 总数量,
        "item_count": 本次返回数量,
        "item": [
            {
                "media_id": "MEDIA_ID",
                "content": {
                    "news_item": [
                        {
                            "title": "标题",
                            "author": "作者",
                            "digest": "摘要",
                            "content": "正文内容",
                            "content_source_url": "原文链接",
                            "thumb_media_id": "封面图片media_id",
                            "show_cover_pic": 0,
                            "need_open_comment": 0,
                            "only_fans_can_comment": 0,
                            "url": "文章链接"
                        }
                    ]
                },
                "update_time": 更新时间
            }
        ]
    }
}
```

### 3. 获取草稿总数

- **接口地址**：`/officialaccount/upload-image/draft/count`
- **请求方式**：GET
- **请求参数**：无额外参数

- **返回参数**：

```json
{
    "code": 0,
    "errorMsg": "OK",
    "data": {
        "total_count": 草稿总数
    }
}
```

## 发布能力相关接口

### 1. 获取成功发布列表

- **接口地址**：`/officialaccount/upload-image/publish/list`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型 | 必填 | 说明                                           |
|------------|------|------|------------------------------------------------|
| offset     | int  | 是   | 从全部素材的该偏移位置开始返回，0表示从第一个素材返回 |
| count      | int  | 是   | 返回素材的数量，取值在1到20之间                |
| no_content | int  | 否   | 1表示不返回content字段，0表示正常返回，默认为0 |

- **返回参数**：返回成功发布列表

## 数据统计相关接口

### 1. 获取图文群发每日数据

- **接口地址**：`/officialaccount/upload-image/analytics/article/summary`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文群发每日数据

### 2. 获取图文群发总数据

- **接口地址**：`/officialaccount/upload-image/analytics/article/total`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文群发总数据

### 3. 获取图文统计数据

- **接口地址**：`/officialaccount/upload-image/analytics/user/read`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文统计数据

### 4. 获取图文统计分时数据

- **接口地址**：`/officialaccount/upload-image/analytics/user/read/hour`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文统计分时数据

### 5. 获取图文分享转发数据

- **接口地址**：`/officialaccount/upload-image/analytics/user/share`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文分享转发数据

### 6. 获取图文分享转发分时数据

- **接口地址**：`/officialaccount/upload-image/analytics/user/share/hour`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| begin_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回图文分享转发分时数据

### 7. 获取公众号分广告位数据

- **接口地址**：`/officialaccount/upload-image/analytics/ad/adpos`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| action     | string | 是   | 数据获取类型                                   |
| start_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回公众号分广告位数据

### 8. 获取公众号返佣商品数据

- **接口地址**：`/officialaccount/upload-image/analytics/ad/cps`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| action     | string | 是   | 数据获取类型                                   |
| start_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回公众号返佣商品数据

### 9. 获取公众号结算收入数据及结算主体信息

- **接口地址**：`/officialaccount/upload-image/analytics/ad/settlement`
- **请求方式**：GET
- **请求参数**：

| 参数名     | 类型   | 必填 | 说明                                           |
|------------|--------|------|------------------------------------------------|
| action     | string | 是   | 数据获取类型                                   |
| start_date | string | 是   | 获取数据的起始日期，格式为YYYY-MM-DD           |
| end_date   | string | 是   | 获取数据的结束日期，格式为YYYY-MM-DD           |

- **返回参数**：返回公众号结算收入数据及结算主体信息
