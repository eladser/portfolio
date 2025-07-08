import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Database, Cloud, Smartphone, Settings, Globe, GitBranch, Bug } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [activeCategory, setActiveCategory] = useState('backend');

  const skillCategories = {
    backend: {
      title: 'Backend & ASP.NET Core',
      icon: Server,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      skills: [
        { name: 'ASP.NET Core', level: 95, description: 'Advanced middleware, real-time apps, performance tuning' },
        { name: 'C#', level: 95, description: 'LINQ, async/await, design patterns, latest features' },
        { name: 'SignalR', level: 90, description: 'Real-time communication, WebSockets, hub design' },
        { name: 'Entity Framework Core', level: 95, description: 'Advanced queries, migrations, performance optimization' },
        { name: 'Web APIs', level: 95, description: 'RESTful design, OpenAPI, versioning, security' },
        { name: '.NET 8', level: 90, description: 'Latest features, minimal APIs, performance improvements' },
        { name: 'Dependency Injection', level: 90, description: 'Service lifetimes, custom containers, patterns' },
        { name: 'Middleware Development', level: 85, description: 'Custom middleware, request pipeline, debugging tools' }
      ]
    },
    debugging: {
      title: 'Debugging & Monitoring',
      icon: Bug,
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      skills: [
        { name: 'ASP.NET Debug Dashboard', level: 95, description: 'Laravel Telescope for .NET, real-time monitoring' },
        { name: 'Performance Profiling', level: 90, description: 'Memory analysis, bottleneck identification, optimization' },
        { name: 'Exception Handling', level: 95, description: 'Global error handling, logging, monitoring' },
        { name: 'Request Monitoring', level: 90, description: 'HTTP pipeline analysis, timing, tracing' },
        { name: 'Database Query Analysis', level: 85, description: 'EF Core query optimization, performance tuning' },
        { name: 'Real-time Diagnostics', level: 88, description: 'Live monitoring, alerting, dashboard creation' },
        { name: 'Log Analysis', level: 85, description: 'Structured logging, correlation, analysis tools' },
        { name: 'Production Monitoring', level: 80, description: 'Health checks, metrics, alerting systems' }
      ]
    },
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      skills: [
        { name: 'JavaScript (ES6+)', level: 95, description: 'Modern JS, async/await, modules, advanced patterns' },
        { name: 'React', level: 90, description: 'Hooks, context, performance optimization, custom components' },
        { name: 'TypeScript', level: 85, description: 'Type-safe development, advanced types, interfaces' },
        { name: 'Tailwind CSS', level: 90, description: 'Responsive design, custom components, optimization' },
        { name: 'HTML5/CSS3', level: 95, description: 'Semantic markup, animations, grid/flexbox, accessibility' },
        { name: 'Progressive Web Apps', level: 80, description: 'Service workers, offline functionality, performance' },
        { name: 'Framer Motion', level: 75, description: 'Complex animations, gestures, interactions' },
        { name: 'Responsive Design', level: 90, description: 'Mobile-first, cross-browser compatibility' }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      skills: [
        { name: 'SQL Server', level: 90, description: 'Complex queries, optimization, indexing, stored procedures' },
        { name: 'Entity Framework Core', level: 95, description: 'Code-first, migrations, performance, advanced queries' },
        { name: 'PostgreSQL', level: 85, description: 'Advanced features, JSON support, performance tuning' },
        { name: 'SQLite', level: 90, description: 'Embedded databases, mobile apps, lightweight solutions' },
        { name: 'Redis', level: 75, description: 'Caching strategies, sessions, pub/sub patterns' },
        { name: 'Database Design', level: 90, description: 'Normalization, relationships, indexes, optimization' },
        { name: 'Query Optimization', level: 85, description: 'Performance tuning, execution plans, indexing' },
        { name: 'Data Modeling', level: 85, description: 'ERD design, schema optimization, migrations' }
      ]
    },
    tools: {
      title: 'Tools & DevOps',
      icon: Settings,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      skills: [
        { name: 'Visual Studio', level: 95, description: 'Advanced debugging, extensions, profiling tools' },
        { name: 'VS Code', level: 95, description: 'Extensions, debugging, customization, productivity' },
        { name: 'Git & GitHub', level: 95, description: 'Advanced workflows, branching strategies, collaboration' },
        { name: 'Docker', level: 80, description: 'Containerization, multi-stage builds, deployment' },
        { name: 'Azure DevOps', level: 75, description: 'CI/CD pipelines, boards, repositories, automation' },
        { name: 'Postman', level: 90, description: 'API testing, collections, automation, documentation' },
        { name: 'NuGet Packages', level: 85, description: 'Package creation, distribution, dependency management' },
        { name: 'Unit Testing', level: 85, description: 'xUnit, MSTest, TDD practices, mocking' }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
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
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Specialized in ASP.NET Core development and debugging tools, with comprehensive full-stack capabilities
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {Object.entries(skillCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === key
                      ? `${category.bgColor} text-white shadow-lg`
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {category.title}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Category Header */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                {React.createElement(skillCategories[activeCategory].icon, {
                  className: `w-8 h-8 ${skillCategories[activeCategory].color}`
                })}
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {skillCategories[activeCategory].title}
                </h3>
              </div>
            </motion.div>

            {/* Skills List */}
            <div className="grid md:grid-cols-2 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                      <span className={`text-sm font-bold ${skillCategories[activeCategory].color}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full ${skillCategories[activeCategory].bgColor}`}
                        />
                      </div>
                      
                      {/* Progress Indicator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + 0.5 }}
                        className={`absolute top-0 h-2 w-1 ${skillCategories[activeCategory].bgColor} rounded-full shadow-lg`}
                        style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                      />
                    </div>

                    {/* Skill Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Achievements */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-50 to-purple-50 dark:from-red-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800"
          >
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Achievements & Focus Areas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl">🐛</div>
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">Debug Dashboard</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Laravel Telescope for ASP.NET Core</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl">🔧</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">30+ Dev Tools</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comprehensive .NET toolkit</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl">⚡</div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Real-time Apps</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">SignalR & performance optimization</div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                My expertise centers on ASP.NET Core development with a special focus on debugging tools and 
                developer productivity. I combine deep technical knowledge with practical experience to create 
                solutions that solve real-world problems.
              </p>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          >
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Proficiency Overview
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ASP.NET Core Expertise</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">90%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Debugging & Monitoring</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Frontend Development</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">90%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Database Design</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Continuous Learning */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Continuous Learning & Innovation
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Bug className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced Debugging
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Constantly improving debugging techniques and building tools that help developers identify and solve issues faster
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Server className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  .NET Ecosystem
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Staying current with the latest .NET releases, patterns, and best practices for building scalable applications
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <GitBranch className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Open Source Impact
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Contributing to the developer community through open source projects and sharing knowledge with fellow developers
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;