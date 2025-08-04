const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const { recipient, content, replyTo } = req.body;

    if (!recipient || !content) {
      return res.status(400).json({ message: 'Recipient and content are required' });
    }

    // Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const message = new Message({
      sender: req.userId,
      recipient,
      content: content.trim(),
      replyTo: replyTo || null
    });

    await message.save();
    await message.populate('sender', 'name username avatar');
    await message.populate('recipient', 'name username avatar');

    res.status(201).json({
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get conversations (users who have messaged with current user)
router.get('/conversations', auth, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.userId },
            { recipient: req.userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.userId] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$recipient', req.userId] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          user: {
            _id: 1,
            name: 1,
            username: 1,
            avatar: 1,
            isOnline: 1,
            lastSeen: 1
          },
          lastMessage: 1,
          unreadCount: 1
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages between current user and another user
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.userId, recipient: userId },
        { sender: userId, recipient: req.userId }
      ]
    })
      .populate('sender', 'name username avatar')
      .populate('recipient', 'name username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Mark messages as read
    await Message.updateMany(
      { sender: userId, recipient: req.userId, isRead: false },
      { isRead: true }
    );

    const total = await Message.countDocuments({
      $or: [
        { sender: req.userId, recipient: userId },
        { sender: userId, recipient: req.userId }
      ]
    });

    res.json({
      messages: messages.reverse(), // Reverse to show oldest first
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread messages count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      recipient: req.userId,
      isRead: false
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.recipient.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.isRead = true;
    await message.save();

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    message.content = '[Message deleted]';
    await message.save();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent messages (for notifications)
router.get('/recent', auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const recentMessages = await Message.find({
      recipient: req.userId,
      isRead: false
    })
      .populate('sender', 'name username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1);

    res.json({ recentMessages });
  } catch (error) {
    console.error('Get recent messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
