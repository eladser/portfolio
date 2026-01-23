import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Github, GitCommit, GitFork, Star, AlertCircle } from 'lucide-react';

/**
 * GitHubActivity - Display recent GitHub activity
 *
 * Features:
 * - Fetches real GitHub data via API (optional)
 * - Falls back to demo data if API fails
 * - Shows commits, repos, stars
 * - Collapsible to save space
 * - Professional loading and error states
 *
 * Usage:
 * <GitHubActivity isDark={true} username="eladser" />
 */

// Demo data structure (used as fallback or when no API call is made)
const demoActivity = {
  contributions: 847,
  repos: [
    {
      name: 'debug-dashboard',
      description: 'Real-time HTTP traffic monitoring middleware for .NET',
      language: 'C#',
      stars: 23,
      forks: 4,
      updated: '2 days ago',
    },
    {
      name: 'dotnet-tools',
      description: 'Collection of utility functions for .NET projects',
      language: 'C#',
      stars: 12,
      forks: 2,
      updated: '1 week ago',
    },
    {
      name: 'portfolio',
      description: 'Personal portfolio built with React',
      language: 'JavaScript',
      stars: 5,
      forks: 0,
      updated: '3 hours ago',
    },
  ],
  recentCommits: [
    { message: 'Add SignalR connection retry logic', repo: 'debug-dashboard', time: '2h ago' },
    { message: 'Update README with usage examples', repo: 'dotnet-tools', time: '1d ago' },
    { message: 'Improve timeline component accessibility', repo: 'portfolio', time: '3h ago' },
  ],
};

// Language colors matching GitHub
const languageColors = {
  'C#': '#178600',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'Go': '#00ADD8',
};

const GitHubActivity = ({ isDark = true, username = 'eladser', useRealData = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState(demoActivity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch real GitHub data (optional)
  useEffect(() => {
    if (!isExpanded || !useRealData) return;

    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        // Fetch repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
        );
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();

        // Transform to our format
        const repos = reposData.map((repo) => ({
          name: repo.name,
          description: repo.description || 'No description',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: getRelativeTime(new Date(repo.updated_at)),
        }));

        setData({
          contributions: userData.public_repos + userData.public_gists,
          repos: repos.slice(0, 3),
          recentCommits: demoActivity.recentCommits, // GitHub API v3 doesn't expose all commits easily
        });
      } catch (err) {
        setError(err.message);
        setData(demoActivity); // Fallback to demo data
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [isExpanded, username, useRealData]);

  // Helper to get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return `${Math.floor(diff / 604800)}w ago`;
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
      }`}
      role="region"
      aria-label="GitHub activity"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
          isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
        }`}
        aria-expanded={isExpanded}
        aria-controls="github-content"
      >
        <div className="flex items-center gap-3">
          <Github className={isDark ? 'text-zinc-400' : 'text-zinc-600'} size={20} aria-hidden="true" />
          <div className="text-left">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              GitHub Activity
            </h3>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Recent contributions and repos
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
            id="github-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 py-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <span className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      Fetching activity...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-100 border border-amber-300'
                  }`}
                  role="alert"
                >
                  <AlertCircle className="text-amber-500 flex-shrink-0" size={18} aria-hidden="true" />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                      Couldn't load GitHub data. Showing demo data instead.
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-amber-500/70' : 'text-amber-600'}`}>
                      {error}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`p-4 rounded-lg border ${
                        isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                      }`}
                    >
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {data.contributions}
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        Contributions
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
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {data.repos.length}
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        Public Repos
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
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {data.repos.reduce((sum, repo) => sum + repo.stars, 0)}
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        Total Stars
                      </div>
                    </motion.div>
                  </div>

                  {/* Recent Repos */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Recent Repositories
                    </h4>
                    <div className="space-y-3">
                      {data.repos.map((repo, index) => (
                        <motion.div
                          key={repo.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + index * 0.05 }}
                          className={`p-4 rounded-lg border ${
                            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <a
                              href={`https://github.com/${username}/${repo.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium text-sm hover:underline ${
                                isDark ? 'text-purple-400' : 'text-purple-600'
                              }`}
                            >
                              {repo.name}
                            </a>
                            <span className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
                              {repo.updated}
                            </span>
                          </div>
                          <p className={`text-xs mb-3 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                            {repo.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: languageColors[repo.language] || '#858585' }}
                                aria-hidden="true"
                              />
                              <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>
                                {repo.language}
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}
                            >
                              <Star size={12} aria-hidden="true" />
                              <span>{repo.stars}</span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}
                            >
                              <GitFork size={12} aria-hidden="true" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Commits */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Recent Commits
                    </h4>
                    <div className="space-y-2">
                      {data.recentCommits.map((commit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <GitCommit
                            className={isDark ? 'text-zinc-600' : 'text-zinc-400'}
                            size={14}
                            aria-hidden="true"
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                              {commit.message}
                            </p>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
                              {commit.repo} • {commit.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GitHubActivity;
