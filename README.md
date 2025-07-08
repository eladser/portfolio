# Elad Ser - Portfolio Website

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Portfolio-blue?style=for-the-badge)](https://eladser.github.io/portfolio)
[![GitHub Stars](https://img.shields.io/github/stars/eladser/portfolio?style=for-the-badge&logo=github)](https://github.com/eladser/portfolio/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-success?style=for-the-badge&logo=github)](https://eladser.github.io/portfolio)

**A modern, responsive portfolio website showcasing my work as a Full Stack Developer specializing in ASP.NET Core and developer tools.**

---

## 🌟 **Live Portfolio**

**🔗 [Visit Portfolio →](https://eladser.github.io/portfolio)**

Explore my projects, skills, and professional experience in an interactive, beautifully designed interface.

---

## ✨ **Features**

### 🎨 **Modern Design**
- **Responsive Layout** - Perfect on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes with preference saving
- **Smooth Animations** - Framer Motion powered interactions and transitions
- **Interactive Particles** - Dynamic background with mouse interaction
- **Gradient Aesthetics** - Beautiful color schemes and visual hierarchy

### 🚀 **Performance**
- **95+ Lighthouse Score** - Optimized for speed and accessibility
- **Fast Loading** - Efficient bundling and lazy loading
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Progressive Enhancement** - Works without JavaScript

### 📱 **User Experience**
- **Smooth Scrolling** - Elegant navigation between sections
- **Loading Screen** - Branded loading experience
- **Scroll to Top** - Easy navigation for long pages
- **Form Validation** - Real-time contact form feedback
- **Accessibility** - WCAG compliant design

### 💼 **Content Sections**
- **Hero Section** - Dynamic typing animation and social links
- **About Me** - Professional story and expertise areas
- **Projects** - Detailed project showcases with live demos
- **Skills** - Interactive skill categories with proficiency levels
- **Experience** - Professional timeline with achievements
- **Contact** - Working contact form and social connections

---

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development (in progress)
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and gestures
- **Lucide React** - Beautiful, customizable icons

### **Build Tools**
- **Vite** - Fast development server and bundler
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

### **Deployment**
- **GitHub Pages** - Automated deployment via GitHub Actions
- **GitHub Actions** - CI/CD pipeline for building and deployment
- **Custom Domain Ready** - Easy to configure custom domains

---

## 🚀 **Featured Projects**

### 🔥 **1. ASP.NET Debug Dashboard** - *Laravel Telescope for .NET*
- **Developer Debugging Tool** inspired by Laravel Telescope
- **Real-time Monitoring** of HTTP requests, database queries, and exceptions
- **Performance Profiling** with detailed timing and memory metrics
- **Production Ready** with configurable data retention and filtering
- **GitHub**: [ASP.NET Debug Dashboard](https://github.com/eladser/AspNetDebugDashboard)

### 🔧 **2. .NET Tools** - *Professional Developer Toolkit*
- **30+ Professional Tools** for .NET development
- **100% Client-Side** processing for privacy and security
- **Global Usage** by thousands of developers worldwide
- **95+ Lighthouse Score** for optimal performance
- **Live Demo**: [.NET Tools](https://eladser.github.io/.net-tools)
- **GitHub**: [.NET Tools Repository](https://github.com/eladser/.net-tools)

### ♟️ **3. Another Chess** - *Modern Chess Game*
- **Interactive Chess Game** with smooth drag-and-drop gameplay
- **AI Opponent** with multiple difficulty levels
- **Multiplayer Support** for playing with friends online
- **Responsive Design** optimized for desktop and mobile
- **Modern UI** with beautiful animations and effects
- **GitHub**: [Another Chess](https://github.com/eladser/another_chess)

### 🎮 **4. WoW Tools** - *World of Warcraft Utilities*
- **Log Analysis Tools** for raid and dungeon performance
- **M+ Calculator** for Mythic+ dungeon scoring
- **Character Utilities** for gear optimization and planning
- **GitHub**: [WoW Tools](https://github.com/eladser/wow-tools)

### 🌐 **5. Portfolio Website** - *This Site*
- **Modern React Architecture** with performance focus
- **Framer Motion Animations** for engaging user experience
- **Dark/Light Mode** with preference persistence
- **Mobile-First Design** responsive across all devices
- **GitHub**: [Portfolio Repository](https://github.com/eladser/portfolio)

---

## 🏁 **Getting Started**

### **Prerequisites**
- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Git for version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/eladser/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Deploy to GitHub Pages (manual)
```

---

## 📁 **Project Structure**

```
portfolio/
├── 📄 index.html                 # Main HTML template
├── 📄 package.json              # Dependencies and scripts
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📁 src/
│   ├── 📄 App.jsx               # Main application component
│   ├── 📄 main.jsx              # Application entry point
│   ├── 📄 index.css             # Global styles and Tailwind imports
│   └── 📁 components/
│       ├── 📄 Hero.jsx          # Hero section with typing animation
│       ├── 📄 About.jsx         # About section with personal story
│       ├── 📄 Projects.jsx      # Projects showcase with filtering
│       ├── 📄 Skills.jsx        # Interactive skills display
│       ├── 📄 Experience.jsx    # Professional timeline
│       ├── 📄 Contact.jsx       # Contact form and information
│       ├── 📄 Navigation.jsx    # Responsive navigation bar
│       ├── 📄 ParticleBackground.jsx # Interactive particle system
│       ├── 📄 LoadingScreen.jsx # Branded loading animation
│       └── 📄 ScrollToTop.jsx   # Scroll to top functionality
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 deploy.yml        # GitHub Actions deployment
└── 📄 README.md                 # This documentation
```

---

## 🎨 **Customization**

### **Theme Configuration**
The portfolio uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit `tailwind.config.js` for custom color schemes
- **Fonts**: Update font families in the config
- **Spacing**: Modify spacing scales and breakpoints
- **Animations**: Customize Framer Motion animations in components

### **Content Updates**
Update your personal information in:

- **Hero Section**: `src/components/Hero.jsx`
- **About Section**: `src/components/About.jsx`
- **Projects**: `src/components/Projects.jsx`
- **Skills**: `src/components/Skills.jsx`
- **Experience**: `src/components/Experience.jsx`
- **Contact**: `src/components/Contact.jsx`

### **Adding New Projects**
1. Create project data object in `Projects.jsx`
2. Add project images to `public/images/`
3. Update project filtering categories if needed
4. Test responsive design on all devices

---

## 🚀 **Deployment**

### **Automatic Deployment** (Recommended)
The site automatically deploys to GitHub Pages when you push to the main branch.

1. **Enable GitHub Pages** in repository settings
2. **Set source** to "GitHub Actions"
3. **Push changes** to main branch
4. **Visit** your deployed site at `https://yourusername.github.io/portfolio`

### **Manual Deployment**
```bash
# Build and deploy
npm run build
npm run deploy
```

### **Custom Domain**
1. Add `CNAME` file to `public/` directory
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

---

## 🎯 **Performance Optimizations**

- **Code Splitting** - Automatic bundle splitting by Vite
- **Image Optimization** - Optimized images and lazy loading
- **CSS Purging** - Unused CSS removal in production
- **Gzip Compression** - Automatic compression by GitHub Pages
- **CDN Delivery** - Global content delivery via GitHub's CDN

---

## 💼 **Professional Focus Areas**

### **ASP.NET Core Expertise**
- Advanced debugging and profiling tools
- Real-time monitoring solutions
- Performance optimization techniques
- Production-ready application development

### **Developer Tools Creation**
- Building tools that solve real developer pain points
- Client-side processing for privacy and security
- Cross-platform compatibility and accessibility
- Open-source community contributions

### **Full-Stack Development**
- Modern React applications with TypeScript
- Responsive design and mobile-first approach
- Progressive Web App (PWA) development
- API design and integration

---

## 🧪 **Browser Support**

| Browser | Version |
|---------|---------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |
| Mobile Safari | iOS 13+ |
| Chrome Mobile | Latest |

---

## 🤝 **Contributing**

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### **Development Guidelines**
- Follow existing code style and conventions
- Test all changes across different devices and browsers
- Update documentation for new features
- Ensure accessibility compliance
- Optimize for performance

---

## 📝 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability accepted

---

## 📧 **Contact**

**Elad Ser** - Full Stack Developer & ASP.NET Core Specialist

- 🌐 **Portfolio**: [eladser.github.io/portfolio](https://eladser.github.io/portfolio)
- 💼 **LinkedIn**: [linkedin.com/in/elad-sertshuk](https://linkedin.com/in/elad-sertshuk)
- 📧 **Email**: elad.ser@gmail.com
- 🐙 **GitHub**: [github.com/eladser](https://github.com/eladser)
- 🔧 **Latest Project**: [ASP.NET Debug Dashboard](https://github.com/eladser/AspNetDebugDashboard)

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For powerful animation capabilities
- **Lucide** - For beautiful icons
- **GitHub** - For free hosting and excellent developer tools
- **ASP.NET Core Team** - For the incredible framework that powers my debugging tools
- **Laravel Team** - For Telescope inspiration for the Debug Dashboard
- **Open Source Community** - For inspiration and resources

---

## 📊 **Project Stats**

- 🎯 **Performance**: 95+ Lighthouse Score
- 📱 **Responsive**: Mobile-first design
- ♿ **Accessible**: WCAG compliance
- 🔒 **Secure**: No data collection or tracking
- 🚀 **Fast**: Optimized loading and interactions
- 🎨 **Modern**: Latest web technologies
- 🔧 **Developer Tools**: 30+ tools serving thousands of users
- 🐛 **Debug Dashboard**: Advanced ASP.NET Core monitoring

---

## 🎯 **Recent Updates**

### **July 2025**
- ✨ **NEW**: Added ASP.NET Debug Dashboard project
- 🎮 **NEW**: Added Another Chess game project  
- 🔧 **UPDATED**: Enhanced .NET Tools section
- 📱 **IMPROVED**: Mobile responsiveness and performance
- 🎨 **REFRESHED**: Updated color scheme and animations

### **Focus Areas for 2025**
- 🔍 Expanding ASP.NET Debug Dashboard with advanced profiling
- 📦 Publishing NuGet packages for developer tools
- 🎮 Adding multiplayer features to Chess game
- 🌐 Contributing more to open-source community

---

<div align="center">

## 🚀 **Ready to explore my work?**

### [**🔗 Visit Portfolio →**](https://eladser.github.io/portfolio)

---

**⭐ If you find this portfolio inspiring, please consider giving it a star!**

[⭐ Star on GitHub](https://github.com/eladser/portfolio) | [🐛 Report Bug](https://github.com/eladser/portfolio/issues) | [💡 Request Feature](https://github.com/eladser/portfolio/discussions) | [🤝 Contribute](CONTRIBUTING.md)

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**

*© 2025 Elad Ser - Full Stack Developer & ASP.NET Core Specialist*

</div>
