import { screenFromLocation } from './routes.js'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './styles.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (root.hasChildNodes() && document.body.dataset.screen === screenFromLocation()) hydrateRoot(root, app)
else createRoot(root).render(app)
