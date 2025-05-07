import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  templateMessageGetIndustryRequest, 
  getPrivateTemplatesRequest, 
  templateMessageSendRequest, 
  sendSubscribeRequest, 
  templateMessageSetIndustryRequest, 
  delPrivateTemplateRequest 
} from '../../utils/apis';

const { Content } = Layout;

const TemplateMessageApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="getIndustry">
        <Tabs.TabPanel value="getIndustry" label="获取设置的行业">
          <ApiTester
            apiTitle="获取设置的行业信息"
            apiDescription="获取公众号设置的行业信息，可登录微信公众平台查看行业编号"
            requestMsg={templateMessageGetIndustryRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getTemplates" label="获取模板列表">
          <ApiTester
            apiTitle="获取模板列表"
            apiDescription="获取已添加至帐号下所有模板列表"
            requestMsg={getPrivateTemplatesRequest}
            requestParams={{}}
            requiredParams={[]}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="send" label="发送模板消息">
          <ApiTester
            apiTitle="发送模板消息"
            apiDescription="发送模板消息给用户"
            requestMsg={templateMessageSendRequest}
            requestParams={{
              touser: '', // 接收者（用户）的 OpenID
              template_id: '', // 模板ID
              url: '', // 模板跳转链接（可选）
              miniprogram: '', // 跳小程序所需数据（可选），格式为JSON字符串，例如 {"appid":"xiaochengxuappid","pagepath":"index?foo=bar"}
              data: '' // 模板数据，格式为JSON字符串，例如 {"first":{"value":"恭喜你购买成功！","color":"#173177"},"keyword1":{"value":"巧克力","color":"#173177"}}
            }}
            requiredParams={['touser', 'template_id', 'data']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="sendSubscribe" label="发送一次性订阅消息">
          <ApiTester
            apiTitle="发送一次性订阅消息"
            apiDescription="通过API推送订阅模板消息给用户"
            requestMsg={sendSubscribeRequest}
            requestParams={{
              touser: '', // 接收者（用户）的 OpenID
              template_id: '', // 模板ID
              scene: '', // 场景值
              title: '', // 消息标题
              data: '', // 消息正文数据，格式为JSON字符串
              url: '' // 点击消息跳转的链接，若存在小程序则优先跳转小程序
            }}
            requiredParams={['touser', 'template_id', 'scene', 'data']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="setIndustry" label="设置所属行业">
          <ApiTester
            apiTitle="设置所属行业"
            apiDescription="设置公众号所属行业，注意：每月可修改行业1次，账号仅可使用所属行业中相关的模板"
            requestMsg={templateMessageSetIndustryRequest}
            requestParams={{
              industry_id1: '', // 公众号模板消息所属行业编号
              industry_id2: '' // 公众号模板消息所属行业编号
            }}
            requiredParams={['industry_id1', 'industry_id2']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="delTemplate" label="删除模板">
          <ApiTester
            apiTitle="删除模板"
            apiDescription="删除模板"
            requestMsg={delPrivateTemplateRequest}
            requestParams={{
              template_id: '' // 模板ID
            }}
            requiredParams={['template_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default TemplateMessageApiPage; 