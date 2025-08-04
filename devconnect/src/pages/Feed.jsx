import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Send, Code2, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import CreatePost from '../components/CreatePost';
import { postsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNum = 1) => {
    try {
      const response = await postsAPI.getPosts(pageNum);
      if (pageNum === 1) {
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }
      setHasMore(response.hasMore);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Topbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-64 pt-16">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <CreatePost onPostCreated={(newPost) => {
              setPosts(prev => [newPost, ...prev]);
            }} />

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.author?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                      alt={post.author?.name || 'User'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{post.author?.name || 'Anonymous'}</h3>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">@{post.author?.username || 'user'}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm">· {formatTimestamp(post.createdAt)}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{post.author?.role || 'Developer'}</p>
                      
                      <div className="mt-3">
                        <p className="text-slate-800 dark:text-slate-200 mb-3">{post.content}</p>
                        
                        {post.codeSnippet && (
                          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-3">
                            <pre className="text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
                              <code>{post.codeSnippet}</code>
                            </pre>
                          </div>
                        )}
                        
                        {post.images && post.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="rounded-lg object-cover w-full h-48"
                              />
                            ))}
                          </div>
                        )}
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-600' : 'text-slate-500 dark:text-slate-400'} hover:text-red-600 transition-colors`}
                        >
                          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-sm">{post.likes || 0}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments?.length || 0}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-green-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares || 0}</span>
                        </button>
                        
                        <button
                          onClick={() => handleBookmark(post._id)}
                          className={`ml-auto ${post.isBookmarked ? 'text-yellow-600' : 'text-slate-500 dark:text-slate-400'} hover:text-yellow-600 transition-colors`}
                        >
                          <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {hasMore && (
                <div className="text-center py-4">
                  <button
                    onClick={() => {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      fetchPosts(nextPage);
                    }}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feed;
