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
    { number: '30+', label: 'Tools in .NET Tools', icon: 'fas fa-tools' },
    { number: '5+', label: 'Years Experience', icon: 'fas fa-calendar' },
    { number: '100%', label: 'Client Satisfaction', icon: 'fas fa-star' },
    { number: '∞', label: 'Lines of Code', icon: 'fas fa-code' },
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
              Passionate software engineer with a focus on creating tools that make developers' lives easier
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Hello! I'm Elad, a software engineer based in Israel with a passion for building 
                  <span className="text-blue-400 font-semibold"> developer tools</span> that solve real-world problems.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  My journey in software development has led me to create 
                  <span className="text-purple-400 font-semibold"> .NET Tools</span>, a comprehensive 
                  toolkit featuring 30+ professional utilities that help developers worldwide be more productive.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I believe in the power of <span className="text-green-400 font-semibold">open source</span> and 
                  building tools that are not just functional, but delightful to use. Every tool I create is 
                  designed with the developer experience in mind.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'fas fa-lightbulb', title: 'Innovation', desc: 'Always exploring new technologies and approaches' },
                  { icon: 'fas fa-users', title: 'Community', desc: 'Building tools that serve the developer community' },
                  { icon: 'fas fa-rocket', title: 'Performance', desc: 'Optimized solutions that work at scale' },
                  { icon: 'fas fa-heart', title: 'Passion', desc: 'Genuinely love what I do and it shows' },
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

            {/* Right Column - Stats */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Featured Achievement */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20">
                <div className="absolute top-4 right-4">
                  <i className="fas fa-trophy text-yellow-400 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Project
                </h3>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-blue-400">.NET Tools</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    A comprehensive toolkit with 30+ professional development utilities, 
                    from JSON converters to security tools, all running client-side with 
                    beautiful UI and mobile optimization.
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://eladser.github.io/.net-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Try it now <i className="fas fa-external-link-alt ml-2"></i>
                  </motion.a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <i className={`${stat.icon} text-3xl text-blue-400 mb-3`}></i>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;