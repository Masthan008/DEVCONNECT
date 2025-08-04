import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Bookmark, 
  Settings, 
  LogOut,
  User,
  Search,
  TrendingUp,
  Code2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: 'Home', href: '/feed', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Profile', href: `/profile/${user?.username || 'me'}`, icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const trendingTopics = [
    { name: '#React19', posts: '2.1k' },
    { name: '#TypeScript', posts: '1.8k' },
    { name: '#WebDev', posts: '3.2k' },
    { name: '#OpenSource', posts: '1.5k' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-10">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">DevConnect</span>
        </div>

        {/* User Profile */}
        {user && (
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Trending Topics */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Topics
          </h3>
          <div className="space-y-2">
            {trendingTopics.map((topic) => (
              <div key={topic.name} className="text-sm">
                <p className="font-medium text-slate-900 dark:text-white">{topic.name}</p>
                <p className="text-slate-500 dark:text-slate-400">{topic.posts} posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
