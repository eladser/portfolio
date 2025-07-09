import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star, Users, Activity, Calendar, Code, Globe, Wrench, Bug, GamepadIcon, Database, FileText } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'ASP.NET Debug Dashboard',
      description: 'A lightweight, developer-friendly debugging dashboard for ASP.NET Core applications inspired by Laravel Telescope. Monitor HTTP requests, database queries, exceptions, and performance metrics in real-time with zero configuration setup.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
      technologies: ['ASP.NET Core', 'C#', 'SignalR', 'Entity Framework', 'JavaScript', 'HTML5', 'CSS3'],
      category: 'debugging',
      featured: true,
      new: true,
      links: {
        github: 'https://github.com/eladser/AspNetDebugDashboard',
        nuget: 'https://github.com/eladser/AspNetDebugDashboard#installation'
      },
      stats: {
        type: 'NuGet Package',
        monitoring: 'Real-time',
        status: 'Active Development',
        inspiration: 'Laravel Telescope'
      },
      highlights: [
        'HTTP Request Monitoring',
        'Database Query Profiling', 
        'Exception Tracking',
        'Performance Metrics',
        'Real-time Dashboard',
        'Zero Configuration',
        'Production Ready'
      ]
    },
    {
      id: 2,
      title: '.NET Tools',
      description: 'Comprehensive toolkit with 30+ professional development utilities including JSON converters, security tools, text processors, and data converters. A complete solution for .NET developers with beautiful UI and 100% client-side processing.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Progressive Web App', 'GitHub Pages'],
      category: 'tools',
      featured: true,
      links: {
        live: 'https://eladser.github.io/.net-tools',
        github: 'https://github.com/eladser/.net-tools',
      },
      stats: {
        tools: '30+ Tools',
        users: 'Global Usage',
        status: 'Active',
        score: '95+ Lighthouse'
      },
      highlights: [
        'JSON to C# Generator',
        'Security & Hash Tools', 
        'Code Generators',
        'Data Converters',
        'Text Processing Tools',
        'Client-side Processing',
        'Mobile Optimized'
      ]
    },
    {
      id: 3,
      title: 'SimpleConfigDiff',
      description: 'Fast, browser-based configuration file comparison tool with intelligent semantic analysis. Compare JSON, YAML, XML, INI, TOML, and other config formats with side-by-side, tree, and unified diff views. Features dark mode, real-time processing, and export capabilities.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop&q=80',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
      category: 'tools',
      featured: false,
      new: true,
      links: {
        live: 'https://eladser.github.io/SimpleConfigDiff/',
        github: 'https://github.com/eladser/SimpleConfigDiff',
      },
      stats: {
        formats: '12+ Formats',
        processing: 'Client-side',
        status: 'Production Ready',
        views: '3 Diff Views'
      },
      highlights: [
        'Multi-format Support',
        'Semantic Analysis',
        'Side-by-side Comparison',
        'Real-time Processing',
        'Dark Mode Support',
        'Export Options',
        'Zero Data Transfer'
      ]
    },
    {
      id: 4,
      title: 'Another Chess',
      description: 'A modern, sleek chess game website with AI opponent and multiplayer support. Features smooth drag-and-drop gameplay, multiple difficulty levels, beautiful animations, and responsive design for desktop and mobile devices.',
      image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=500&fit=crop&q=80',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API', 'Game Logic', 'AI Algorithms'],
      category: 'games',
      featured: false,
      new: true,
      links: {
        github: 'https://github.com/eladser/another_chess',
        demo: 'https://github.com/eladser/another_chess#demo'
      },
      stats: {
        gameplay: 'Interactive',
        ai: 'Smart Opponent',
        status: 'Active',
        platform: 'Cross-platform'
      },
      highlights: [
        'Smooth Drag & Drop',
        'AI Opponent',
        'Multiplayer Support',
        'Beautiful Animations',
        'Mobile Responsive',
        'Game Analysis',
        'Move History'
      ]
    },
    {
      id: 5,
      title: 'WoW Tools',
      description: 'A collection of useful tools for World of Warcraft players including log analysis, M+ tools, and raid utilities. Built to help players optimize their gameplay and track performance across different game modes.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop&q=80',
      technologies: ['JavaScript', 'React', 'Node.js', 'Game APIs', 'Data Analysis'],
      category: 'games',
      featured: false,
      links: {
        github: 'https://github.com/eladser/wow-tools',
      },
      stats: {
        tools: 'Multiple Tools',
        analysis: 'Log Analysis',
        status: 'Complete',
        community: 'Gaming'
      },
      highlights: [
        'Raid Log Analysis',
        'M+ Calculator',
        'Character Utilities',
        'Performance Tracking',
        'Guild Management'
      ]
    },
    {
      id: 6,
      title: 'WEM Dashboard',
      description: 'Enterprise Web Energy Management dashboard built with .NET 8 and React. Features real-time monitoring, WebSocket communication, role-based access control, and comprehensive energy analytics for industrial applications.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
      technologies: ['.NET 8', 'React', 'TypeScript', 'SignalR', 'Tailwind CSS', 'Entity Framework', 'SQLite'],
      category: 'fullstack',
      featured: false,
      links: {
        github: 'https://github.com/eladser/wem-test',
      },
      stats: {
        architecture: 'Full Stack',
        realtime: 'WebSocket',
        status: 'Production Ready',
        features: '20+ Features'
      },
      highlights: [
        'Real-time Energy Monitoring',
        'Asset Management System',
        'Alert & Notification System',
        'Role-based Access Control',
        'Interactive Analytics Dashboard'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'debugging', label: 'Debug Tools', icon: Bug },
    { id: 'tools', label: 'Developer Tools', icon: Wrench },
    { id: 'games', label: 'Games & Tools', icon: GamepadIcon },
    { id: 'fullstack', label: 'Full Stack', icon: Code },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A showcase of my latest work including ASP.NET debugging tools, configuration diff utilities, developer tools, games, and enterprise solutions
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    filter === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    project.featured ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {project.featured && (
                      <span className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-semibold rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                    {project.new && (
                      <span className="flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-sm font-semibold rounded-full">
                        ✨ New
                      </span>
                    )}
                  </div>

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Project Links Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      {project.links.live && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </motion.a>
                      )}
                      {project.links.demo && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors"
                        >
                          <GamepadIcon className="w-4 h-4 mr-2" />
                          Demo
                        </motion.a>
                      )}
                      {project.links.nuget && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.links.nuget}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
                        >
                          <Database className="w-4 h-4 mr-2" />
                          NuGet
                        </motion.a>
                      )}
                      {project.links.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </motion.a>
                      )}
                      {project.links.private && (
                        <div className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-full font-semibold">
                          <Users className="w-4 h-4 mr-2" />
                          Private
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-md font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-400">{value}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* GitHub CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Want to see more of my work and contributions?
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/eladser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg"
            >
              <Github className="w-5 h-5 mr-3" />
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;