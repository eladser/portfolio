import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import PerformanceMonitor from './components/PerformanceMonitor';
import ErrorBoundary from './components/ErrorBoundary';

const Portfolio = lazy(() => import('./components/Portfolio'));
const NotFound = lazy(() => import('./components/NotFound'));

const PageLoader = () => (
  <div className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter basename="/">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {import.meta.env.DEV && <PerformanceMonitor />}
        </BrowserRouter>
      </LazyMotion>
    </ErrorBoundary>
  );
};

export default App;
