import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaComments, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { ArrowRight, Code as CodeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const features = [
    {
      icon: <FaCode size={32} />,
      title: "Showcase Your Code",
      description: "Share your projects, snippets, and achievements with the developer community."
    },
    {
      icon: <FaUsers size={32} />,
      title: "Connect with Devs",
      description: "Build meaningful connections with developers worldwide."
    },
    {
      icon: <FaComments size={32} />,
      title: "Real-time Chat",
      description: "Collaborate and communicate with instant messaging."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <CodeIcon className="w-6 h-6" /> DevConnect
          </h1>
          <div className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              variant="default"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Connect with Developers</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Build your developer profile, share your code, and connect with the global developer community.
          </p>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
              >
                Start Building
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://github.com/yourusername/devconnect', '_blank')}
              >
                View Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className={`grid grid-cols-1 ${!isMobile ? 'md:grid-cols-3' : ''} gap-8 px-6 py-12 max-w-6xl mx-auto`}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="mb-4 text-blue-600">{feature.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Join */}
      <section className="bg-white py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h3 className="text-2xl font-semibold mb-2">Ready to Join the Community?</h3>
          <p className="text-gray-600 mb-6">
            Start building your developer profile today and connect with thousands of developers worldwide.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Join Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center`}>
            <div className={`flex items-center space-x-2 ${isMobile ? 'mb-4' : ''}`}>
              <FaCode className="text-blue-500" />
              <span className="text-lg font-semibold">DevConnect</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 DevConnect. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;