import React from 'react';
import { Layout, Tabs } from 'tdesign-react';
import ApiTester from '../../components/ApiTester';
import { 
  uploadImageRequest, 
  uploadVoiceRequest, 
  uploadVideoRequest, 
  uploadThumbRequest, 
  getMediaRequest,
  uploadMaterialImageRequest,
  uploadArticleImageRequest,
  uploadMaterialVoiceRequest,
  uploadMaterialVideoRequest,
  uploadMaterialThumbRequest,
  getMaterialListRequest,
  getMaterialRequest
} from '../../utils/apis';

const { Content } = Layout;

const AssetApiPage: React.FC = () => {
  return (
    <Content style={{ padding: '24px' }}>
      <Tabs placement="top" defaultValue="uploadImage">
        <Tabs.TabPanel value="uploadImage" label="上传临时图片">
          <ApiTester
            apiTitle="上传临时图片素材"
            apiDescription="上传临时图片素材，有效期为3天"
            requestMsg={uploadImageRequest}
            requestParams={{
              description: '' // 可选文件描述
            }}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.jpg', '.jpeg', '.png', '.gif']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadVoice" label="上传临时语音">
          <ApiTester
            apiTitle="上传临时语音素材"
            apiDescription="上传临时语音素材，有效期为3天"
            requestMsg={uploadVoiceRequest}
            requestParams={{
              description: '' // 可选文件描述
            }}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.mp3', '.amr', '.wma']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadVideo" label="上传临时视频">
          <ApiTester
            apiTitle="上传临时视频素材"
            apiDescription="上传临时视频素材，有效期为3天"
            requestMsg={uploadVideoRequest}
            requestParams={{
              title: '', // 视频标题
              introduction: '' // 视频描述
            }}
            requiredParams={['title', 'introduction']}
            isFileUpload={true}
            fileTypes={['.mp4']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadThumb" label="上传临时缩略图">
          <ApiTester
            apiTitle="上传临时缩略图素材"
            apiDescription="上传临时缩略图素材，有效期为3天"
            requestMsg={uploadThumbRequest}
            requestParams={{
              description: '' // 可选文件描述
            }}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.jpg', '.jpeg', '.png']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getMedia" label="获取临时素材">
          <ApiTester
            apiTitle="获取临时素材"
            apiDescription="获取已上传的临时素材，返回素材内容或下载链接"
            requestMsg={getMediaRequest}
            requestParams={{
              media_id: '' // 媒体文件ID
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadMaterialImage" label="上传永久图片">
          <ApiTester
            apiTitle="上传永久图片素材"
            apiDescription="上传永久图片素材，此接口上传的图片不占用公众号的素材库容量"
            requestMsg={uploadMaterialImageRequest}
            requestParams={{}}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.jpg', '.jpeg', '.png', '.gif']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadArticleImage" label="上传图文消息内图片">
          <ApiTester
            apiTitle="上传图文消息内图片"
            apiDescription="上传图文消息内的图片，获取图片URL"
            requestMsg={uploadArticleImageRequest}
            requestParams={{}}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.jpg', '.jpeg', '.png', '.gif']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadMaterialVoice" label="上传永久语音">
          <ApiTester
            apiTitle="上传永久语音素材"
            apiDescription="上传永久语音素材"
            requestMsg={uploadMaterialVoiceRequest}
            requestParams={{}}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.mp3', '.amr', '.wma']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadMaterialVideo" label="上传永久视频">
          <ApiTester
            apiTitle="上传永久视频素材"
            apiDescription="上传永久视频素材"
            requestMsg={uploadMaterialVideoRequest}
            requestParams={{
              title: '', // 视频标题
              introduction: '' // 视频描述
            }}
            requiredParams={['title', 'introduction']}
            isFileUpload={true}
            fileTypes={['.mp4']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="uploadMaterialThumb" label="上传永久缩略图">
          <ApiTester
            apiTitle="上传永久缩略图素材"
            apiDescription="上传永久缩略图素材"
            requestMsg={uploadMaterialThumbRequest}
            requestParams={{}}
            requiredParams={[]}
            isFileUpload={true}
            fileTypes={['.jpg', '.jpeg', '.png']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getMaterialList" label="获取素材列表">
          <ApiTester
            apiTitle="获取素材列表"
            apiDescription="获取永久素材的列表"
            requestMsg={getMaterialListRequest}
            requestParams={{
              type: 'image',  // 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
              offset: '0',    // 从全部素材的该偏移位置开始返回，0表示从第一个素材
              count: '20'     // 返回素材的数量，取值在1到20之间
            }}
            requiredParams={['type', 'offset', 'count']}
          />
        </Tabs.TabPanel>

        <Tabs.TabPanel value="getMaterial" label="获取永久素材">
          <ApiTester
            apiTitle="获取永久素材"
            apiDescription="获取永久素材的详细信息"
            requestMsg={getMaterialRequest}
            requestParams={{
              media_id: '' // 要获取的素材的media_id
            }}
            requiredParams={['media_id']}
          />
        </Tabs.TabPanel>
      </Tabs>
    </Content>
  );
};

export default AssetApiPage; 