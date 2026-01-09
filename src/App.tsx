<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import BottleneckAudit from '@/components/survey/BottleneckAudit';
import NotFound from '@/pages/NotFound';

const App = () => (
  <Routes>
    <Route path="/" element={<BottleneckAudit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
// import { Sonner } from '@/components/ui/sonner'
// Import your actual page components here
// import { HomePage } from './pages/HomePage'
import { QuizPage } from './survey/BottlenekAudit.tsx'

const queryClient = new QueryClient()

const App = () => (
  <BrowserRouter basename="/precise-survey-builder">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* <Sonner /> */}
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/quiz" element={<div>QuizPage</div>} />
          {/* Add your actual routes here */}
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
>>>>>>> 7aa6324 (Removing Sommer)
);

export default App;
