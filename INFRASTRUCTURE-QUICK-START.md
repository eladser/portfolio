# Infrastructure Quick Start Guide

Quick reference for the technical infrastructure components added to your portfolio.

## 1. Lighthouse CI - Performance Monitoring

**Status**: ✅ Active (runs automatically on GitHub Actions)

**What it does**: Runs automated performance audits on every push and PR.

**Where to see results**: GitHub → Actions tab

**Manual test**:
```bash
npm run test:lighthouse
```

**Configuration**: `.lighthouserc.json`

---

## 2. Error Boundary - Error Handling

**Status**: ✅ Active (automatically catches React errors)

**What it does**: Shows user-friendly error UI instead of white screen when errors occur.

**Test it**:
```jsx
// Add to any component temporarily to test
throw new Error('Test error boundary');
```

**File**: `src/components/ErrorBoundary.jsx`

**Integrated in**: `src/App.jsx` (wraps entire app)

---

## 3. Plausible Analytics - Privacy-Friendly Tracking

**Status**: ⏳ Ready (needs activation)

**What it does**: Tracks visitors without cookies, GDPR compliant.

**Activate**:
1. Sign up at https://plausible.io
2. Add site: `eladser.github.io`
3. Uncomment in `index.html`:
   ```html
   <script defer data-domain="eladser.github.io" src="https://plausible.io/js/script.js"></script>
   ```
4. Deploy

**Cost**: $9/month for 10K pageviews (30-day free trial)

**Docs**: `docs/ANALYTICS-SETUP.md`

---

## 4. Open Graph Images - Social Media Previews

**Status**: ✅ Active (using profile.jpg)

**What it does**: Shows rich previews when portfolio is shared on social media.

**Improve it**:
1. Create 1200x630px image with Figma/Canva
2. Save as `public/og-image.jpg`
3. Update `index.html`:
   ```html
   <meta property="og:image" content="https://eladser.github.io/portfolio/og-image.jpg" />
   ```

**Test it**:
- Twitter: https://cards-dev.twitter.com/validator
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

**Docs**: `docs/OG-IMAGE-GENERATION.md`

---

## 5. RSS Feed - Blog Updates

**Status**: ✅ Ready (template created)

**What it does**: Allows users to subscribe to your updates via RSS readers.

**Add new posts**:
1. Open `public/rss.xml`
2. Copy the `<item>` template (see comments)
3. Fill in title, link, description, content
4. Update dates
5. Deploy

**Validate**:
```bash
npm run validate:rss
```

**File**: `public/rss.xml`

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run lint             # Lint code
npm run test:lighthouse  # Run Lighthouse audit locally
npm run check:all        # Run all checks

# Deployment
npm run deploy           # Build and deploy to GitHub Pages

# RSS
npm run validate:rss     # Validate RSS feed
```

---

## File Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── lighthouse.yml          # Lighthouse CI workflow
├── docs/
│   ├── ANALYTICS-SETUP.md          # Plausible setup guide
│   ├── OG-IMAGE-GENERATION.md      # Social media image guide
│   └── INFRASTRUCTURE.md           # Full documentation
├── public/
│   └── rss.xml                     # RSS feed
├── src/
│   ├── components/
│   │   └── ErrorBoundary.jsx       # Error handling
│   └── App.jsx                     # ErrorBoundary integrated here
├── .lighthouserc.json              # Lighthouse config
└── index.html                      # Analytics + RSS + OG meta tags
```

---

## Activation Checklist

- [x] Lighthouse CI - Active on GitHub Actions
- [x] Error Boundary - Integrated in App.jsx
- [ ] Plausible Analytics - Sign up and uncomment script
- [x] Open Graph Tags - Active (consider creating custom image)
- [x] RSS Feed - Template ready for blog posts

---

## Next Steps

### Immediate (5 minutes)
1. Create custom OG image (1200x630px) for better social media previews
2. Test Error Boundary by temporarily throwing an error
3. Verify Lighthouse CI ran successfully on GitHub Actions

### Soon (30 minutes)
1. Sign up for Plausible Analytics
2. Activate analytics tracking
3. Add first blog post to RSS feed

### Future Enhancements
1. Set up custom events in Plausible (track GitHub clicks, contact)
2. Generate dynamic OG images for blog posts
3. Add Sentry for production error tracking
4. Set up automated OG image generation in CI/CD

---

## Support & Documentation

- **Full Docs**: `docs/INFRASTRUCTURE.md`
- **Analytics**: `docs/ANALYTICS-SETUP.md`
- **OG Images**: `docs/OG-IMAGE-GENERATION.md`
- **Email**: elad.ser@gmail.com

---

## Troubleshooting

### Lighthouse CI not running?
- Check `.github/workflows/lighthouse.yml` exists
- Verify you pushed to `main` or `develop` branch
- Check GitHub Actions tab for errors

### Error Boundary not showing?
- Only shows in production builds or when errors occur
- Test with: `throw new Error('test')`
- Check browser console for errors

### Analytics not tracking?
- Make sure script is uncommented in `index.html`
- Verify `data-domain` matches Plausible site
- Check browser console for script loading
- Disable ad blockers for testing

### OG images not showing?
- Ensure image is accessible at public URL
- Test with validators (see links above)
- Wait a few hours for social media cache to refresh
- Try adding `?v=2` to image URL to bust cache

### RSS feed errors?
- Validate XML syntax with `npm run validate:rss`
- Check dates are in RFC 822 format
- Ensure all HTML content is wrapped in `<![CDATA[...]]>`

---

## Monitoring

Check these regularly:

1. **GitHub Actions** - Lighthouse CI results
2. **Plausible Dashboard** - Traffic analytics (after activation)
3. **Browser Console** - Error logs
4. **Social Media** - Share previews

---

## Pro Tips

1. **Lighthouse**: Run locally before pushing to catch issues early
2. **Error Boundary**: Add error tracking service (Sentry) for production monitoring
3. **Analytics**: Set up goals for conversions (GitHub clicks, contact)
4. **OG Images**: Update when you add major projects
5. **RSS Feed**: Keep it updated when you publish new content

---

Last Updated: 2026-01-24
Version: 1.0
