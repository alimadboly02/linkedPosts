import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import AuthContext from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContext>
        <QueryClientProvider client={queryClient}>
          <ToastProvider />
          <App />
           <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthContext>
    </HeroUIProvider>
    
  </StrictMode>,
)
