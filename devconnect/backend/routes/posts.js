const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, codeSnippet, tags, images } = req.body;

    const post = new Post({
      author: req.userId,
      content,
      codeSnippet,
      tags: tags || [],
      images: images || []
    });

    await post.save();

    // Populate author details
    await post.populate('author', 'name username avatar');

    // Add post to user's posts array
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: post._id }
    });

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, author, tags } = req.query;
    
    const query = {};
    
    if (author) {
      query.author = author;
    }
    
    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagsArray };
    }

    const posts = await Post.find(query)
      .populate('author', 'name username avatar')
      .populate('comments.user', 'name username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name username avatar')
      .populate('comments.user', 'name username avatar')
      .populate('likes', 'name username avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { content, codeSnippet, tags } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.content = content || post.content;
    post.codeSnippet = codeSnippet || post.codeSnippet;
    post.tags = tags || post.tags;
    post.isEdited = true;
    post.editedAt = new Date();

    await post.save();
    await post.populate('author', 'name username avatar');

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);

    // Remove post from user's posts array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isLiked = post.likes.includes(req.userId);

    if (isLiked) {
      // Unlike
      post.likes.pull(req.userId);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();

    res.json({
      message: isLiked ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length,
      isLiked: !isLiked
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment to post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.userId,
      content: content.trim()
    };

    post.comments.push(comment);
    await post.save();

    // Populate the new comment
    await post.populate('comments.user', 'name username avatar');
    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
router.delete('/:postId/comment/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    post.comments.pull(req.params.commentId);
    await post.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's feed (posts from users they follow)
router.get('/feed/me', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const user = await User.findById(req.userId);
    
    const posts = await Post.find({
      author: { $in: [...user.following, req.userId] }
    })
      .populate('author', 'name username avatar')
      .populate('comments.user', 'name username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments({
      author: { $in: [...user.following, req.userId] }
    });

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
