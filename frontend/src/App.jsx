import React, { useState } from 'react'
import './App.css'
import { API_BASE_URL } from './constants';
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
import BuildersList from './components/BuildersList';
import LocalitiesList from './components/LocalitiesList';
import ProjectsList from './components/ProjectsList';
import BrokersList from './components/BrokersList';
import ShareRequirement from './components/ShareRequirement';
import DesignConsultation from './components/DesignConsultation';
import BuyVsRentCalculator from './components/BuyVsRentCalculator';
import RatesAndTrends from './components/RatesAndTrends';
import PropertyValuation from './components/PropertyValuation';
import TipsAndGuides from './components/TipsAndGuides';
import LocalityDetails from './components/LocalityDetails';
import GuideDetail from './components/GuideDetail';
import EMICalculator from './components/EMICalculator';
import ROICalculator from './components/ROICalculator';
import HomeLoanCalculator from './components/HomeLoanCalculator';
import DeveloperLounge from './components/DeveloperLounge';
import CompareLocalities from './components/CompareLocalities';
import HomeInteriors from './components/HomeInteriors';
import InteriorCostCalculator from './components/InteriorCostCalculator';
import KitchenWardrobeCalculator from './components/KitchenWardrobeCalculator';
import HelpCentre from './components/HelpCentre';
import SEO from './common/SEO';
import { COMPANY_INFO } from './constants/companyInfo';
import { ChatBox } from '@mui/x-chat';

const adapter = {
  async sendMessage({ message, signal }) {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal,
    });
    return res.body; // ReadableStream<ChatMessageChunk>
  },
};


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
      <SEO
        title={`Home | ${COMPANY_INFO.name}`}
        description={`${COMPANY_INFO.seoDescription}`}
        keywords={`${COMPANY_INFO.seoKeywords}`}
        image="/images/logo.png"
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

        <Route path="/locality/:name" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <LocalityDetails onLoginRequired={() => setIsLoginOpen(true)} />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/projects/:city" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ProjectsList />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/brokers" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <BrokersList />
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

        <Route path="/share-requirement" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ShareRequirement />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/buy-vs-rent" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <BuyVsRentCalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/rates-and-trends" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <RatesAndTrends />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/property-valuation" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <PropertyValuation />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/emi-calculator" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <EMICalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/roi-calculator" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <ROICalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/home-loan-calculator" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <HomeLoanCalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/developer-lounge" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <DeveloperLounge />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/compare-localities" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <CompareLocalities />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/home-interiors" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <HomeInteriors />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/interior-cost-calculator" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <InteriorCostCalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/kitchen-wardrobe-calculator" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <KitchenWardrobeCalculator />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/design-consultation" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <DesignConsultation />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/help-centre" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <HelpCentre />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/tips-and-guides" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <TipsAndGuides />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/guides/:category" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <GuideDetail />
            <Footer />
            <WhatsAppButton />
          </>
        } />

        <Route path="/guides/:category/:slug" element={
          <>
            <Header onLoginClick={() => setIsLoginOpen(true)} user={user} onLogout={handleLogout} />
            <GuideDetail />
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
