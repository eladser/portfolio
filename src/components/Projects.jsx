import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star, Users, Activity, Calendar, Code, Globe, Wrench } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
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
        'Text Processing Tools'
      ]
    },
    {
      id: 2,
      title: 'WEM Dashboard',
      description: 'Enterprise Web Energy Management dashboard built with .NET 8 and React. Features real-time monitoring, WebSocket communication, role-based access control, and comprehensive energy analytics for industrial applications.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
      technologies: ['.NET 8', 'React', 'TypeScript', 'SignalR', 'Tailwind CSS', 'Entity Framework', 'SQLite'],
      category: 'fullstack',
      featured: true,
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
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations, dark mode toggle, mobile optimization, and performance-focused design with excellent Lighthouse scores.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&q=80',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'GitHub Pages'],
      category: 'web',
      featured: false,
      links: {
        live: 'https://eladser.github.io/portfolio',
        github: 'https://github.com/eladser/portfolio',
      },
      stats: {
        performance: '98/100',
        responsive: 'Mobile First',
        status: 'Live',
        animations: 'Smooth'
      },
      highlights: [
        'Modern React Architecture',
        'Framer Motion Animations',
        'Dark/Light Theme Toggle',
        'Mobile-First Design',
        'Performance Optimized'
      ]
    },
    {
      id: 4,
      title: 'Bylith Assignment',
      description: 'Private development project showcasing advanced problem-solving skills and clean code architecture. Implemented with modern development practices and comprehensive testing strategies.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop&q=80',
      technologies: ['Private Repository', 'Modern Stack', 'Clean Architecture'],
      category: 'private',
      featured: false,
      links: {
        private: true,
      },
      stats: {
        type: 'Assignment',
        architecture: 'Clean Code',
        status: 'Completed',
        testing: 'Comprehensive'
      },
      highlights: [
        'Clean Architecture Implementation',
        'Advanced Problem Solving',
        'Modern Development Practices',
        'Comprehensive Testing',
        'Professional Code Quality'
      ]
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'tools', label: 'Developer Tools', icon: Wrench },
    { id: 'fullstack', label: 'Full Stack', icon: Code },
    { id: 'web', label: 'Web Apps', icon: Activity },
    { id: 'private', label: 'Private Work', icon: Users },
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
              A showcase of my recent work including developer tools, full-stack applications, and enterprise solutions
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
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-semibold rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}

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