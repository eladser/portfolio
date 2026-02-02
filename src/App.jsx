import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import PerformanceMonitor from './components/PerformanceMonitor';
import ErrorBoundary from './components/ErrorBoundary';
import { SoundProvider } from './contexts/SoundContext';

const Portfolio = lazy(() => import('./components/Portfolio'));
const NotFound = lazy(() => import('./components/NotFound'));

const PageLoader = () => (
  <div className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center">
    <img
      src="/logo-loading.png"
      alt="Loading..."
      className="w-24 h-24 animate-pulse"
    />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <SoundProvider>
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
      </SoundProvider>
    </ErrorBoundary>
  );
};

export default App;
