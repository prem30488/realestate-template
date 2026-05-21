import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import NewsDetail from './components/NewsDetail'
import { Toaster, toast } from 'react-hot-toast';
import { Box } from '@mui/material';
import Login from './components/Login'
import WhatsAppButton from './components/WhatsAppButton'
import UserDashboard from './components/UserDashboard'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard'
import PropertiesManager from './components/admin/PropertiesManager'
import MyPropertiesManager from './components/MyPropertiesManager'
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
import BuilderManager from './components/admin/BuilderManager'
import LocalitiesManager from './components/admin/LocalitiesManager'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import TeamManager from './components/admin/TeamManager'
import NewsletterManager from './components/admin/NewsletterManager'
import FaqManager from './components/admin/FaqManager'
import PropertiesList from './components/PropertiesList'
import PropertyDetails from './components/PropertyDetails'
import ShortlistedProperties from './components/ShortlistedProperties'
import UserProfile from './components/UserProfile'
import UserSettings from './components/UserSettings'
import Notifications from './components/Notifications'
import AdminSettings from './components/admin/AdminSettings'
import ThemeSettings from './components/admin/ThemeSettings'
import ViewedProperties from './components/ViewedProperties'
import BuildersList from './components/BuildersList'
import LocalitiesList from './components/LocalitiesList'

function App() {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoginOpen(false);
    if (userData.role === 'admin' || userData.role === 'superadmin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
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

  // Protected Route for any logged-in user
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      toast.error("Please login to access this page");
      return <Navigate to="/" />;
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
    <div className="App" translate="no">
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

        <Route path="/properties" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <PropertiesList />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/properties/:id" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <PropertyDetails onLoginRequired={() => setIsLoginOpen(true)} />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/builders/:city" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <BuildersList />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/localities/:city" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <LocalitiesList />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/about" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <AboutUs />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/contact" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ContactUs />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        {/* User Specific Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '90vh', pt: '100px' }}>
              <UserDashboard />
            </Box>
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/my-properties" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <Box sx={{ p: 4, minHeight: '80vh', bgcolor: '#f5f7fa', pt: '100px' }}>
              <MyPropertiesManager />
            </Box>
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/shortlist" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ShortlistedProperties />
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/viewed-properties" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ViewedProperties />
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <Box sx={{ minHeight: '80vh', bgcolor: '#f5f7fa', pt: '100px' }}>
              <UserProfile />
            </Box>
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <Box sx={{ minHeight: '80vh', bgcolor: '#f5f7fa', pt: '100px' }}>
              <UserSettings />
            </Box>
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <Box sx={{ minHeight: '80vh', bgcolor: '#f5f7fa', pt: '100px' }}>
              <Notifications />
            </Box>
            <Footer />
          </ProtectedRoute>
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
          <Route path="search" element={<AdminRoute privilege="Search"><GenericManager title="Search Manager" apiEndpoint="search-configs" columns={[{ field: 'name', label: 'Config Name' }]} /></AdminRoute>} />
          <Route path="services" element={<AdminRoute privilege="Service"><ServiceManager /></AdminRoute>} />
          <Route path="funfacts" element={<AdminRoute privilege="FunFact"><FunFactManager /></AdminRoute>} />
          <Route path="brokers" element={<AdminRoute privilege="Broker"><BrokerManager /></AdminRoute>} />
          <Route path="builders" element={<AdminRoute privilege="Builders"><BuilderManager /></AdminRoute>} />
          <Route path="localities" element={<AdminRoute privilege="Localities"><LocalitiesManager /></AdminRoute>} />
          <Route path="team" element={<AdminRoute privilege="Team"><TeamManager /></AdminRoute>} />
          <Route path="insta" element={<AdminRoute privilege="Insta Video"><InstaReelManager /></AdminRoute>} />
          <Route path="news" element={<Navigate to="/admin/news-manager" />} />
          <Route path="news-manager" element={<AdminRoute privilege="News"><NewsManager /></AdminRoute>} />
          <Route path="testimonials" element={<AdminRoute privilege="Testimonials"><TestimonialManager /></AdminRoute>} />
          <Route path="brands" element={<AdminRoute privilege="Brand"><BrandManager /></AdminRoute>} />
          <Route path="newsletter" element={<AdminRoute privilege="Newsletter"><NewsletterManager /></AdminRoute>} />
          <Route path="faqs" element={<AdminRoute privilege="FAQ"><FaqManager /></AdminRoute>} />
          <Route path="users" element={<SuperAdminRoute><UserManager /></SuperAdminRoute>} />
          <Route path="theme-settings" element={<SuperAdminRoute><ThemeSettings /></SuperAdminRoute>} />
          <Route path="settings" element={<AdminRoute privilege="Settings"><AdminSettings /></AdminRoute>} />
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
