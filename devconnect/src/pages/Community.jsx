import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, ExternalLink, Code, MapPin, Briefcase } from 'lucide-react';
import { usersAPI } from '../utils/api';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

const Community = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    skills: []
  });
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await usersAPI.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleFollow = async (userId) => {
    try {
      await usersAPI.followUser(userId);
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isFollowing: !user.isFollowing } 
          : user
      ));
    } catch (err) {
      console.error('Error following user:', err);
    }
  };
  
  // Placeholder data for development
  const placeholderUsers = [
    {
      _id: '1',
      name: 'Jane Developer',
      username: 'janecoder',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Full-stack developer with 5 years of experience. React, Node.js, MongoDB enthusiast.',
      role: 'Senior Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      website: 'https://janedeveloper.com',
      github: 'janecoder',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      followers: 245,
      following: 123,
      isFollowing: false
    },
    {
      _id: '2',
      name: 'Alex Frontend',
      username: 'alexdev',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'UI/UX designer and frontend developer. Creating beautiful and functional interfaces.',
      role: 'Frontend Developer',
      company: 'DesignHub',
      location: 'New York, NY',
      website: 'https://alexfrontend.dev',
      github: 'alexdev',
      skills: ['React', 'Vue.js', 'CSS', 'Figma'],
      followers: 189,
      following: 210,
      isFollowing: true
    },
    {
      _id: '3',
      name: 'Sam Backend',
      username: 'sambackend',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Backend developer specializing in scalable systems. Database optimization expert.',
      role: 'Backend Engineer',
      company: 'DataSystems',
      location: 'Seattle, WA',
      website: 'https://sambackend.io',
      github: 'sambackend',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      followers: 312,
      following: 98,
      isFollowing: false
    },
    {
      _id: '4',
      name: 'Taylor Mobile',
      username: 'taylormobile',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Mobile app developer with expertise in cross-platform solutions. React Native advocate.',
      role: 'Mobile Developer',
      company: 'AppWorks',
      location: 'Austin, TX',
      website: 'https://taylormobile.dev',
      github: 'taylormobile',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      followers: 178,
      following: 143,
      isFollowing: false
    },
    {
      _id: '5',
      name: 'Jordan DevOps',
      username: 'jordanops',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      bio: 'DevOps engineer focused on CI/CD pipelines and infrastructure automation.',
      role: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Portland, OR',
      website: 'https://jordandevops.com',
      github: 'jordanops',
      skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      followers: 201,
      following: 87,
      isFollowing: false
    },
    {
      _id: '6',
      name: 'Casey Security',
      username: 'caseysec',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      bio: 'Cybersecurity specialist with a focus on web application security and penetration testing.',
      role: 'Security Engineer',
      company: 'SecureNet',
      location: 'Boston, MA',
      website: 'https://caseysecurity.net',
      github: 'caseysec',
      skills: ['Penetration Testing', 'OWASP', 'Cryptography', 'Network Security'],
      followers: 156,
      following: 92,
      isFollowing: false
    }
  ];
  
  const displayUsers = users.length > 0 ? users : placeholderUsers;
  
  const filteredUsers = displayUsers.filter(user => {
    // Search by name or username
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by role
    const matchesRole = filters.role === '' || 
      user.role.toLowerCase().includes(filters.role.toLowerCase());
    
    // Filter by location
    const matchesLocation = filters.location === '' || 
      user.location.toLowerCase().includes(filters.location.toLowerCase());
    
    // Filter by skills
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.every(skill => 
        user.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
    
    return matchesSearch && matchesRole && matchesLocation && matchesSkills;
  });
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Developer Community</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with developers from around the world</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search developers by name or username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filters.role}
                onChange={(e) => setFilters({...filters, role: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Roles</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps</option>
                <option value="security">Security</option>
              </select>
              
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Locations</option>
                <option value="san francisco">San Francisco</option>
                <option value="new york">New York</option>
                <option value="seattle">Seattle</option>
                <option value="austin">Austin</option>
                <option value="boston">Boston</option>
                <option value="portland">Portland</option>
              </select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                More Filters
              </Button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading developers...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-between -mt-12">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                    />
                    <Button
                      variant={user.isFollowing ? "outline" : "default"}
                      size="sm"
                      className="mt-14"
                      onClick={() => handleFollow(user._id)}
                    >
                      {user.isFollowing ? 'Following' : (
                        <span className="flex items-center gap-1">
                          <UserPlus size={14} />
                          Follow
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">@{user.username}</p>
                    
                    <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{user.bio}</p>
                    
                    <div className="mt-4 space-y-2">
                      {user.role && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Briefcase size={14} className="mr-2" />
                          {user.role} {user.company && `at ${user.company}`}
                        </div>
                      )}
                      
                      {user.location && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin size={14} className="mr-2" />
                          {user.location}
                        </div>
                      )}
                      
                      {user.github && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Code size={14} className="mr-2" />
                          <a 
                            href={`https://github.com/${user.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            github.com/{user.github}
                          </a>
                        </div>
                      )}
                      
                      {user.website && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <ExternalLink size={14} className="mr-2" />
                          <a 
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-[200px]"
                          >
                            {user.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {user.skills.slice(0, 4).map((skill, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs">
                            +{user.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">{user.followers}</span>
                        <span className="text-gray-600 dark:text-gray-400"> followers</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">{user.following}</span>
                        <span className="text-gray-600 dark:text-gray-400"> following</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Community;