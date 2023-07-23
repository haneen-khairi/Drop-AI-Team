import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfilePassword from './pages/ProfilePassword';
import ProgileMypages from './pages/ProgileMypages';
import ProfileLinks from './pages/ProfileLinks';
import SocialSearch from './pages/SocialSearch';
import GlobalProviders from 'context/GlobalProviders';
import ProductDetails from 'pages/ProductDetails';
import WishList from 'pages/WishList';
import SocialWord from 'pages/SocialWord';
import SeeMore from 'pages/More'; 
import ShowCountry from 'pages/ShowCountry';
import ShowFactory from 'pages/ShowFactory';
import BestSeller from 'pages/BestSeller';
// import AuthService from "./services/auth.service";
// import IUser from './types/user.type';
// import EventBus from "./common/EventBus";

 
const App: React.FC = () => {
  
  return (
    <GlobalProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilePassword" element={<ProfilePassword />} />
          <Route path="/profileMypages" element={<ProgileMypages />} />
          <Route path="/profileLinks" element={<ProfileLinks />} />
          <Route path="/search" element={<Search />} /> 
          <Route path="/bestseller" element={<BestSeller />} />
          <Route path="/showcountry" element={<ShowCountry />} />
          <Route path="/showfactory" element={<ShowFactory />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/social-search" element={<SocialSearch />} />
          <Route path="/social-word" element={<SocialWord />} />
          <Route path="/more-ai" element={<SeeMore />} />
          <Route path="/more-tictok" element={<SeeMore />} />
          <Route path="/more-deals" element={<SeeMore />} />
          <Route path="/more-deals" element={<SeeMore />} />
        </Routes>
      </Router>
    </GlobalProviders>
  );
};

export default App;
