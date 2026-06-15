import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QuoteCartProvider } from './context/QuoteCartContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QuoteCartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuoteCartProvider>
    </HelmetProvider>
  </React.StrictMode>
)
