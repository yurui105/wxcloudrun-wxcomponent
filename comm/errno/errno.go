package errno

// Errno 错误码结构
// @Description 接口返回结构
type Errno = JsonResult

// JsonResult 返回结果，json格式
// @Description API返回结果
type JsonResult struct {
	Code     int         `json:"code" example:"0"`           // 错误码，0表示成功
	ErrorMsg string      `json:"errorMsg" example:"success"` // 错误信息
	Data     interface{} `json:"data,omitempty"`             // 返回数据
}

// Result 返回结果
type Result interface {
	WithData(data interface{}) Result
}

// WithData 填充data内容
func (e *JsonResult) WithData(data interface{}) Result {
	a := *e
	a.Data = data
	return &a
}
