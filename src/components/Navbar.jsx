import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, PlusSquare, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={styles.nav} className="safe-area-bottom">
      <NavLink to="/" style={({ isActive }) => ({ ...styles.navItem, color: isActive ? '#000' : '#666' })}>
        <Home size={24} />
        <span style={styles.label}>首页</span>
      </NavLink>
      <NavLink to="/rank" style={({ isActive }) => ({ ...styles.navItem, color: isActive ? '#000' : '#666' })}>
        <BarChart2 size={24} />
        <span style={styles.label}>榜单</span>
      </NavLink>
      <NavLink to="/publish" style={({ isActive }) => ({ ...styles.navItem, color: isActive ? '#000' : '#666' })}>
        <PlusSquare size={24} />
        <span style={styles.label}>发布</span>
      </NavLink>
      <NavLink to="/me" style={({ isActive }) => ({ ...styles.navItem, color: isActive ? '#000' : '#666' })}>
        <User size={24} />
        <span style={styles.label}>我的</span>
      </NavLink>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '500px',
    height: '60px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    zIndex: 1000,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    transition: 'transform 0.2s',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
  }
};

export default Navbar;
