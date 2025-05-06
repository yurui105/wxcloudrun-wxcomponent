import React, { useState } from 'react';
import { Form, Input, Upload, Button, MessagePlugin, Loading } from 'tdesign-react';
import { request } from '../../../utils/common';
import { uploadImageRequest } from '../../../utils/apis';
import styles from './index.module.less';

const ImageUpload: React.FC = () => {
  const [appid, setAppid] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // 上传图片
  const uploadImage = async () => {
    if (!appid) {
      MessagePlugin.error('请输入APPID');
      return;
    }

    if (!file) {
      MessagePlugin.error('请选择要上传的图片');
      return;
    }

    setLoading(true);
    try {
      // 创建表单数据
      const formData = new FormData();
      formData.append('appid', appid);
      formData.append('image', file);

      // 发送请求
      const response = await request({
        request: uploadImageRequest,
        data: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      });

      if (response && response.code === 0 && response.data) {
        MessagePlugin.success('图片上传成功');
        setImageUrl(response.data.url);
      } else {
        MessagePlugin.error(response?.errorMsg || '图片上传失败');
      }
    } catch (error) {
      console.error('上传图片出错:', error);
      MessagePlugin.error('图片上传失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理文件变更
  const handleFileChange = (files: any) => {
    if (files.length > 0) {
      setFile(files[0].raw);
    } else {
      setFile(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h2>公众号图片上传</h2>
        <Loading loading={loading}>
          <Form labelWidth={80}>
            <Form.FormItem label="APPID">
              <Input 
                value={appid} 
                onChange={(value) => setAppid(String(value))} 
                placeholder="请输入公众号APPID" 
              />
            </Form.FormItem>
            <Form.FormItem label="图片">
              <Upload
                action=""
                autoUpload={false}
                onChange={handleFileChange}
                accept="image/*"
                theme="custom"
              >
                <Button>选择图片</Button>
              </Upload>
              {file && (
                <div className={styles.fileInfo}>
                  <span>已选择: {file.name}</span>
                </div>
              )}
            </Form.FormItem>
            <Form.FormItem>
              <Button theme="primary" onClick={uploadImage} loading={loading}>
                上传图片
              </Button>
            </Form.FormItem>
          </Form>

          {imageUrl && (
            <div className={styles.result}>
              <h3>上传成功</h3>
              <p>图片URL：{imageUrl}</p>
              <div className={styles.preview}>
                <img src={imageUrl} alt="上传的图片" />
              </div>
            </div>
          )}
        </Loading>
      </div>
    </div>
  );
};

export default ImageUpload; 