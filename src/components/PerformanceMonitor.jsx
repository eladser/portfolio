import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({ lcp: null, fid: null, cls: null });

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let clsEntries = [];

    const observers = [];

    // LCP Observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics((prev) => ({ ...prev, lcp: Math.round(lastEntry.renderTime || lastEntry.loadTime) }));
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP not supported');
    }

    // FID Observer
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-input') {
            const delay = entry.processingStart - entry.startTime;
            setMetrics((prev) => ({ ...prev, fid: Math.round(delay) }));
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      console.warn('FID not supported');
    }

    // CLS Observer
    try {
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
            setMetrics((prev) => ({ ...prev, cls: clsValue.toFixed(3) }));
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS not supported');
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const getStatus = (metric, value) => {
    if (value === null) return 'text-zinc-600';
    if (metric === 'lcp') {
      return value < 2500 ? 'text-emerald-400' : value < 4000 ? 'text-amber-400' : 'text-red-400';
    }
    if (metric === 'fid') {
      return value < 100 ? 'text-emerald-400' : value < 300 ? 'text-amber-400' : 'text-red-400';
    }
    if (metric === 'cls') {
      return value < 0.1 ? 'text-emerald-400' : value < 0.25 ? 'text-amber-400' : 'text-red-400';
    }
    return 'text-zinc-600';
  };

  return (
    <div className="fixed bottom-24 left-4 p-3 rounded-lg bg-black/90 border border-white/10 font-mono text-xs space-y-1 z-50 backdrop-blur-sm">
      <div className="text-zinc-500 mb-2 font-semibold">Core Web Vitals</div>
      <div className="flex gap-4">
        <div>
          <div className="text-zinc-600">LCP</div>
          <div className={getStatus('lcp', metrics.lcp)}>
            {metrics.lcp ? `${metrics.lcp}ms` : '—'}
          </div>
        </div>
        <div>
          <div className="text-zinc-600">FID</div>
          <div className={getStatus('fid', metrics.fid)}>
            {metrics.fid ? `${metrics.fid}ms` : '—'}
          </div>
        </div>
        <div>
          <div className="text-zinc-600">CLS</div>
          <div className={getStatus('cls', metrics.cls)}>
            {metrics.cls || '—'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
