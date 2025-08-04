import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, MoreVertical, Video, Phone, MessageSquare, Smile, Paperclip } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef(null);

  // Mock data - in a real app, this would come from an API
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
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
    // ... more conversations
  ];

  useEffect(() => {
    // Automatically select the first chat on component mount
    if (conversations.length > 0) {
      setSelectedChat(conversations[0]);
    }
  }, [conversations]);

  useEffect(() => {
    // Scroll to the latest message when a chat is selected or a new message is added
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        sender: 'me',
        timestamp: 'now'
      };
      // This is where you would send the message to your backend
      // and update the state accordingly.
      const updatedConversations = conversations.map(c =>
        c.id === selectedChat.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      );
      // In a real app, you would update state here.
      // For this demo, we just log it.
      console.log(updatedConversations);
      
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
    <MainLayout>
      <div className="h-[calc(100vh-80px)] flex p-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card w-[350px] rounded-2xl flex flex-col shadow-soft"
        >
          {/* Header and Search */}
          <div className="p-4 border-b border-dark-border">
            <h2 className="text-xl font-bold text-text-heading">Messages</h2>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-dark" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue bg-dark-bg text-sm"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="overflow-y-auto flex-1">
            {conversations.map((convo) => (
              <motion.div
                key={convo.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedChat(convo)}
                className={`p-4 cursor-pointer border-b border-dark-border flex items-start space-x-4 transition-colors ${
                  selectedChat?.id === convo.id
                    ? 'bg-accent-blue/10'
                    : 'hover:bg-dark-card'
                }`}
              >
                <div className="relative">
                  <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full object-cover" />
                  {convo.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-semibold text-text-light truncate">{convo.name}</h3>
                    <span className="text-xs text-text-dark">{convo.timestamp}</span>
                  </div>
                  <p className="text-sm text-text-dark truncate mt-1">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="bg-accent-blue text-white text-xs font-bold rounded-full px-2 py-1 self-center">
                    {convo.unread}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col ml-4">
          <AnimatePresence>
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl flex-1 flex flex-col shadow-soft"
              >
                {/* Chat Header */}
                <div className="p-4 border-b border-dark-border flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover" />
                      {selectedChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-card" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-heading">{selectedChat.name}</h3>
                      <p className="text-sm text-text-dark">{selectedChat.online ? 'Active now' : 'Offline'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-text-dark hover:text-text-light transition-colors"><Phone className="w-5 h-5" /></button>
                    <button className="p-2 text-text-dark hover:text-text-light transition-colors"><Video className="w-5 h-5" /></button>
                    <button className="p-2 text-text-dark hover:text-text-light transition-colors"><MoreVertical className="w-5 h-5" /></button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Interactivity Suggestion: Use Framer Motion's AnimatePresence
                      to animate new messages appearing in the chat.
                  */}
                  {selectedChat.messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-end gap-3 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-accent-blue text-white rounded-br-none'
                          : 'bg-dark-card text-text-light rounded-bl-none'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {/* Interactivity Suggestion:
                      A typing indicator could be conditionally rendered here,
                      with a subtle animation of pulsing dots.
                  */}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-dark-border">
                  <div className="bg-dark-bg rounded-lg flex items-center px-2">
                    <button className="p-2 text-text-dark hover:text-accent-purple"><Smile className="w-5 h-5" /></button>
                    <button className="p-2 text-text-dark hover:text-accent-pink"><Paperclip className="w-5 h-5" /></button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-text-light placeholder-text-dark"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 bg-accent-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center glass-card rounded-2xl">
                <div>
                  <MessageSquare className="w-16 h-16 text-text-dark mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-text-heading mb-2">Select a Conversation</h3>
                  <p className="text-text-dark">Choose a conversation from the list to start messaging.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
