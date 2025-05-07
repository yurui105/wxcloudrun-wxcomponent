import React, { useState } from 'react';
import { Form, Input, Button, Divider, Alert, Tabs, Upload, message } from 'tdesign-react';
import { request } from '../utils/common';
import { IRequestMsg } from '../utils/apis';
import JSONEditor from './JSONEditor';

interface ApiTesterProps {
  apiTitle: string;
  apiDescription?: string;
  requestMsg: IRequestMsg;
  requestParams?: Record<string, any>;
  requiredParams?: string[];
  isFileUpload?: boolean;
  fileTypes?: string[];
}

const ApiTester: React.FC<ApiTesterProps> = ({
  apiTitle,
  apiDescription,
  requestMsg,
  requestParams = {},
  requiredParams = [],
  isFileUpload = false,
  fileTypes = []
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({...requestParams, appid: ''});
  const [fileList, setFileList] = useState<any[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    // 验证必填参数
    const missingParams = requiredParams.filter(param => !formData[param]);
    if (missingParams.length > 0) {
      setError(`缺少必填参数: ${missingParams.join(', ')}`);
      setLoading(false);
      return;
    }

    // 确保appid被添加
    if (!formData.appid) {
      setError('appid是必填参数');
      setLoading(false);
      return;
    }

    try {
      let reqData = {...formData};
      
      // 处理文件上传
      if (isFileUpload && fileList.length > 0) {
        const formDataObj = new FormData();
        
        // 添加文件
        formDataObj.append('file', fileList[0].originFile);
        
        // 添加其他参数
        Object.keys(reqData).forEach(key => {
          formDataObj.append(key, reqData[key]);
        });
        
        reqData = formDataObj;
      }

      const result = await request({
        request: requestMsg,
        data: reqData,
      });
      
      setResponse(result);
    } catch (err: any) {
      setError(err.message || '请求失败');
    } finally {
      setLoading(false);
    }
  };

  const renderJsonDisplay = (data: any) => {
    return (
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  const handleFileChange = (info: any) => {
    const { fileList } = info;
    setFileList(fileList);
  };

  const renderFormItems = () => {
    const items = Object.keys(requestParams).map(key => {
      return (
        <Form.FormItem key={key} label={key} name={key} requiredMark={requiredParams.includes(key)}>
          {key.toLowerCase().includes('json') ? (
            <JSONEditor
              value={formData[key] || ''}
              onChange={(value: string) => handleInputChange(key, value)}
            />
          ) : (
            <Input 
              value={formData[key] || ''} 
              onChange={(value) => handleInputChange(key, value)}
              placeholder={`请输入${key}`}
            />
          )}
        </Form.FormItem>
      );
    });

    // 添加appid参数
    items.unshift(
      <Form.FormItem key="appid" label="appid" name="appid" requiredMark={true}>
        <Input 
          value={formData.appid || ''} 
          onChange={(value) => handleInputChange('appid', value)}
          placeholder="请输入公众号appid"
        />
      </Form.FormItem>
    );

    // 处理文件上传
    if (isFileUpload) {
      items.push(
        <Form.FormItem key="file" label="文件" name="file" requiredMark={true}>
          <Upload
            action=""
            files={fileList}
            onChange={handleFileChange}
            theme="file"
            accept={fileTypes.join(',')}
            multiple={false}
            beforeUpload={() => false}
          >
            <Button>选择文件</Button>
          </Upload>
        </Form.FormItem>
      );
    }

    return items;
  };

  const cardStyle = {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    marginBottom: '16px'
  };

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{apiTitle}</div>
      {apiDescription && (
        <div style={{ marginBottom: '16px' }}>
          <div>{apiDescription}</div>
        </div>
      )}

      <Divider />

      <Form labelWidth={100} style={{ marginBottom: 20 }}>
        {renderFormItems()}
        
        <Form.FormItem>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button theme="primary" loading={loading} onClick={handleSubmit}>
              发送请求
            </Button>
            <Button 
              theme="default" 
              onClick={() => setFormData({...requestParams, appid: formData.appid})}
            >
              重置
            </Button>
          </div>
        </Form.FormItem>
      </Form>

      {error && (
        <Alert theme="error" message={error} style={{ marginBottom: 16 }} />
      )}

      {response && (
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>响应结果</div>
          <Tabs defaultValue="json">
            <Tabs.TabPanel value="json" label="JSON">
              {renderJsonDisplay(response)}
            </Tabs.TabPanel>
            {response.data && (
              <Tabs.TabPanel value="data" label="数据">
                {renderJsonDisplay(response.data)}
              </Tabs.TabPanel>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ApiTester; 