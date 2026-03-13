import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, MessageSquare, ChevronRight, Camera } from 'lucide-react';

const PublishPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>发布你的美食发现</h2>
      
      <div style={styles.box} onClick={() => navigate('/publish/note')}>
        <div style={styles.iconBox}><Camera size={32} color="#FFD000" /></div>
        <div style={styles.textBox}>
          <h3 style={styles.boxTitle}>探店笔记</h3>
          <p style={styles.boxDesc}>记录这一刻的美好味道</p>
        </div>
        <ChevronRight color="#999" />
      </div>

      <div style={styles.box} onClick={() => navigate('/publish/review')}>
        <div style={styles.iconBox}><MessageSquare size={32} color="#FF9500" /></div>
        <div style={styles.textBox}>
          <h3 style={styles.boxTitle}>用餐评价</h3>
          <p style={styles.boxDesc}>分享你的真实用餐体验</p>
        </div>
        <ChevronRight color="#999" />
      </div>

      <div style={styles.tips}>
        <h4>发布贴士</h4>
        <ul>
          <li>上传清晰的实拍图更容易获得点赞</li>
          <li>诚实的评价能帮助更多同学避雷</li>
          <li>记得添加商户定位哦</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#F4F4F4', minHeight: '100vh' },
  title: { fontSize: '22px', fontWeight: '700', marginBottom: '24px', marginTop: '20px' },
  box: { backgroundColor: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  iconBox: { width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' },
  textBox: { flex: 1 },
  boxTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '4px' },
  boxDesc: { fontSize: '13px', color: '#999' },
  tips: { marginTop: '40px', padding: '16px', color: '#666' },
};

export default PublishPage;
