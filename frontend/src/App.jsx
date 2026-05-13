import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import NewsDetail from './components/NewsDetail'
import { Toaster, toast } from 'react-hot-toast';
import Login from './components/Login'
import WhatsAppButton from './components/WhatsAppButton'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import PropertiesManager from './components/admin/PropertiesManager'
import GenericManager from './components/admin/GenericManager'
import HomeManager from './components/admin/HomeManager'
import MenuManager from './components/admin/MenuManager'
import SliderManager from './components/admin/SliderManager'
import BrokerManager from './components/admin/BrokerManager'
import ServiceManager from './components/admin/ServiceManager'
import FunFactManager from './components/admin/FunFactManager'
import InstaReelManager from './components/admin/InstaReelManager'
import NewsManager from './components/admin/NewsManagerNew'
import TestimonialManager from './components/admin/TestimonialManager'
import BrandManager from './components/admin/BrandManager'
import UserManager from './components/admin/UserManager'

function App() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!!');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Protected Route for Admin
  const AdminRoute = ({ children, privilege }) => {
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return <Navigate to="/" />;
    }
    
    // If it's a regular admin, check for specific privilege if required
    if (user.role === 'admin' && privilege && !user.privileges?.includes(privilege)) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/admin" />;
    }
    
    return children;
  };

  // Superadmin-only Route
  const SuperAdminRoute = ({ children }) => {
    if (!user || user.role !== 'superadmin') {
      toast.error("Superadmin access required");
      return <Navigate to="/admin" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 999999 }}
        toastOptions={{ duration: 5000 }}
      />
      
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            {selectedNews ? (
              <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />
            ) : (
              <Home onSelectNews={(news) => setSelectedNews(news)} />
            )}
            <Footer />
            <WhatsAppButton />
          </>
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout user={user} onLogout={handleLogout} />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AdminRoute privilege="Properties"><PropertiesManager /></AdminRoute>} />
          <Route path="home" element={<AdminRoute privilege="Home"><HomeManager /></AdminRoute>} />
          <Route path="menu" element={<AdminRoute privilege="Menu"><MenuManager /></AdminRoute>} />
          <Route path="slider" element={<AdminRoute privilege="Slider"><SliderManager /></AdminRoute>} />
          <Route path="search" element={<AdminRoute privilege="Search"><GenericManager title="Search Manager" apiEndpoint="search-configs" columns={[{field: 'name', label: 'Config Name'}]} /></AdminRoute>} />
          <Route path="services" element={<AdminRoute privilege="Service"><ServiceManager /></AdminRoute>} />
          <Route path="funfacts" element={<AdminRoute privilege="FunFact"><FunFactManager /></AdminRoute>} />
          <Route path="brokers" element={<AdminRoute privilege="Broker"><BrokerManager /></AdminRoute>} />
          <Route path="insta" element={<AdminRoute privilege="Insta Video"><InstaReelManager /></AdminRoute>} />
          <Route path="news" element={<Navigate to="/admin/news-manager" />} />
          <Route path="news-manager" element={<AdminRoute privilege="News"><NewsManager /></AdminRoute>} />
          <Route path="testimonials" element={<AdminRoute privilege="Testimonials"><TestimonialManager /></AdminRoute>} />
          <Route path="brands" element={<AdminRoute privilege="Brand"><BrandManager /></AdminRoute>} />
          <Route path="users" element={<SuperAdminRoute><UserManager /></SuperAdminRoute>} />
        </Route>
      </Routes>

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default App
