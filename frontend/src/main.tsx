import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx'
import { FavoritesProvider } from './context/FavoritesContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
    <App />
    </FavoritesProvider>

    
   
  </StrictMode>,
)
