export const shopService = {
  // Center: Fudan University Metro Station
  center: [121.503, 31.298],

  getNearbyShops: async (params = {}) => {
    const { 
      query = '', 
      category = '餐饮服务', 
      sortrule = 'distance', 
      pageSize = 30, // Request more to allow client-side filtering
      minPrice = 0,
      maxPrice = Infinity
    } = params;

    return new Promise((resolve) => {
      if (!window.AMap) {
        console.error('AMap is not loaded');
        resolve([]);
        return;
      }

      window.AMap.plugin(['AMap.PlaceSearch'], () => {
        const placeSearch = new window.AMap.PlaceSearch({
          type: category,
          pageSize: pageSize,
          pageIndex: 1,
          city: '上海',
          citylimit: true,
          extensions: 'all',
          sortrule: sortrule
        });

        const callback = (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            let pois = result.poiList.pois.map(poi => ({
              ...poi,
              rating: parseFloat(poi.biz_ext?.rating || (4.0 + Math.random() * 1.0).toFixed(1)),
              cost: parseInt(poi.biz_ext?.cost || Math.floor(25 + Math.random() * 100)),
              mainImage: poi.photos?.[0]?.url || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop&q=80`
            }));

            // Client-side filtering for price
            if (minPrice > 0 || maxPrice < Infinity) {
              pois = pois.filter(p => p.cost >= minPrice && p.cost <= maxPrice);
            }

            // Client-side sorting for rating if requested
            if (params.sortByRating) {
              pois.sort((a, b) => b.rating - a.rating);
            }

            resolve(pois.slice(0, 15)); // Always return 15 results
          } else {
            resolve([]);
          }
        };

        if (query) {
          placeSearch.search(query, callback);
        } else {
          placeSearch.searchNearBy('', shopService.center, 3000, callback);
        }
      });
    });
  },

  getFavorites: () => {
    const favs = localStorage.getItem('mt_favorites');
    return favs ? JSON.parse(favs) : [];
  },

  toggleFavorite: (shop) => {
    const favs = shopService.getFavorites();
    const index = favs.findIndex(f => f.id === shop.id);
    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(shop);
    }
    localStorage.setItem('mt_favorites', JSON.stringify(favs));
    return favs;
  },

  isFavorite: (shopId) => {
    const favs = shopService.getFavorites();
    return favs.some(f => f.id === shopId);
  }
};
