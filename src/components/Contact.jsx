import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Github, Linkedin, Calendar, MessageCircle, Coffee } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'elad.ser@gmail.com',
      href: 'mailto:elad.ser@gmail.com',
      color: 'text-red-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Israel',
      href: null,
      color: 'text-blue-500'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/eladser',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
      description: 'Check out my code'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/elad-sertshuk',
      icon: Linkedin,
      color: 'hover:text-blue-600',
      description: 'Connect professionally'
    },
    {
      name: 'Schedule Meeting',
      href: 'https://calendly.com/eladser',
      icon: Calendar,
      color: 'hover:text-purple-600',
      description: 'Book a meeting'
    }
  ];

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
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
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
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have a project in mind or just want to chat about technology? I'm always open to discussing new opportunities and interesting challenges.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send me a message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I'll get back to you within 24 hours. Let's discuss how we can bring your ideas to life.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-vertical"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-green-800 dark:text-green-300"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Get in touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prefer direct contact? Here are the best ways to reach me.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const IconComponent = item.icon;
                  const ContactElement = item.href ? 'a' : 'div';
                  
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group"
                    >
                      <ContactElement
                        href={item.href}
                        className="flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className={`p-3 rounded-lg ${item.color} bg-opacity-10 mr-4`}>
                          <IconComponent className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
                        </div>
                      </ContactElement>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Connect with me
                </h4>
                
                <div className="grid gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        whileHover={{ scale: 1.02, x: 10 }}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md group"
                      >
                        <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 mr-4 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
                          <IconComponent className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${link.color} transition-colors`} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{link.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Coffee className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Let's grab a coffee (virtual or real)!
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      I'm always excited to discuss new projects, share ideas, or just talk about the latest in tech.
                    </p>
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      <MessageCircle className="w-4 h-4" />
                      <span>Available for collaborations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;