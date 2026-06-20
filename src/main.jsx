import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QuoteCartProvider } from './context/QuoteCartContext'
import App from './App'
import './index.css'

import { hydrateRoot, createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
const app = (
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

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
