import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, MoreVertical, Video, Phone, Circle } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(['Sarah Chen', 'Alex Rivera', 'Maya Patel']);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      username: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      lastMessage: 'Hey! I saw your post about React hooks, really interesting!',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: 'Hey! I saw your post about React hooks, really interesting!', sender: 'other', timestamp: '2 min ago' },
        { id: 2, text: 'Thanks! I\'m glad you found it helpful. What are you working on these days?', sender: 'me', timestamp: '1 min ago' },
        { id: 3, text: 'Building a new dashboard with Next.js and Tailwind. Would love to get your thoughts on the architecture!', sender: 'other', timestamp: 'now' }
      ]
    },
    {
      id: 2,
      name: 'Alex Rivera',
      username: '@alexrivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      lastMessage: 'Can we schedule a code review for tomorrow?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Can we schedule a code review for tomorrow?', sender: 'other', timestamp: '1 hour ago' },
        { id: 2, text: 'Sure! What time works for you?', sender: 'me', timestamp: '45 min ago' }
      ]
    },
    {
      id: 3,
      name: 'Maya Patel',
      username: '@mayapatel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      lastMessage: 'The UI designs look amazing! 🎨',
      timestamp: '3 hours ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: 'The UI designs look amazing! 🎨', sender: 'other', timestamp: '3 hours ago' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: 'me',
        timestamp: 'now'
      };
      
      // In a real app, this would update the conversation
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Topbar />
      <Sidebar />
      
      <main className="ml-64 pt-16 h-screen">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Messages</h2>
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 text-sm"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => setSelectedChat(conversation)}
                  className={`p-4 cursor-pointer border-b border-slate-200 dark:border-slate-700 ${
                    selectedChat?.id === conversation.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.online && (
                        <Circle className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 fill-current" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedChat.avatar}
                          alt={selectedChat.name}
                          className="w-10 h-10 rounded-full"
                        />
                        {selectedChat.online && (
                          <Circle className="absolute -bottom-1 -right-1 h-3 w-3 text-green-500 fill-current" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {selectedChat.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {selectedChat.online ? 'Active now' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === 'me' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'me' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
