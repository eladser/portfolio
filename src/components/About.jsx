import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

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

  const stats = [
    { number: '🐛', label: 'Debug Dashboard', icon: 'fas fa-bug' },
    { number: '30+', label: 'Tools in .NET Tools', icon: 'fas fa-tools' },
    { number: '5+', label: 'Years Experience', icon: 'fas fa-calendar' },
    { number: '1000+', label: 'Global Users', icon: 'fas fa-users' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              ASP.NET Core specialist creating debugging tools and developer productivity solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Hello! I'm Elad, an ASP.NET Core specialist based in Israel with a passion for building 
                  <span className="text-red-400 font-semibold"> debugging tools</span> that solve real developer problems.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  My latest achievement is the <span className="text-red-400 font-semibold">ASP.NET Debug Dashboard</span>, 
                  inspired by Laravel Telescope. It provides real-time monitoring of HTTP requests, database queries, 
                  exceptions, and performance metrics - all with zero configuration setup.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I also created <span className="text-purple-400 font-semibold">.NET Tools</span>, a comprehensive 
                  toolkit with 30+ professional utilities, and <span className="text-green-400 font-semibold">Another Chess</span>, 
                  a modern chess game with AI capabilities. Everything I build focuses on exceptional developer experience.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'fas fa-bug', title: 'Debug Excellence', desc: 'Building tools that make debugging intuitive and efficient' },
                  { icon: 'fas fa-code', title: 'ASP.NET Focus', desc: 'Deep expertise in .NET Core and web technologies' },
                  { icon: 'fas fa-rocket', title: 'Performance', desc: 'Zero-config solutions that work in production' },
                  { icon: 'fas fa-heart', title: 'Developer UX', desc: 'Creating delightful experiences for fellow developers' },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${value.icon} text-blue-400 text-xl`}></i>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Featured Projects */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Featured Achievement - Debug Dashboard */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/20">
                <div className="absolute top-4 right-4">
                  <span className="text-2xl">🐛</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Latest Project
                </h3>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-red-400">ASP.NET Debug Dashboard</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Laravel Telescope for .NET Core - Monitor HTTP requests, database queries, 
                    exceptions, and performance in real-time. Zero configuration, production-ready.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded">Real-time</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">Zero Config</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded">Production Ready</span>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://github.com/eladser/AspNetDebugDashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold"
                  >
                    View on GitHub <i className="fas fa-external-link-alt ml-2"></i>
                  </motion.a>
                </div>
              </div>

              {/* Secondary Project - .NET Tools */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">.NET Tools</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  30+ professional development utilities serving thousands of developers worldwide.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="https://eladser.github.io/.net-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
                >
                  Try it now <i className="fas fa-external-link-alt ml-1"></i>
                </motion.a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    {stat.icon ? (
                      <i className={`${stat.icon} text-3xl text-blue-400 mb-3`}></i>
                    ) : (
                      <div className="text-3xl mb-3">{stat.number}</div>
                    )}
                    {stat.icon && (
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.number}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Technology Focus Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Technology Focus</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'ASP.NET Core', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
                { name: 'C#', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
                { name: 'SignalR', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
                { name: 'Entity Framework', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
                { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
                { name: 'React', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
                { name: 'Performance Optimization', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
                { name: 'Real-time Applications', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
              ].map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;