import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, MapPin, Code2, Users, Star } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [followingUsers, setFollowingUsers] = useState([]);

  const categories = ['all', 'frontend', 'backend', 'full-stack', 'mobile', 'devops', 'data-science'];

  const developers = [
    {
      id: 1,
      name: 'Sarah Chen',
      username: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
      followers: 2847,
      following: 892,
      projects: 24,
      bio: 'Building beautiful web experiences with modern tech',
      isFollowing: false
    },
    {
      id: 2,
      name: 'Alex Rivera',
      username: '@alexrivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'Full Stack Engineer',
      location: 'Austin, TX',
      skills: ['Node.js', 'Python', 'AWS', 'Docker'],
      followers: 1534,
      following: 567,
      projects: 18,
      bio: 'Scaling applications and mentoring junior devs',
      isFollowing: true
    },
    {
      id: 3,
      name: 'Maya Patel',
      username: '@mayapatel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'UI/UX Developer',
      location: 'New York, NY',
      skills: ['React Native', 'Figma', 'CSS', 'Animation'],
      followers: 3210,
      following: 445,
      projects: 31,
      bio: 'Creating delightful user experiences',
      isFollowing: false
    },
    {
      id: 4,
      name: 'David Kim',
      username: '@davidkim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'Backend Engineer',
      location: 'Seattle, WA',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis'],
      followers: 1892,
      following: 723,
      projects: 15,
      bio: 'Building robust backend systems',
      isFollowing: true
    },
    {
      id: 5,
      name: 'Emma Wilson',
      username: '@emmawilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      role: 'DevOps Engineer',
      location: 'Denver, CO',
      skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
      followers: 2156,
      following: 334,
      projects: 22,
      bio: 'Automating everything and keeping systems reliable',
      isFollowing: false
    },
    {
      id: 6,
      name: 'James Liu',
      username: '@jamesliu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      role: 'Data Scientist',
      location: 'Boston, MA',
      skills: ['Python', 'TensorFlow', 'SQL', 'Data Viz'],
      followers: 1789,
      following: 567,
      projects: 19,
      bio: 'Turning data into actionable insights',
      isFollowing: false
    }
  ];

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           developer.skills.some(skill => skill.toLowerCase().includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  const handleFollow = (userId) => {
    setFollowingUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Topbar />
      <Sidebar />
      
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Explore Developers
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Discover talented developers and connect with the community
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, username, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-400">
              Found <span className="font-semibold text-slate-900 dark:text-slate-100">{filteredDevelopers.length}</span> developers
            </p>
          </div>

          {/* Developers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer, index) => (
              <motion.div
                key={developer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={developer.avatar}
                      alt={developer.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {developer.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {developer.username}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(developer.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      followingUsers.includes(developer.id) || developer.isFollowing
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {developer.role}
                    </p>
                    <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{developer.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {developer.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {developer.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {developer.skills.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
                        +{developer.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {developer.followers.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {developer.following.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {developer.projects}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDevelopers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                No developers found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or browse all developers
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
