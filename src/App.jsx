import React from 'react';

const App = () => {
  return (
    <div className=\"min-h-screen bg-gray-900 text-white flex items-center justify-center\">
      <div className=\"text-center space-y-8\">
        <div className=\"w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg\">
          <span className=\"text-white font-bold text-2xl\">ES</span>
        </div>
        
        <div className=\"space-y-4\">
          <h1 className=\"text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent\">
            Elad Ser
          </h1>
          <p className=\"text-2xl text-gray-400\">
            Full Stack Developer
          </p>
          <p className=\"text-lg text-gray-500 max-w-2xl mx-auto\">
            Portfolio coming soon! Building modern web applications with React, .NET, and cutting-edge technologies.
          </p>
        </div>

        <div className=\"flex justify-center space-x-6\">
          <a 
            href=\"https://github.com/eladser\" 
            target=\"_blank\" 
            rel=\"noopener noreferrer\"
            className=\"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors\"
          >
            GitHub
          </a>
          <a 
            href=\"https://eladser.github.io/.net-tools\" 
            target=\"_blank\" 
            rel=\"noopener noreferrer\"
            className=\"px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors\"
          >
            .NET Tools
          </a>
        </div>

        <div className=\"text-sm text-gray-600\">
          <p>© 2025 Elad Ser. Built with React and Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
};

export default App;"