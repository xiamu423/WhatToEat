import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Search } from 'lucide-react';

const ShopNotePage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  
  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <ArrowLeft onClick={() => navigate(-1)} />
        <h3 style={styles.navTitle}>写探店笔记</h3>
        <button style={styles.pubBtn}><Send size={18} /> 发布</button>
      </div>

      <div style={styles.shopSelector}>
        <Search size={18} color="#999" />
        <span style={styles.selectText}>选择商户...</span>
      </div>

      <textarea 
        style={styles.editor} 
        placeholder="分享你的美食故事..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={styles.imageGrid}>
        <div style={styles.addImg}>+ 添加图片</div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#fff', minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #eee', gap: '12px' },
  navTitle: { flex: 1, fontSize: '17px', textAlign: 'center' },
  pubBtn: { backgroundColor: '#FFD000', padding: '6px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' },
  shopSelector: { margin: '16px', padding: '12px', backgroundColor: '#F5F5F5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' },
  selectText: { color: '#999', fontSize: '14px' },
  editor: { width: '100%', border: 'none', padding: '16px', fontSize: '16px', outline: 'none', minHeight: '200px', resize: 'none' },
  imageGrid: { padding: '16px' },
  addImg: { width: '100px', height: '100px', border: '2px dashed #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', borderRadius: '8px' }
};

export default ShopNotePage;
