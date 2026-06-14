import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import { Chatprovider } from './context/Chatcontext.jsx'
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <Toaster />
      <Chatprovider>
        <AppRoutes />
      </Chatprovider>
    </BrowserRouter>
  </ClerkProvider>
)
