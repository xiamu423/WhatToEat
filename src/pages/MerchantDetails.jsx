import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Star, Share2, Heart } from 'lucide-react';
import { shopService } from '../services/shopService';

const MerchantDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const shop = state?.shop;
  const [isFav, setIsFav] = useState(shop ? shopService.isFavorite(shop.id) : false);

  if (!shop) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>未找到商户信息</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '12px', color: '#00A1D6' }}>返回首页</button>
      </div>
    );
  }

  const handleToggleFav = () => {
    shopService.toggleFavorite(shop);
    setIsFav(!isFav);
  };

  const shareShop = () => {
    if (navigator.share) {
      navigator.share({
        title: shop.name,
        text: `看看这家店: ${shop.name}`,
        url: window.location.href,
      });
    } else {
      alert('分享功能在当前环境不可用');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Image */}
      <div style={styles.imgHeader}>
        <img src={shop.mainImage || (shop.photos && shop.photos[0]?.url)} alt={shop.name} style={styles.heroImg} />
        <div style={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="#fff" />
        </div>
        <div style={styles.actionBtns}>
          <div style={styles.circleBtn} onClick={shareShop}><Share2 size={20} color="#fff" /></div>
          <div style={styles.circleBtn} onClick={handleToggleFav}>
            <Heart size={20} color={isFav ? '#FFD000' : '#fff'} fill={isFav ? '#FFD000' : 'none'} />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div style={styles.content}>
        <div style={styles.infoCard}>
          <h1 style={styles.name}>{shop.name}</h1>
          <div style={styles.ratingRow}>
            <Star size={16} fill="#FF9500" color="#FF9500" />
            <span style={styles.rating}>{shop.rating}</span>
            <span style={styles.reviews}>{Math.floor(100 + Math.random() * 900)}条评论</span>
            <span style={styles.cost}>￥{shop.cost}/人</span>
          </div>
          <div style={styles.tags}>
            <span style={styles.type}>{shop.type?.split(';').pop() || '精选餐饮'}</span>
            <span style={styles.tag}>五角场必吃</span>
          </div>
        </div>

        {/* Address & Contact */}
        <div style={styles.detailList}>
          <div style={styles.detailItem}>
            <MapPin size={20} color="#666" />
            <span style={styles.itemText}>{shop.address || '上海市杨浦区五角场大学城'}</span>
          </div>
          <div style={styles.detailItem} onClick={() => window.location.href = `tel:${shop.tel || '400-000-0000'}`}>
            <Phone size={20} color="#666" />
            <span style={styles.itemText}>{shop.tel || '商家未提供电话'}</span>
          </div>
        </div>

        {/* Features */}
        <div style={styles.features}>
          <h4>商户服务</h4>
          <div style={styles.featGrid}>
            <div style={styles.featItem}>✅ 极速退</div>
            <div style={styles.featItem}>✅ 可订座</div>
            <div style={styles.featItem}>✅ 免费停车场</div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={styles.bottomBar}>
          <button style={styles.orderBtn} onClick={() => alert('订单功能正在快马加鞭赶来...')}>立即下单</button>
          <button style={styles.bookBtn}>在线订座</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh', paddingBottom: '100px' },
  imgHeader: { height: '260px', position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  backBtn: { position: 'absolute', top: '24px', left: '20px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px', cursor: 'pointer' },
  actionBtns: { position: 'absolute', top: '24px', right: '20px', display: 'flex', gap: '12px' },
  circleBtn: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '50%', padding: '8px', cursor: 'pointer' },
  content: { marginTop: '-30px', position: 'relative', zIndex: 10 },
  infoCard: { backgroundColor: '#fff', margin: '0 12px', padding: '24px 20px', borderRadius: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' },
  name: { fontSize: '24px', fontWeight: '800', margin: '0 0 12px 0', color: '#111' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
  rating: { color: '#FF9500', fontWeight: '800', fontSize: '18px' },
  reviews: { color: '#999', fontSize: '14px' },
  cost: { color: '#333', fontSize: '15px', fontWeight: '600', marginLeft: 'auto' },
  tags: { display: 'flex', gap: '10px' },
  type: { backgroundColor: '#F5F5F5', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', color: '#666' },
  tag: { color: '#FF4400', backgroundColor: '#FFF0ED', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '500' },
  detailList: { backgroundColor: '#fff', margin: '12px', padding: '8px 20px', borderRadius: '16px' },
  detailItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid #f5f5f5' },
  itemText: { flex: 1, fontSize: '15px', color: '#333', lineHeight: '1.4' },
  features: { backgroundColor: '#fff', margin: '12px', padding: '20px', borderRadius: '16px' },
  featGrid: { display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' },
  featItem: { fontSize: '13px', color: '#4CAF50' },
  bottomBar: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '500px', backgroundColor: '#fff', padding: '16px 20px', display: 'flex', gap: '12px', borderTop: '1px solid #eee', boxShadow: '0 -4px 12px rgba(0,0,0,0.05)', zIndex: 100 },
  orderBtn: { flex: 2, backgroundColor: '#FFD000', color: '#000', fontWeight: '800', padding: '14px', borderRadius: '28px', fontSize: '17px', border: 'none' },
  bookBtn: { flex: 1, border: '1.5px solid #FFD000', color: '#FFD000', fontWeight: '700', padding: '14px', borderRadius: '28px', fontSize: '15px', backgroundColor: 'transparent' }
};

export default MerchantDetails;
