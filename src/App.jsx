import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RankPage from './pages/RankPage';
import PublishPage from './pages/PublishPage';
import MePage from './pages/MePage';
import MerchantDetails from './pages/MerchantDetails';
import ShopNotePage from './pages/ShopNotePage';
import ReviewPage from './pages/ReviewPage';
import FavoritePage from './pages/FavoritePage';
import HistoryPage from './pages/HistoryPage';

import SearchListPage from './pages/SearchListPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchListPage />} />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/merchant/:id" element={<MerchantDetails />} />
          <Route path="/publish/note" element={<ShopNotePage />} />
          <Route path="/publish/review" element={<ReviewPage />} />
          <Route path="/me/favorites" element={<FavoritePage />} />
          <Route path="/me/history" element={<HistoryPage />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
