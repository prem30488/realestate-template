import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSlider from './components/HeroSlider'
import Search from './components/Search'
import Featured from './components/Featured'
import Latest from './components/Latest'
import WhyUs from './components/WhyUsFixed'
import OurServices from './components/OurServices'
import FunFact from './components/FunFact'
import OurBrokers from './components/OurBrokers'
import LatestNews from './components/LatestNews'
import NewsDetail from './components/NewsDetail'
import OurBrands from './components/OurBrands'

function App() {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <>
      <div className="App">
        {selectedNews ? (
          <>
            <Header />
            <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <HeroSlider />
            <Search />
            <Featured />
            <Latest />
            <WhyUs />
            <OurServices />
            <FunFact />
            <OurBrokers />
            <LatestNews onSelectNews={(news) => setSelectedNews(news)} />
            <OurBrands />
            <Footer />
          </>
        )}
      </div>
    </>
  )
}

export default App
