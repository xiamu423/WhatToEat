import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Star, ChevronDown, Check } from 'lucide-react';
import { shopService } from '../services/shopService';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null); // '价格', '类别', '距离', '评分'
  const [filters, setFilters] = useState({
    price: { label: '不限', min: 0, max: Infinity },
    category: { label: '不限', value: '餐饮服务' },
    sort: 'default'
  });
  
  const navigate = useNavigate();
  const filterRef = useRef(null);

  useEffect(() => {
    loadShops();
  }, [filters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadShops = async () => {
    setLoading(true);
    try {
      const params = {
        category: filters.category.value,
        sortrule: filters.sort === 'rating' ? 'weight' : (filters.sort === 'distance' ? 'distance' : ''), 
        sortByRating: filters.sort === 'rating',
        minPrice: filters.price.min,
        maxPrice: filters.price.max
      };
      const data = await shopService.getNearbyShops(params);
      setShops(data);
    } catch (error) {
      console.error('Failed to load shops', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const priceOptions = [
    { label: '不限', min: 0, max: Infinity },
    { label: '50元以下', min: 0, max: 50 },
    { label: '50-100元', min: 50, max: 100 },
    { label: '100-200元', min: 100, max: 200 },
    { label: '200元以上', min: 200, max: Infinity },
  ];

  const categoryOptions = [
    { label: '全部美食', value: '餐饮服务' },
    { label: '快餐便当', value: '快餐' },
    { label: '火锅', value: '火锅' },
    { label: '奶茶甜品', value: '冷饮店|甜品店' },
    { label: '小吃烧烤', value: '小吃|烧烤' },
    { label: '日韩料理', value: '日本料理|韩国料理' },
  ];

  const toggleFilter = (type) => {
    if (type === '距离优先') {
      setFilters(prev => ({ ...prev, sort: prev.sort === 'distance' ? 'default' : 'distance' }));
      setActiveFilter(null);
    } else if (type === '高分优先') {
      setFilters(prev => ({ ...prev, sort: prev.sort === 'rating' ? 'default' : 'rating' }));
      setActiveFilter(null);
    } else {
      setActiveFilter(activeFilter === type ? null : type);
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.location}>
          <MapPin size={16} color="#FFD000" />
          <span style={styles.locationText}>复旦大学地铁站</span>
        </div>
        <form onSubmit={handleSearch} style={styles.searchContainer}>
          <Search size={18} color="#999" />
          <input 
            type="text" 
            placeholder="搜索店名" 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={styles.searchBtn}>搜索</button>
        </form>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterWrapper} ref={filterRef}>
        <div style={styles.filterBar}>
          <div 
            style={{...styles.filterItem, color: (activeFilter === '价格' || filters.price.label !== '不限') ? '#FFD000' : '#666'}} 
            onClick={() => toggleFilter('价格')}
          >
            {filters.price.label === '不限' ? '价格' : filters.price.label} <ChevronDown size={14} />
          </div>
          <div 
            style={{...styles.filterItem, color: (activeFilter === '类别' || filters.category.label !== '全部美食') ? '#FFD000' : '#666'}} 
            onClick={() => toggleFilter('类别')}
          >
            {filters.category.label === '全部美食' ? '类别' : filters.category.label} <ChevronDown size={14} />
          </div>
          <div 
            style={{...styles.filterItem, color: filters.sort === 'distance' ? '#FFD000' : '#666'}} 
            onClick={() => toggleFilter('距离优先')}
          >
            距离优先
          </div>
          <div 
            style={{...styles.filterItem, color: filters.sort === 'rating' ? '#FFD000' : '#666'}} 
            onClick={() => toggleFilter('高分优先')}
          >
            高分优先
          </div>
        </div>

        {/* Dropdowns */}
        {activeFilter === '价格' && (
          <div style={styles.dropdown}>
            {priceOptions.map(opt => (
              <div 
                key={opt.label} 
                style={styles.dropdownItem} 
                onClick={() => {
                  setFilters(prev => ({ ...prev, price: opt }));
                  setActiveFilter(null);
                }}
              >
                <span>{opt.label}</span>
                {filters.price.label === opt.label && <Check size={16} color="#FFD000" />}
              </div>
            ))}
          </div>
        )}

        {activeFilter === '类别' && (
          <div style={styles.dropdown}>
            {categoryOptions.map(opt => (
              <div 
                key={opt.label} 
                style={styles.dropdownItem} 
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: opt }));
                  setActiveFilter(null);
                }}
              >
                <span>{opt.label}</span>
                {filters.category.label === opt.label && <Check size={16} color="#FFD000" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shop List */}
      <div style={styles.list}>
        {loading ? (
          <div style={styles.center}>正在寻找最适合你的美食...</div>
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
              <div style={styles.shopInfo}>
                <h3 style={styles.shopName}>{shop.name}</h3>
                <div style={styles.ratingRow}>
                  <Star size={14} color="#FF9500" fill="#FF9500" />
                  <span style={styles.ratingText}>{shop.rating}</span>
                  <span style={styles.priceText}>￥{shop.cost}/人</span>
                </div>
                <p style={styles.addressText}>{shop.address || '五角场大学城地区'}</p>
                <div style={styles.footerRow}>
                  <div style={styles.distanceTag}>
                    {shop.distance ? `${(shop.distance / 1000).toFixed(1)}km` : '附近'}
                  </div>
                  <span style={styles.categoryTag}>{shop.type?.split(';').pop()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.center}>
            <p>该筛选条件下暂无商户</p>
            <button 
              style={styles.resetBtn} 
              onClick={() => setFilters({
                price: { label: '不限', min: 0, max: Infinity },
                category: { label: '全部美食', value: '餐饮服务' },
                sort: 'distance'
              })}
            >
              重置筛选
            </button>
          </div>
        )}
      </div>
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh' },
  topBar: { display: 'flex', alignItems: 'center', padding: '12px 16px', backgroundColor: '#fff', gap: '10px' },
  location: { display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' },
  locationText: { fontSize: '14px', fontWeight: '700', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' },
  searchContainer: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: '20px', padding: '6px 14px', gap: '8px' },
  searchInput: { flex: 1, border: 'none', backgroundColor: 'transparent', fontSize: '14px', outline: 'none' },
  searchBtn: { fontSize: '14px', color: '#111', fontWeight: '700', padding: '0 4px', background: 'none', border: 'none' },
  filterWrapper: { position: 'relative', zIndex: 100 },
  filterBar: { display: 'flex', justifyContent: 'space-around', padding: '12px 0', backgroundColor: '#fff', borderBottom: '1px solid #eee' },
  filterItem: { display: 'flex', alignItems: 'center', fontSize: '14px', gap: '4px', cursor: 'pointer', fontWeight: '500' },
  dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderTop: '1px solid #f5f5f5', padding: '8px 0' },
  dropdownItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', fontSize: '14px', color: '#333' },
  list: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' },
  card: { display: 'flex', backgroundColor: '#fff', borderRadius: '16px', padding: '12px', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' },
  shopImg: { width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  shopInfo: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  shopName: { fontSize: '17px', fontWeight: '700', margin: '0 0 4px 0', color: '#111' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  ratingText: { fontSize: '14px', fontWeight: '800', color: '#FF9500' },
  priceText: { fontSize: '13px', color: '#666' },
  addressText: { fontSize: '12px', color: '#999', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  distanceTag: { fontSize: '11px', color: '#666', backgroundColor: '#F5F5F5', padding: '2px 8px', borderRadius: '4px' },
  categoryTag: { fontSize: '11px', color: '#00A1D6', backgroundColor: '#E1F5FE', padding: '2px 8px', borderRadius: '4px' },
  center: { textAlign: 'center', padding: '60px 20px', color: '#999' },
  resetBtn: { marginTop: '12px', color: '#FFD000', fontSize: '14px', fontWeight: '700', border: '1px solid #FFD000', padding: '6px 16px', borderRadius: '20px', background: 'none' }
};

export default HomePage;
