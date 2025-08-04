import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, MapPin, Briefcase, Award } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

// Mock data for developers
const mockUsers = [
  { _id: '1', name: 'Jane Developer', username: 'janecoder', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Senior Developer', location: 'San Francisco, CA', skills: ['React', 'Node.js', 'MongoDB'], isFollowing: false },
  { _id: '2', name: 'Alex Frontend', username: 'alexdev', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Frontend Developer', location: 'New York, NY', skills: ['Vue.js', 'CSS', 'Figma'], isFollowing: true },
  { _id: '3', name: 'Sam Backend', username: 'sambackend', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Backend Engineer', location: 'Seattle, WA', skills: ['Python', 'Django', 'PostgreSQL'], isFollowing: false },
  { _id: '4', name: 'Taylor Mobile', username: 'taylormobile', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', role: 'Mobile Developer', location: 'Austin, TX', skills: ['React Native', 'Flutter', 'Swift'], isFollowing: false },
  { _id: '5', name: 'Jordan DevOps', username: 'jordanops', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', role: 'DevOps Engineer', location: 'Portland, OR', skills: ['Docker', 'Kubernetes', 'Terraform'], isFollowing: false },
  { _id: '6', name: 'Casey Security', username: 'caseysec', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', role: 'Security Engineer', location: 'Boston, MA', skills: ['Penetration Testing', 'OWASP'], isFollowing: false },
];

const Community = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps'];

  const filteredUsers = useMemo(() => {
    let result = users;
    if (searchQuery) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeFilter !== 'All') {
      result = result.filter(user => user.role.toLowerCase().includes(activeFilter.toLowerCase()));
    }
    return result;
  }, [users, searchQuery, activeFilter]);

  const handleFollow = (userId) => {
    setUsers(users.map(user =>
      user._id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ));
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-text-heading">Developer Community</h1>
          <p className="text-lg text-text-dark mt-2">Find, connect, and collaborate with developers worldwide.</p>
        </motion.header>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4"
        >
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-dark" size={20} />
            <input
              type="text"
              placeholder="Search by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue bg-dark-bg"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-accent-blue text-white shadow-glow'
                    : 'bg-dark-card text-text-dark hover:bg-dark-border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Interactivity Suggestion for Framer Motion:
              Use `AnimatePresence` and layout animations to smoothly re-order and filter the grid of cards.
          */}
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center glass-hover"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-dark-border object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-text-heading">{user.name}</h3>
              <p className="text-accent-blue">@{user.username}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {user.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-sm text-text-dark mt-4 space-y-2 w-full text-left">
                <p className="flex items-center gap-2"><Briefcase size={14} /> {user.role}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {user.location}</p>
              </div>

              <Button
                onClick={() => handleFollow(user._id)}
                variant={user.isFollowing ? "outline" : "primary"}
                className="w-full mt-6"
              >
                {user.isFollowing ? 'Following' : <span className="flex items-center justify-center gap-2"><UserPlus size={16} /> Follow</span>}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;