import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Trophy } from 'lucide-react';
import { shopService } from '../services/shopService';

const RankPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    setLoading(true);
    try {
      // Fetch 15 results for the ranking as requested
      const data = await shopService.getNearbyShops({ pageSize: 15, sortrule: 'weight' });
      // Sort by rating to ensure top 15 list is accurate
      const sorted = [...data].sort((a, b) => b.rating - a.rating);
      setShops(sorted);
    } catch (error) {
      console.error('Failed to load rankings', error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Trophy color="#FFD000" size={24} />
        <h2 style={styles.title}>五角场大学城必吃榜单</h2>
      </div>

      <div style={styles.list}>
        {loading ? (
          <div style={styles.center}>正在加载榜单...</div>
        ) : (
          shops.map((shop, index) => (
            <div 
              key={shop.id || index} 
              style={styles.card}
              onClick={() => navigate(`/merchant/${shop.id}`, { state: { shop } })}
            >
              <div style={styles.rankNum}>
                {index < 3 ? (
                  <TrendingUp size={20} color={index === 0 ? '#FFD000' : index === 1 ? '#95a5a6' : '#d35400'} />
                ) : index + 1}
              </div>
              <div style={styles.shopImg}>
                <img src={shop.mainImage} alt={shop.name} style={styles.img} />
              </div>
              <div style={styles.shopInfo}>
                <h3 style={styles.shopName}>{shop.name}</h3>
                <div style={styles.ratingRow}>
                  <Star size={14} color="#FF9500" fill="#FF9500" />
                  <span style={styles.ratingText}>{shop.rating}</span>
                  <span style={styles.costText}>￥{shop.cost}/人</span>
                </div>
                <div style={styles.tagRow}>
                  <span style={styles.tag}>必吃榜</span>
                  <span style={styles.tag}>{shop.type?.split(';').pop()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh' },
  header: {
    padding: '24px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: { fontSize: '20px', fontWeight: '800', color: '#111' },
  list: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '12px',
    gap: '12px',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  rankNum: {
    width: '32px',
    fontSize: '20px',
    fontWeight: '900',
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  shopImg: { width: '85px', height: '85px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  shopInfo: { flex: 1, overflow: 'hidden' },
  shopName: { fontSize: '16px', fontWeight: '700', margin: '0 0 6px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  ratingText: { fontSize: '15px', fontWeight: '800', color: '#FF9500' },
  costText: { fontSize: '14px', color: '#666' },
  tagRow: { display: 'flex', gap: '8px', marginTop: '8px' },
  tag: { fontSize: '11px', color: '#FF4400', backgroundColor: '#FFF0ED', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' },
  center: { textAlign: 'center', padding: '60px 20px', color: '#999' }
};

export default RankPage;
