import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star } from 'lucide-react';
import { shopService } from '../services/shopService';

const SearchListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');

  useEffect(() => {
    if (query) {
      loadResults();
    }
  }, [query]);

  const loadResults = async () => {
    setLoading(true);
    const data = await shopService.getNearbyShops({ query });
    setShops(data);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      loadResults();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <ArrowLeft onClick={() => navigate('/')} />
        <form onSubmit={handleSearch} style={styles.searchContainer}>
          <Search size={18} color="#999" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
            placeholder="搜索店名"
          />
        </form>
      </div>

      <div style={styles.list}>
        {loading ? (
          <div style={styles.center}>正在查找美食...</div>
        ) : shops.length > 0 ? (
          shops.map((shop, index) => (
            <div 
              key={shop.id || index} 
              style={styles.card}
              onClick={() => navigate(`/merchant/${shop.id}`, { state: { shop } })}
            >
              <div style={styles.shopImg}>
                <img src={shop.mainImage} alt={shop.name} style={styles.img} />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{shop.name}</h3>
                <div style={styles.ratingRow}>
                  <Star size={14} color="#FF9500" fill="#FF9500" />
                  <span style={styles.rating}>{shop.rating}</span>
                  <span style={styles.cost}>￥{shop.cost}/人</span>
                </div>
                <p style={styles.addr}>{shop.address}</p>
                <div style={styles.tag}>{shop.type?.split(';').pop()}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.center}>
            <p>未找到相关商户</p>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>换个关键词试试吧</p>
          </div>
        )}
      </div>
      <div style={{ height: '60px' }}></div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: '#fff', gap: '12px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 },
  searchContainer: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: '20px', padding: '6px 12px', gap: '8px' },
  searchInput: { flex: 1, border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '14px' },
  list: { padding: '12px' },
  card: { backgroundColor: '#fff', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
  shopImg: { width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  name: { fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: '#111' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' },
  rating: { color: '#FF9500', fontWeight: '800' },
  cost: { color: '#666' },
  addr: { fontSize: '12px', color: '#999', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  tag: { fontSize: '10px', color: '#00A1D6', alignSelf: 'flex-start', marginTop: '6px', backgroundColor: '#E1F5FE', padding: '1px 6px', borderRadius: '4px' },
  center: { textAlign: 'center', padding: '80px 20px', color: '#999' }
};

export default SearchListPage;
