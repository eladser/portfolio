# Portfolio Setup Guide

## Mock Data & Real Data Configuration

### 1. TechTimeline Component

**Current Status**: Uses hardcoded timeline data

**Location**: [src/components/TechTimeline.jsx](src/components/TechTimeline.jsx)

**Mock Data**: The component contains a hardcoded `timelineData` array with skills evolution from 2020-2026:

```javascript
const timelineData = [
  {
    year: 2020,
    skills: [
      { name: 'C#', category: 'backend' },
      { name: '.NET Framework', category: 'backend' },
      { name: 'SQL Server', category: 'database' }
    ]
  },
  // ... more years
];
```

**To Use Real Data**:
- Edit the `timelineData` array directly in [src/components/TechTimeline.jsx](src/components/TechTimeline.jsx)
- Update years and skills to match your actual experience
- Skills are categorized as: 'backend', 'frontend', 'devops', 'database', 'tools'

### 2. GitHubActivity Component

**Current Status**: Uses demo data (see [src/components/Portfolio.jsx:940](src/components/Portfolio.jsx#L940))

**Location**: [src/components/GitHubActivity.jsx](src/components/GitHubActivity.jsx)

**Mock Data**: When `useRealData={false}`, displays demo statistics:
- Contributions: 847
- Repos: 24
- Stars: 156
- Commits: 1243
- Featured repos with hardcoded stats

**To Use Real Data**:

1. Update [src/components/Portfolio.jsx:940](src/components/Portfolio.jsx#L940):
```jsx
// Change from:
<GitHubActivity isDark={isDark} username="eladser" useRealData={false} />

// To:
<GitHubActivity isDark={isDark} username="eladser" useRealData={true} />
```

2. The component will fetch from GitHub API:
   - User stats: `https://api.github.com/users/{username}`
   - Repos: `https://api.github.com/users/{username}/repos`
   - No API key needed for public data (60 requests/hour limit)

3. For authenticated requests (higher rate limit):
```jsx
<GitHubActivity
  isDark={isDark}
  username="eladser"
  useRealData={true}
  githubToken={import.meta.env.VITE_GITHUB_TOKEN}
/>
```

Add to `.env`:
```
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

### 3. AnalyticsDashboard Component

**Current Status**: Privacy-first localStorage tracking (no external service)

**Location**: [src/components/AnalyticsDashboard.jsx](src/components/AnalyticsDashboard.jsx)

**How It Works**:
- Stores visit data in browser's localStorage
- Tracks: timestamp, page, referrer
- Processes data client-side for display
- No cookies, no external tracking, 100% privacy-friendly

**No Setup Required**: This component works out of the box and doesn't need configuration.

**Data Persistence**:
- Data is stored per-browser
- Clearing localStorage or switching browsers resets data
- Users can view their own visits only

## Analytics Integration

### Plausible Analytics (Recommended)

**Current Status**: Script is in [index.html](index.html#L285) but commented out

**Why Plausible**:
- Privacy-friendly (GDPR compliant)
- No cookies
- Lightweight (< 1 KB)
- Open source

**Setup Steps**:

1. Sign up at [plausible.io](https://plausible.io)

2. Add your site: `eladser.github.io`

3. Uncomment the script in [index.html:285](index.html#L285):
```html
<!-- Change from: -->
<!-- <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script> -->

<!-- To: -->
<script defer data-domain="eladser.github.io" src="https://plausible.io/js/script.js"></script>
```

4. Verify installation in Plausible dashboard

### Google Analytics (Alternative)

If you prefer Google Analytics:

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)

2. Get your Measurement ID (format: `G-XXXXXXXXXX`)

3. Add to [index.html](index.html) in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Note**: Google Analytics uses cookies and requires cookie consent banners in some regions (GDPR, CCPA).

## Image Management

### WebP Image Generation

**Current Status**: WebP images generated at [public/profile-{160,320,1200}.webp](public/)

**Script**: [convert-images.js](convert-images.js)

**When to Regenerate**:
- When updating profile photo
- When changing image sizes
- When adjusting quality settings

**Regeneration Steps**:

1. Place new profile photo at `public/profile.jpg`

2. Run conversion script:
```bash
node convert-images.js
```

3. Generated files:
   - `profile-160.webp` - Small (avatar, ~2-3 KB)
   - `profile-320.webp` - Medium (mobile, ~6-7 KB)
   - `profile-1200.webp` - Large (desktop, ~50-60 KB)

**Customizing Sizes**:

Edit [convert-images.js:12-16](convert-images.js#L12-L16):
```javascript
const sizes = [
  { width: 160, suffix: '-160' },
  { width: 320, suffix: '-320' },
  { width: 1200, suffix: '-1200' }
];
```

**Adjusting Quality**:

Edit quality setting in [convert-images.js:37](convert-images.js#L37):
```javascript
.webp({ quality: 85 }) // Range: 1-100, higher = larger file
```

## Development

### Local Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Lighthouse Testing (Local)
```bash
npm run test:lighthouse
```

## Deployment

### GitHub Pages

Automatic deployment on push to `main`:
```bash
git push origin main
```

### Manual Deployment
```bash
npm run deploy
```

## Performance Monitoring

### Core Web Vitals (Development)

A performance monitor appears in development mode at the bottom-right corner showing:
- LCP (Largest Contentful Paint) - target: < 2.5s
- FID (First Input Delay) - target: < 100ms
- CLS (Cumulative Layout Shift) - target: < 0.1

**Location**: [src/components/PerformanceMonitor.jsx](src/components/PerformanceMonitor.jsx)

**Production Monitoring**: Use Plausible Analytics or Google Analytics for real user metrics.

### Lighthouse CI

Automated Lighthouse testing runs on:
- Every push to `main`
- Every pull request
- Weekly (Monday 9:00 AM UTC)

**Results**: Check GitHub Actions for reports

**Configuration**: [.lighthouserc.json](.lighthouserc.json)

## Troubleshooting

### Issue: GitHub API Rate Limit

**Symptom**: GitHubActivity shows errors after 60 requests/hour

**Solution**: Add GitHub token (see GitHubActivity section above)

### Issue: Analytics Not Tracking

**Symptom**: No visits showing in analytics dashboard

**Solutions**:
- **Plausible**: Check script is uncommented and domain matches
- **Google Analytics**: Verify Measurement ID is correct
- **Both**: Check browser ad blockers aren't blocking scripts

### Issue: Images Not Loading

**Symptom**: Profile images show broken

**Solutions**:
1. Verify `public/profile.jpg` exists
2. Regenerate WebP images: `node convert-images.js`
3. Check file permissions
4. Clear browser cache

### Issue: Build Errors

**Symptom**: `npm run build` fails

**Common Causes**:
- Missing dependencies: Run `npm install`
- Node version: Ensure Node 18+ is installed
- Sharp installation: Run `npm install --save-dev sharp`

## File Structure Reference

```
portfolio/
├── public/
│   ├── profile.jpg              # Source image
│   ├── profile-160.webp         # Generated
│   ├── profile-320.webp         # Generated
│   ├── profile-1200.webp        # Generated
│   ├── sw.js                    # Service worker
│   ├── sitemap.xml              # SEO
│   ├── robots.txt               # SEO
│   ├── humans.txt               # Credits
│   └── .well-known/
│       └── security.txt         # Security contact
├── src/
│   ├── components/
│   │   ├── Portfolio.jsx        # Main component
│   │   ├── TechTimeline.jsx     # Skills timeline (mock data)
│   │   ├── GitHubActivity.jsx   # GitHub stats (mock/real)
│   │   ├── AnalyticsDashboard.jsx # Privacy analytics
│   │   ├── PerformanceMonitor.jsx # Dev metrics
│   │   └── ErrorBoundary.jsx    # Error handling
│   └── main.jsx                 # Entry point
├── .github/
│   └── workflows/
│       └── lighthouse.yml       # Automated testing
├── convert-images.js            # WebP generator
├── index.html                   # Analytics scripts here
└── package.json                 # Scripts
```
