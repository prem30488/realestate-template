import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CityProvider } from './context/CityContext'
import { HomeProvider } from './context/HomeContext'
import ThemeWrapper from './styleguide/ThemeWrapper'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CityProvider>
        <HomeProvider>
          <ThemeWrapper>
            <App />
          </ThemeWrapper>
        </HomeProvider>
      </CityProvider>
    </BrowserRouter>
  </StrictMode>,
)
