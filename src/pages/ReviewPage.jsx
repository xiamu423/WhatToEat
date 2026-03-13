import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

const ReviewPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  
  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <ArrowLeft onClick={() => navigate(-1)} />
        <h3 style={styles.navTitle}>发表评价</h3>
        <button style={styles.pubBtn}>提交</button>
      </div>

      <div style={styles.ratingBox}>
        <h4 style={styles.boxTitle}>给商户打分</h4>
        <div style={styles.stars}>
          {[1,2,3,4,5].map(s => (
            <Star 
              key={s} 
              size={32} 
              fill={s <= rating ? '#FFD000' : 'none'} 
              color={s <= rating ? '#FFD000' : '#ddd'} 
              onClick={() => setRating(s)}
            />
          ))}
        </div>
      </div>

      <div style={styles.shopSelector}>选择商户...</div>

      <textarea style={styles.editor} placeholder="味道怎么样？环境服务好吗？" />
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#fff', minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #eee', gap: '12px' },
  navTitle: { flex: 1, fontSize: '17px', textAlign: 'center' },
  pubBtn: { backgroundColor: '#FFD000', padding: '6px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: '600' },
  ratingBox: { padding: '30px 20px', textAlign: 'center' },
  stars: { display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' },
  shopSelector: { margin: '0 16px', padding: '12px', backgroundColor: '#F5F5F5', borderRadius: '8px', color: '#999' },
  editor: { width: '100%', border: 'none', padding: '20px', fontSize: '16px', outline: 'none', minHeight: '150px' }
};

export default ReviewPage;
