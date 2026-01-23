import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye, MapPin, Clock, TrendingUp } from 'lucide-react';

/**
 * AnalyticsDashboard - Portfolio visit statistics
 *
 * Features:
 * - Tracks visits using localStorage
 * - Shows demo analytics data
 * - Displays geographic distribution
 * - Session duration and popular sections
 * - Privacy-first (no external tracking)
 *
 * Usage:
 * <AnalyticsDashboard isDark={true} />
 */

// Demo data for visualization
const demoAnalytics = {
  totalVisits: 342,
  uniqueVisitors: 187,
  avgSessionTime: '2m 34s',
  topLocations: [
    { country: 'United States', visits: 98, flag: '🇺🇸' },
    { country: 'Israel', visits: 76, flag: '🇮🇱' },
    { country: 'Germany', visits: 45, flag: '🇩🇪' },
    { country: 'United Kingdom', visits: 38, flag: '🇬🇧' },
    { country: 'Canada', visits: 31, flag: '🇨🇦' },
  ],
  topPages: [
    { name: 'Home', views: 342, percentage: 100 },
    { name: 'Projects', views: 234, percentage: 68 },
    { name: 'About', views: 156, percentage: 46 },
  ],
  visitsByDay: [
    { day: 'Mon', visits: 42 },
    { day: 'Tue', visits: 58 },
    { day: 'Wed', visits: 51 },
    { day: 'Thu', visits: 47 },
    { day: 'Fri', visits: 63 },
    { day: 'Sat', visits: 39 },
    { day: 'Sun', visits: 42 },
  ],
};

const AnalyticsDashboard = ({ isDark = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(demoAnalytics);
  const [userVisit, setUserVisit] = useState(null);

  // Track user visit with localStorage
  useEffect(() => {
    const STORAGE_KEY = 'portfolio_analytics';

    try {
      // Get existing data
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : { visits: [], firstVisit: new Date().toISOString() };

      // Add current visit
      const currentVisit = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      };

      data.visits.push(currentVisit);

      // Keep only last 100 visits
      if (data.visits.length > 100) {
        data.visits = data.visits.slice(-100);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Set user-specific data
      setUserVisit({
        totalVisits: data.visits.length,
        firstVisit: new Date(data.firstVisit),
        lastVisit: new Date(currentVisit.timestamp),
      });
    } catch (e) {
      // localStorage might be disabled
      console.warn('Analytics tracking disabled:', e);
    }
  }, []);

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
      role="region"
      aria-label="Analytics dashboard"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
          isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
        }`}
        aria-expanded={isExpanded}
        aria-controls="analytics-content"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className={isDark ? 'text-zinc-400' : 'text-zinc-600'} size={20} aria-hidden="true" />
          <div className="text-left">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Portfolio Analytics
            </h3>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Visitor stats and engagement
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-zinc-500" size={20} aria-hidden="true" />
        ) : (
          <ChevronDown className="text-zinc-500" size={20} aria-hidden="true" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="analytics-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 py-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              {/* Your Personal Stats */}
              {userVisit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg border-l-2 ${
                    isDark
                      ? 'bg-purple-500/5 border-purple-500/50 border border-purple-500/20'
                      : 'bg-purple-50 border-purple-500/50 border border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={16} className="text-purple-400" aria-hidden="true" />
                    <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      Your Visit Stats
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>Total visits</div>
                      <div className={`font-semibold mt-0.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {userVisit.totalVisits}
                      </div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>First visit</div>
                      <div className={`font-semibold mt-0.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {getRelativeTime(userVisit.firstVisit)}
                      </div>
                    </div>
                    <div>
                      <div className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>Last visit</div>
                      <div className={`font-semibold mt-0.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {getRelativeTime(userVisit.lastVisit)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Overview Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <Eye size={14} aria-hidden="true" />
                    <span className="text-xs">Visits</span>
                  </div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {analytics.totalVisits}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <MapPin size={14} aria-hidden="true" />
                    <span className="text-xs">Unique</span>
                  </div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {analytics.uniqueVisitors}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <Clock size={14} aria-hidden="true" />
                    <span className="text-xs">Avg Time</span>
                  </div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {analytics.avgSessionTime}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    <TrendingUp size={14} aria-hidden="true" />
                    <span className="text-xs">Growth</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">+23%</div>
                </motion.div>
              </div>

              {/* Weekly Chart */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Visits This Week
                </h4>
                <div className="flex items-end justify-between gap-2 h-32">
                  {analytics.visitsByDay.map((day, index) => {
                    const maxVisits = Math.max(...analytics.visitsByDay.map((d) => d.visits));
                    const height = (day.visits / maxVisits) * 100;
                    return (
                      <motion.div
                        key={day.day}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className={`w-full rounded-t ${
                            isDark ? 'bg-purple-500/30' : 'bg-purple-500/50'
                          } relative group cursor-pointer`}
                        >
                          <div
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                              isDark ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-lg'
                            }`}
                          >
                            {day.visits}
                          </div>
                        </div>
                        <span className={`text-xs mt-2 ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
                          {day.day}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Top Locations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Top Locations
                </h4>
                <div className="space-y-2">
                  {analytics.topLocations.map((location, index) => (
                    <motion.div
                      key={location.country}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl" aria-hidden="true">
                        {location.flag}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            {location.country}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                            {location.visits}
                          </span>
                        </div>
                        <div
                          className={`h-1.5 rounded-full ${
                            isDark ? 'bg-white/5' : 'bg-black/5'
                          } overflow-hidden`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(location.visits / analytics.totalVisits) * 100}%` }}
                            transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                            className={`h-full ${isDark ? 'bg-emerald-500/50' : 'bg-emerald-500'}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Top Pages */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Popular Sections
                </h4>
                <div className="space-y-2">
                  {analytics.topPages.map((page, index) => (
                    <motion.div
                      key={page.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.85 + index * 0.05 }}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                      }`}
                    >
                      <span className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {page.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          {page.views} views
                        </span>
                        <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {page.percentage}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Privacy Note */}
              <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  Privacy-first analytics. All data is anonymized and stored locally. No external tracking services.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function
const getRelativeTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
  return date.toLocaleDateString();
};

export default AnalyticsDashboard;
