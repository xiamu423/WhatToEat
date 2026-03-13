import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Trash2 } from 'lucide-react';
import { shopService } from '../services/shopService';

const FavoritePage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(shopService.getFavorites());
  }, []);

  const handleRemove = (e, shop) => {
    e.stopPropagation();
    const updated = shopService.toggleFavorite(shop);
    setFavorites([...updated]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <ArrowLeft onClick={() => navigate(-1)} />
        <h3 style={styles.navTitle}>我的收藏夹</h3>
      </div>
      
      <div style={styles.list}>
        {favorites.length > 0 ? (
          favorites.map(shop => (
            <div key={shop.id} style={styles.card} onClick={() => navigate(`/merchant/${shop.id}`, { state: { shop } })}>
              <div style={styles.shopImg}>
                <img src={shop.mainImage} alt={shop.name} style={styles.img} />
              </div>
              <div style={styles.info}>
                <div style={styles.headerRow}>
                  <h4 style={styles.name}>{shop.name}</h4>
                  <Trash2 size={16} color="#999" onClick={(e) => handleRemove(e, shop)} />
                </div>
                <div style={styles.meta}>
                  <Star size={12} fill="#FF9500" color="#FF9500" />
                  <span style={styles.rating}>{shop.rating}</span>
                  <span style={styles.cost}>￥{shop.cost}/人</span>
                </div>
                <p style={styles.addr}>{shop.address}</p>
                <div style={styles.tag}>已收藏</div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.empty}>
            <p>还没有收藏的商户哦</p>
            <button style={styles.goBtn} onClick={() => navigate('/')}>去逛逛</button>
          </div>
        )}
      </div>
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#fff', borderBottom: '1px solid #eee' },
  navTitle: { marginLeft: '12px', fontSize: '17px', fontWeight: '600' },
  list: { padding: '12px' },
  card: { backgroundColor: '#fff', borderRadius: '12px', display: 'flex', padding: '12px', gap: '12px', marginBottom: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  shopImg: { width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { flex: 1, display: 'flex', flexDirection: 'column' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: '15px', fontWeight: '600', marginBottom: '4px', maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  meta: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' },
  rating: { color: '#FF9500', fontWeight: '700' },
  cost: { color: '#333' },
  addr: { fontSize: '12px', color: '#999', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  tag: { fontSize: '10px', color: '#999', alignSelf: 'flex-end', marginTop: 'auto' },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#999' },
  goBtn: { marginTop: '16px', backgroundColor: '#FFD000', color: '#000', padding: '8px 24px', borderRadius: '20px', fontWeight: '600' }
};

export default FavoritePage;
