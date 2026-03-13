import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, History, Settings, ChevronRight, UserCircle } from 'lucide-react';

const MePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.header}>
        <div style={styles.avatarBox}>
          <UserCircle size={80} color="#ccc" />
        </div>
        <div style={styles.userInfo}>
          <h3 style={styles.userName}>五角场小食神</h3>
          <p style={styles.userId}>ID: 1215037</p>
        </div>
        <Settings size={20} color="#666" />
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}><strong>12</strong><span>关注</span></div>
        <div style={styles.statItem}><strong>86</strong><span>粉丝</span></div>
        <div style={styles.statItem}><strong>4</strong><span>动态</span></div>
      </div>

      {/* Menu List */}
      <div style={styles.menuList}>
        <div style={styles.menuItem} onClick={() => navigate('/me/favorites')}>
          <Heart size={20} color="#FF4400" />
          <span style={styles.menuText}>我的收藏夹</span>
          <ChevronRight size={18} color="#999" />
        </div>
        <div style={styles.menuItem} onClick={() => navigate('/me/history')}>
          <History size={20} color="#00A1D6" />
          <span style={styles.menuText}>我的评价和笔记</span>
          <ChevronRight size={18} color="#999" />
        </div>
      </div>

      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <h4>校园合伙人招募中</h4>
          <p>分享你的独家美食地图</p>
        </div>
        <button style={styles.bannerBtn}>去报名</button>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh', padding: '12px' },
  header: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px 16px', display: 'flex', alignItems: 'center', marginBottom: '12px', marginTop: '10px' },
  avatarBox: { marginRight: '16px' },
  userInfo: { flex: 1 },
  userName: { fontSize: '20px', fontWeight: '700', marginBottom: '4px' },
  userId: { fontSize: '13px', color: '#999' },
  statsRow: { display: 'flex', backgroundColor: '#fff', borderRadius: '16px', padding: '16px 0', marginBottom: '12px' },
  statItem: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #eee' },
  menuList: { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' },
  menuItem: { display: 'flex', alignItems: 'center', padding: '16px', gap: '12px', borderBottom: '1px solid #f9f9f9' },
  menuText: { flex: 1, fontSize: '15px', fontWeight: '500' },
  banner: { backgroundColor: '#FFD000', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  bannerContent: { color: '#000' },
  bannerBtn: { backgroundColor: '#000', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }
};

export default MePage;
