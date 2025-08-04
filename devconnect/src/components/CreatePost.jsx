import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Code, Send, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../utils/api';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const postData = new FormData();
      postData.append('content', content);
      
      if (codeSnippet) {
        postData.append('codeSnippet', codeSnippet);
      }
      
      if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        tagArray.forEach(tag => postData.append('tags', tag));
      }
      
      if (image) {
        postData.append('image', image);
      }

      const newPost = await postsAPI.createPost(postData);
      
      // Reset form
      setContent('');
      setCodeSnippet('');
      setTags('');
      setImage(null);
      setShowCodeEditor(false);
      
      // Notify parent
      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6"
    >
      <div className="flex space-x-4">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, code, or insights..."
            className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500"
            rows={3}
          />

          {showCodeEditor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Code Snippet
                </label>
                <button
                  type="button"
                  onClick={() => setShowCodeEditor(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900 dark:bg-slate-800 text-green-400 font-mono text-sm"
                rows={6}
              />
            </motion.div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Image className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <button
                type="button"
                onClick={() => setShowCodeEditor(!showCodeEditor)}
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Code className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma separated)"
                className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Posting...' : 'Post'}</span>
            </button>
          </div>

          {image && (
            <div className="mt-4 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-h-48 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePost;
