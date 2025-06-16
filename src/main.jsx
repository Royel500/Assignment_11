import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthProvider.jsx'
import ThemeProvider from './Pages/Shear/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>

 </AuthProvider>
  </StrictMode>,
)
