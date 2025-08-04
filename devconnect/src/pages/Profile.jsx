import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Link as LinkIcon, Calendar, Github, Twitter, Linkedin, Mail, Briefcase,
  Code2, Star, GitFork, Eye, Award, BarChart2, Activity
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

// Mock data for profile page
const profileData = {
  name: 'Sarah Chen',
  username: '@sarahchen',
  bio: 'Senior Frontend Developer passionate about React, TypeScript, and building beautiful, accessible user experiences. Open source contributor and tech enthusiast.',
  location: 'San Francisco, CA',
  website: 'sarahchen.dev',
  joinedDate: 'March 2023',
  role: 'Senior Frontend Developer at TechCorp',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop',
  stats: { posts: 156, followers: '2.8k', following: 892 },
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS', 'Next.js', 'AWS', 'Figma'],
  socialLinks: { github: 'sarahchen', twitter: 'sarahchen_dev', linkedin: 'sarahchen' },
  xp: { current: 750, max: 1000, level: 12 }
};

const Profile = () => {
  const { id } = useParams(); // In a real app, you'd fetch data based on this ID
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const tabContent = {
    posts: <div className="text-text-dark">Posts from this user would be displayed here.</div>,
    projects: <div className="text-text-dark">A gallery of the user's projects would be shown here.</div>,
    about: <p className="text-text-light leading-relaxed">{profileData.bio}</p>
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-64 rounded-2xl bg-cover bg-center mb-[-8rem] shadow-lg"
          style={{ backgroundImage: `url(${profileData.coverImage})` }}
        />

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative glass-card p-6 rounded-2xl shadow-soft"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-40 h-40 rounded-full border-4 border-dark-border -mt-24 md:-mt-20 object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-text-heading">{profileData.name}</h1>
              <p className="text-accent-blue text-lg">@{profileData.username}</p>
              <p className="text-text-dark mt-1">{profileData.role}</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "primary"}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>

          {/* Bio and Info */}
          <div className="mt-6">
            <p className="text-text-light max-w-3xl mx-auto md:mx-0">{profileData.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-sm text-text-dark">
              <div className="flex items-center gap-2"><MapPin size={14} /> {profileData.location}</div>
              <div className="flex items-center gap-2"><LinkIcon size={14} /> <a href="#" className="hover:text-accent-blue">{profileData.website}</a></div>
              <div className="flex items-center gap-2"><Calendar size={14} /> Joined {profileData.joinedDate}</div>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-text-dark hover:text-accent-blue"><Github size={20} /></a>
              <a href="#" className="text-text-dark hover:text-accent-blue"><Twitter size={20} /></a>
              <a href="#" className="text-text-dark hover:text-accent-blue"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Stats & XP Bar */}
          <div className="mt-6 pt-6 border-t border-dark-border flex flex-col md:flex-row items-center gap-8">
            <div className="flex gap-8">
              {Object.entries(profileData.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-text-heading">{value}</div>
                  <div className="text-sm text-text-dark capitalize">{key}</div>
                </div>
              ))}
            </div>
            <div className="w-full md:flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-accent-purple">Level {profileData.xp.level}</span>
                <span className="text-xs text-text-dark">{profileData.xp.current} / {profileData.xp.max} XP</span>
              </div>
              <div className="w-full bg-dark-bg rounded-full h-2.5">
                 {/* Interactivity Suggestion for Framer Motion:
                     Animate the width of the progress bar when it comes into view.
                 */}
                <motion.div
                  className="bg-gradient-to-r from-accent-blue to-accent-purple h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(profileData.xp.current / profileData.xp.max) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column (Skills) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-text-heading mb-4 flex items-center gap-2"><Award size={18}/> Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column (Tabs) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl">
              <div className="border-b border-dark-border px-6">
                <nav className="flex space-x-6">
                  {['posts', 'projects', 'about'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 relative font-medium text-md capitalize transition-colors ${
                        activeTab === tab ? 'text-text-heading' : 'text-text-dark hover:text-text-light'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue"
                          layoutId="underline"
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                 {/* Interactivity Suggestion for Framer Motion:
                     Use AnimatePresence to create a smooth transition between tabs,
                     like a fade or slide effect.
                 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
