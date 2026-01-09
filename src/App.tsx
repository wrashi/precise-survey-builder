import { Routes, Route } from 'react-router-dom';
import BottleneckAudit from '@/components/survey/BottleneckAudit';
import NotFound from '@/pages/NotFound';

const App = () => (
  <Routes>
    <Route path="/" element={<BottleneckAudit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
