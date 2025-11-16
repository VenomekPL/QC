import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import styles in correct order
import './styles/variables.css'
import './styles/reset.css'
import './styles/global.css'
import './styles/components.css'
import './styles/pages.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
