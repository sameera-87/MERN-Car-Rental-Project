import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { MotionConfig } from 'motion/react'
import StripeProvider from './stripe/StripeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <StripeProvider>
        <MotionConfig viewport={{once: true}}>
          <App />
        </MotionConfig>
      </StripeProvider>
    </AppProvider>
  </BrowserRouter>,
)
