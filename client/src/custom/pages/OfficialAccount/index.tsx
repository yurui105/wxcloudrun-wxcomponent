import React from 'react';
import styles from './index.module.less';

const OfficialAccount: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h2>公众号管理</h2>
        <p>欢迎使用公众号管理功能。请从左侧导航栏选择相应功能：</p>
        <ul>
          <li><strong>草稿箱管理</strong>：新建草稿、获取草稿列表、查看草稿总数</li>
          <li><strong>发布管理</strong>：查看成功发布的文章列表</li>
          <li><strong>图文分析</strong>：图文分析、用户阅读和分享统计</li>
          <li><strong>广告分析</strong>：广告位数据、返佣商品数据、结算收入数据</li>
          <li><strong>图片上传</strong>：上传图片到公众号素材库</li>
        </ul>
      </div>
    </div>
  );
};

export default OfficialAccount; 