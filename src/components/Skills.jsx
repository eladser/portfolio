import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Database, Cloud, Smartphone, Settings, Globe, GitBranch } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      skills: [
        { name: 'React', level: 95, description: 'Advanced hooks, context, performance optimization' },
        { name: 'TypeScript', level: 90, description: 'Type-safe development, advanced types' },
        { name: 'JavaScript (ES6+)', level: 95, description: 'Modern JS, async/await, modules' },
        { name: 'Tailwind CSS', level: 90, description: 'Responsive design, custom components' },
        { name: 'Next.js', level: 85, description: 'SSR, SSG, API routes, performance' },
        { name: 'HTML5/CSS3', level: 95, description: 'Semantic markup, animations, grid/flexbox' },
        { name: 'Framer Motion', level: 80, description: 'Complex animations, gestures' },
        { name: 'React Native', level: 75, description: 'Cross-platform mobile development' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      skills: [
        { name: '.NET Core/5+', level: 95, description: 'Web APIs, microservices, performance' },
        { name: 'C#', level: 95, description: 'LINQ, async/await, design patterns' },
        { name: 'Node.js', level: 85, description: 'Express, middleware, REST APIs' },
        { name: 'ASP.NET Core', level: 90, description: 'MVC, Web API, authentication' },
        { name: 'SignalR', level: 80, description: 'Real-time communication, WebSockets' },
        { name: 'RESTful APIs', level: 95, description: 'Design, documentation, versioning' },
        { name: 'GraphQL', level: 70, description: 'Schema design, resolvers, optimization' },
        { name: 'Python', level: 75, description: 'Django, Flask, data processing' }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      skills: [
        { name: 'SQL Server', level: 90, description: 'Complex queries, optimization, indexing' },
        { name: 'Entity Framework', level: 95, description: 'Code-first, migrations, performance' },
        { name: 'PostgreSQL', level: 85, description: 'Advanced features, JSON support' },
        { name: 'SQLite', level: 90, description: 'Embedded databases, mobile apps' },
        { name: 'Redis', level: 75, description: 'Caching, sessions, pub/sub' },
        { name: 'MongoDB', level: 70, description: 'Document design, aggregation' },
        { name: 'Database Design', level: 90, description: 'Normalization, relationships, indexes' },
        { name: 'Data Modeling', level: 85, description: 'ERD, schema design, optimization' }
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      skills: [
        { name: 'Microsoft Azure', level: 80, description: 'App Services, Functions, Storage' },
        { name: 'Docker', level: 85, description: 'Containerization, multi-stage builds' },
        { name: 'GitHub Actions', level: 90, description: 'CI/CD pipelines, automation' },
        { name: 'Azure DevOps', level: 75, description: 'Pipelines, boards, repositories' },
        { name: 'Linux/Ubuntu', level: 80, description: 'Server administration, bash scripting' },
        { name: 'Nginx', level: 75, description: 'Reverse proxy, load balancing' },
        { name: 'Git', level: 95, description: 'Advanced workflows, branching strategies' },
        { name: 'GitHub Pages', level: 90, description: 'Static site deployment, workflows' }
      ]
    },
    tools: {
      title: 'Tools & Methodologies',
      icon: Settings,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500',
      skills: [
        { name: 'Visual Studio', level: 95, description: 'Advanced debugging, extensions' },
        { name: 'VS Code', level: 95, description: 'Extensions, debugging, customization' },
        { name: 'Postman', level: 90, description: 'API testing, collections, automation' },
        { name: 'Agile/Scrum', level: 85, description: 'Sprint planning, retrospectives' },
        { name: 'Unit Testing', level: 85, description: 'xUnit, Jest, TDD practices' },
        { name: 'Code Review', level: 90, description: 'Best practices, mentoring' },
        { name: 'Performance Optimization', level: 85, description: 'Profiling, caching, bundling' },
        { name: 'Security Best Practices', level: 80, description: 'OWASP, authentication, encryption' }
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
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across the full development stack
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

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          >
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Proficiency Summary
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Programming Languages</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Frameworks & Libraries</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Database Technologies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">20+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Development Tools</div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                I'm constantly learning and adapting to new technologies. My approach combines 
                proven industry standards with cutting-edge innovations to deliver robust, 
                scalable solutions that meet both current needs and future growth.
              </p>
            </div>
          </motion.div>

          {/* Continuous Learning */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Continuous Learning & Growth
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Industry Trends
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Staying updated with the latest web development trends, best practices, and emerging technologies
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <GitBranch className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Open Source
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Contributing to and learning from open source projects to give back to the developer community
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Skill Enhancement
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Regularly taking courses, attending conferences, and working on personal projects to expand my skillset
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