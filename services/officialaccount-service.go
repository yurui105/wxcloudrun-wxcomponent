package services

import (
	"github.com/ArtisanCloud/PowerWeChat/v3/src/officialAccount"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/log"
	"github.com/WeixinCloud/wxcloudrun-wxcomponent/comm/wx"
	"sync"
)

// OfficialAccountManager 公众号应用管理器（单例模式）
type OfficialAccountManager struct {
	instances map[string]*officialAccount.OfficialAccount
	mutex     sync.RWMutex
}

// 全局单例实例
var officialAccountManager *OfficialAccountManager
var once sync.Once

// GetOfficialAccountManager 获取OfficialAccountManager单例
func GetOfficialAccountManager() *OfficialAccountManager {
	once.Do(func() {
		officialAccountManager = &OfficialAccountManager{
			instances: make(map[string]*officialAccount.OfficialAccount),
			mutex:     sync.RWMutex{},
		}
	})
	return officialAccountManager
}

// GetOfficialAccountApp 获取公众号应用实例，如果不存在则创建
func (m *OfficialAccountManager) GetOfficialAccountApp(appid string) (*officialAccount.OfficialAccount, error) {
	// 先尝试从缓存中读取
	m.mutex.RLock()
	if app, ok := m.instances[appid]; ok {
		m.mutex.RUnlock()
		return app, nil
	}
	m.mutex.RUnlock()

	// 缓存中不存在，创建新实例
	m.mutex.Lock()
	defer m.mutex.Unlock()

	// 双重检查，防止在获取锁的过程中已经被其他协程创建
	if app, ok := m.instances[appid]; ok {
		return app, nil
	}

	// 获取授权token
	token, err := wx.GetAuthorizerAccessToken(appid)
	if err != nil {
		log.Error("没有找到对应的授权用户信息")
		log.Error(err.Error())
		return nil, err
	}

	// 创建新的公众号实例
	offiaccount, err := officialAccount.NewOfficialAccount(&officialAccount.UserConfig{
		AppID:  appid,
		Secret: token,
	})

	if err != nil {
		log.Error("创建公众号实例失败")
		log.Error(err.Error())
		return nil, err
	}

	// 保存到缓存
	m.instances[appid] = offiaccount
	return offiaccount, nil
}

// GetOfficialAccountApp 兼容旧的调用方式
func GetOfficialAccountApp(appid string) (*officialAccount.OfficialAccount, error) {
	return GetOfficialAccountManager().GetOfficialAccountApp(appid)
}
