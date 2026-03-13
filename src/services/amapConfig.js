export const AMAP_CONFIG = {
  key: import.meta.env.VITE_AMAP_KEY,
  secret: import.meta.env.VITE_AMAP_SECRET,
  center: [121.503, 31.298], // Fudan University Metro Station
  radius: 3000 // 3km
};

// Security config for Amap JS API
window._AMapSecurityConfig = {
  securityJsCode: AMAP_CONFIG.secret,
};
