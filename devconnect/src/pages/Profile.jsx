import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  Briefcase,
  Code2,
  Star,
  GitFork,
  Eye
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';

const Profile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const profileData = {
    name: 'Sarah Chen',
    username: '@sarahchen',
    bio: 'Senior Frontend Developer passionate about React, TypeScript, and building beautiful user experiences. Open source contributor and tech enthusiast.',
    location: 'San Francisco, CA',
    website: 'sarahchen.dev',
    joinedDate: 'March 2023',
    role: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop',
    stats: {
      posts: 156,
      followers: 2847,
      following: 892,
      projects: 24
    },
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS', 'Next.js', 'AWS'],
    socialLinks: {
      github: 'sarahchen',
      twitter: 'sarahchen_dev',
      linkedin: 'sarahchen',
      email: 'hello@sarahchen.dev'
    }
  };

  const posts = [
    {
      id: 1,
      content: 'Just released a new React hook library! 🎉 Check it out for better state management and performance optimization.',
      timestamp: '2 hours ago',
      likes: 89,
      comments: 12,
      tags: ['react', 'library', 'opensource']
    },
    {
      id: 2,
      content: 'Working on implementing dark mode with Tailwind CSS. The new JIT compiler makes it so much easier!',
      timestamp: '1 day ago',
      likes: 156,
      comments: 23,
      tags: ['tailwind', 'css', 'darkmode']
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'React UI Kit',
      description: 'A comprehensive React component library with TypeScript support',
      stars: 1234,
      forks: 234,
      language: 'TypeScript',
      url: 'https://github.com/sarahchen/react-ui-kit'
    },
    {
      id: 2,
      name: 'DevTools Extension',
      description: 'Browser extension for debugging React applications',
      stars: 567,
      forks: 89,
      language: 'JavaScript',
      url: 'https://github.com/sarahchen/devtools-extension'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Topbar />
      <Sidebar />
      
      <main className="ml-64 pt-16">
        {/* Cover Image */}
        <div 
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${profileData.coverImage})` }}
        />

        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 -mt-20 relative"
          >
            <div className="flex items-end space-x-6">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {profileData.name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">{profileData.username}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isFollowing
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio and Info */}
            <div className="mt-6 space-y-4">
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl">
                {profileData.bio}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                {profileData.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData.company && (
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{profileData.company}</span>
                  </div>
                )}
                {profileData.website && (
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href={`https://${profileData.website}`} className="text-blue-600 hover:underline">
                      {profileData.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profileData.joinedDate}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {profileData.socialLinks.github && (
                  <a href={`https://github.com/${profileData.socialLinks.github}`} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profileData.socialLinks.twitter && (
                  <a href={`https://twitter.com/${profileData.socialLinks.twitter}`} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profileData.socialLinks.linkedin && (
                  <a href={`https://linkedin.com/in/${profileData.socialLinks.linkedin}`} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profileData.socialLinks.email && (
                  <a href={`mailto:${profileData.socialLinks.email}`} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profileData.stats.posts}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profileData.stats.followers}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profileData.stats.following}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profileData.stats.projects}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="mt-6 border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8">
              {['posts', 'projects', 'about'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-6"
          >
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
                    <p className="text-slate-700 dark:text-slate-300 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>{post.timestamp}</span>
                      <div className="flex space-x-4">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {project.description}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        {project.language}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                      <a
                        href={project.url}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-500"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">About</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300">
                    {profileData.bio}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mt-4">
                    I'm passionate about creating scalable web applications and sharing knowledge with the developer community. 
                    When I'm not coding, you can find me contributing to open source projects or mentoring junior developers.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
