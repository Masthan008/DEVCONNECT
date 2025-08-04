import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaComments, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { ArrowRight, Code as CodeIcon, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCode size={28} className="text-accent-blue" />,
      title: "Showcase Your Code",
      description: "Share your projects, snippets, and achievements with a global community of developers."
    },
    {
      icon: <FaUsers size={28} className="text-accent-purple" />,
      title: "Connect with Devs",
      description: "Build meaningful connections, collaborate on projects, and grow your professional network."
    },
    {
      icon: <FaComments size={28} className="text-accent-pink" />,
      title: "Real-time Collaboration",
      description: "Engage in discussions, get feedback, and work together with instant messaging."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-text-light overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute -top-64 -left-64 w-96 h-96 bg-accent-blue/10 rounded-full filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-accent-purple/10 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <nav className="max-w-7xl mx-auto flex justify-between items-center p-4 glass-card mt-4 rounded-xl">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-7 h-7 text-accent-blue" />
              <h1 className="text-2xl font-bold text-text-heading">DevConnect</h1>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                variant="primary"
                onClick={() => navigate('/register')}
                className="shadow-glow"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <button className="md:hidden p-2 rounded-md hover:bg-dark-card">
              <Zap className="w-6 h-6" />
            </button>
          </nav>
        </header>

        <main className="pt-32">
          {/* Hero */}
          <section className="text-center py-20 px-4">
            {/* Interactivity Suggestion for Framer Motion:
                Animate the entry of each element in the hero section with a staggered delay.
                The main heading can fade in and slide up, followed by the paragraph and then the buttons.
            */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
              }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-7xl font-extrabold mb-6 text-text-heading">
                The Social Hub <br /> for <span className="text-accent-blue">Developers</span>
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg text-text-dark mb-10 max-w-2xl mx-auto">
                Build your profile, showcase your projects, and connect with a global community of coders, creators, and innovators.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={() => navigate('/register')}
                    className="shadow-glow"
                  >
                    Join the Community
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('https://github.com/yourusername/devconnect', '_blank')}
                  >
                    Explore Projects
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* Features */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-4xl font-bold text-center mb-12 text-text-heading">Why DevConnect?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Interactivity Suggestion for Framer Motion:
                    Use `whileInView` to trigger a staggered animation for the feature cards
                    as the user scrolls down the page. Each card can fade in and scale up.
                */}
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="glass-card p-8 rounded-2xl text-center glass-hover"
                  >
                    <div className="inline-block p-4 bg-dark-bg rounded-full mb-6">
                      {feature.icon}
                    </div>
                    <h4 className="text-2xl font-semibold mb-3 text-text-heading">{feature.title}</h4>
                    <p className="text-text-dark">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 text-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h3 className="text-4xl font-bold mb-4 text-text-heading">Ready to Connect?</h3>
              <p className="text-lg text-text-dark mb-8">
                Join thousands of developers who are already sharing, learning, and growing on DevConnect.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="shadow-glow"
                >
                  Sign Up Now
                </Button>
              </motion.div>
            </motion.div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-text-dark py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <CodeIcon className="text-accent-blue" />
                <span className="text-lg font-semibold text-text-light">DevConnect</span>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-accent-blue transition-colors"><FaGithub size={22} /></a>
                <a href="#" className="hover:text-accent-blue transition-colors"><FaTwitter size={22} /></a>
                <a href="#" className="hover:text-accent-blue transition-colors"><FaLinkedin size={22} /></a>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>&copy; 2024 DevConnect. All rights reserved. Built for developers, by developers.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;