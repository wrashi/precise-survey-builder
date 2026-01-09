import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Sonner } from '@/components/ui/sonner';
import App from './App';
import './index.css';

<<<<<<< HEAD
const queryClient = new QueryClient();
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
// import { Sonner } from '@/components/ui/sonner'

const queryClient = new QueryClient()
>>>>>>> 7aa6324 (Removing Sommer)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/precise-survey-builder">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {/* <Sonner /> */}
          <App />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

