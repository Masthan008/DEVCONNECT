import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Send, Code2, Plus, Image as ImageIcon } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

// Mock data for posts
const mockPosts = [
  {
    _id: '1',
    author: {
      name: 'Elena Rodriguez',
      username: 'elenacodes',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Frontend Engineer'
    },
    content: 'Just pushed a major update to my side project, a Kanban board built with React and Framer Motion. The drag-and-drop animations are feeling super smooth! 🚀',
    tags: ['react', 'framermotion', 'webdev'],
    likes: 128,
    isLiked: true,
    comments: 16,
    isBookmarked: false,
    createdAt: '2h ago'
  },
  {
    _id: '2',
    author: {
      name: 'Kenji Tanaka',
      username: 'kenjitech',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Backend Developer'
    },
    content: 'Exploring the new features in Node.js v22. It\'s amazing how much the platform has evolved. Performance improvements are looking promising for our microservices architecture.',
    codeSnippet: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, World!\\n');\n});`,
    tags: ['nodejs', 'backend', 'performance'],
    likes: 95,
    isLiked: false,
    comments: 7,
    isBookmarked: true,
    createdAt: '5h ago'
  },
];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(p => p._id === postId ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(p => p._id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Create Post Component */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-2xl mb-8 shadow-soft"
        >
          <div className="flex items-start space-x-4">
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="My Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                placeholder="What's on your mind, developer?"
                className="w-full bg-transparent text-text-light placeholder-text-dark focus:outline-none text-lg resize-none"
                rows="3"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
                <div className="flex items-center space-x-4 text-text-dark">
                  <button className="hover:text-accent-blue"><ImageIcon size={20} /></button>
                  <button className="hover:text-accent-purple"><Code2 size={20} /></button>
                  <button className="hover:text-accent-pink"><Plus size={20} /></button>
                </div>
                <Button variant="primary" size="sm" className="flex items-center gap-2">
                  Post <Send size={14} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {loading ? (
            <p className="text-center text-text-dark">Loading feed...</p>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-soft glass-hover"
              >
                {/* Post Header */}
                <div className="flex items-start space-x-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-text-heading">{post.author.name}</h3>
                      <span className="text-text-dark text-sm">@{post.author.username}</span>
                      <span className="text-text-dark text-sm">· {post.createdAt}</span>
                    </div>
                    <p className="text-accent-blue text-sm">{post.author.role}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-4 pl-16">
                  <p className="text-text-light mb-4">{post.content}</p>

                  {post.codeSnippet && (
                    <div className="bg-dark-bg rounded-lg p-4 mb-4 overflow-x-auto">
                      <pre className="text-sm text-text-light"><code>{post.codeSnippet}</code></pre>
                    </div>
                  )}

                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-accent-blue/10 text-accent-blue px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="mt-4 pt-4 border-t border-dark-border flex items-center justify-between text-text-dark">
                  {/* Interactivity Suggestion for Framer Motion:
                      Animate the like button with a "pop" effect and a color change when clicked.
                      The number can also animate up or down.
                  */}
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-2 hover:text-accent-pink transition-colors ${post.isLiked ? 'text-accent-pink' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>

                  <button className="flex items-center space-x-2 hover:text-accent-blue transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>

                  <button className="flex items-center space-x-2 hover:text-accent-purple transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleBookmark(post._id)}
                    className={`hover:text-yellow-400 transition-colors ${post.isBookmarked ? 'text-yellow-400' : ''}`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Feed;
