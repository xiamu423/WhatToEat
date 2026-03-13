import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const HistoryPage = () => {
  const navigate = useNavigate();
  const activities = [
    { title: '分享了笔记: 这家本帮菜绝了', date: '2024-03-12', type: 'note' },
    { title: '发表了评价: 味道不错, 稍微有点贵', date: '2024-03-10', type: 'review' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <ArrowLeft onClick={() => navigate(-1)} />
        <h3 style={styles.navTitle}>评价和笔记</h3>
      </div>
      
      <div style={styles.list}>
        {activities.map((act, i) => (
          <div key={i} style={styles.item}>
            <div style={styles.icon}><MessageCircle size={20} color="#FFD000" /></div>
            <div style={styles.info}>
              <p style={styles.itemTitle}>{act.title}</p>
              <span style={styles.date}>{act.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F4F4', minHeight: '100vh' },
  nav: { display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#fff', borderBottom: '1px solid #eee' },
  navTitle: { marginLeft: '12px', fontSize: '17px', fontWeight: '600' },
  list: { padding: '12px' },
  item: { backgroundColor: '#fff', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '8px' },
  info: { flex: 1 },
  itemTitle: { fontSize: '15px', marginBottom: '4px' },
  date: { fontSize: '12px', color: '#999' }
};

export default HistoryPage;
