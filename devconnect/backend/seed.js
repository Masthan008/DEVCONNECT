const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create sample users
    console.log('Creating sample users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.create([
      {
        name: 'Sarah Chen',
        username: 'sarahchen',
        email: 'sarah@devconnect.com',
        password: hashedPassword,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        bio: 'Senior Frontend Developer passionate about React and performance optimization.',
        role: 'Senior Frontend Developer',
        company: 'TechCorp',
        location: 'San Francisco, CA',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
        socialLinks: {
          github: 'https://github.com/sarahchen',
          linkedin: 'https://linkedin.com/in/sarahchen',
          twitter: 'https://twitter.com/sarahchen'
        },
        isVerified: true,
        followers: [],
        following: []
      },
      {
        name: 'Alex Rivera',
        username: 'alexrivera',
        email: 'alex@devconnect.com',
        password: hashedPassword,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Full Stack Engineer specializing in microservices and cloud architecture.',
        role: 'Full Stack Engineer',
        company: 'CloudTech',
        location: 'Austin, TX',
        skills: ['Node.js', 'Python', 'Docker', 'Kubernetes', 'AWS', 'MongoDB'],
        socialLinks: {
          github: 'https://github.com/alexrivera',
          linkedin: 'https://linkedin.com/in/alexrivera'
        },
        isVerified: true,
        followers: [],
        following: []
      },
      {
        name: 'Maya Patel',
        username: 'mayapatel',
        email: 'maya@devconnect.com',
        password: hashedPassword,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'UI/UX Designer & Developer creating beautiful and functional interfaces.',
        role: 'UI/UX Designer & Developer',
        company: 'DesignStudio',
        location: 'New York, NY',
        skills: ['Figma', 'React', 'CSS', 'JavaScript', 'User Research'],
        socialLinks: {
          github: 'https://github.com/mayapatel',
          dribbble: 'https://dribbble.com/mayapatel'
        },
        isVerified: false,
        followers: [],
        following: []
      }
    ]);

    console.log('Created users:', users.map(u => u.username));

    // Create sample posts
    console.log('Creating sample posts...');
    const posts = await Post.create([
      {
        author: users[0]._id,
        content: 'Just shipped a new feature using React 18 concurrent features! The performance improvements are incredible. Here\'s a quick demo of how we reduced our bundle size by 40%...',
        codeSnippet: `const LazyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>`,
        tags: ['react', 'performance', 'javascript'],
        likes: 42,
        comments: [
          {
            user: users[1]._id,
            content: 'Great work! The lazy loading approach really makes a difference.',
            createdAt: new Date()
          }
        ],
        shares: 3
      },
      {
        author: users[1]._id,
        content: 'Working on a Node.js microservices architecture. Here\'s a simple example of implementing circuit breaker pattern with Redis for caching. What are your thoughts on this approach?',
        codeSnippet: `const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const breaker = new CircuitBreaker(callExternalService, options);`,
        tags: ['nodejs', 'microservices', 'architecture', 'redis'],
        likes: 28,
        comments: [
          {
            user: users[0]._id,
            content: 'This is exactly what I needed for my current project! Thanks for sharing.',
            createdAt: new Date()
          }
        ],
        shares: 5
      },
      {
        author: users[2]._id,
        content: 'Just discovered this amazing CSS trick for creating glassmorphism effects! It\'s perfect for modern web apps. Check out the code snippet below 👇',
        codeSnippet: `.glassmorphism {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
}`,
        tags: ['css', 'design', 'ui-ux', 'glassmorphism'],
        likes: 67,
        comments: [
          {
            user: users[0]._id,
            content: 'This looks amazing! Definitely trying this in my next project.',
            createdAt: new Date()
          }
        ],
        shares: 9
      },
      {
        author: users[0]._id,
        content: 'TypeScript tip of the day: Use discriminated unions for better type safety in your React components!',
        codeSnippet: `type ButtonVariant = 
  | { type: 'primary'; color: 'blue' }
  | { type: 'secondary'; color: 'gray' }
  | { type: 'danger'; color: 'red' };

interface ButtonProps {
  variant: ButtonVariant;
  onClick: () => void;
}`,
        tags: ['typescript', 'react', 'best-practices'],
        likes: 89,
        comments: [],
        shares: 12
      },
      {
        author: users[1]._id,
        content: 'Deploying Docker containers to AWS ECS with GitHub Actions. Here\'s my workflow file for automated deployments!',
        codeSnippet: `name: Deploy to ECS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1`,
        tags: ['docker', 'aws', 'github-actions', 'devops'],
        likes: 34,
        comments: [],
        shares: 7
      }
    ]);

    console.log('Created posts:', posts.length);

    // Update users with posts
    for (let i = 0; i < users.length; i++) {
      const userPosts = posts.filter(post => post.author.equals(users[i]._id));
      await User.findByIdAndUpdate(users[i]._id, {
        posts: userPosts.map(post => post._id)
      });
    }

    console.log('Database seeded successfully!');
    console.log('Test users created:');
    console.log('- sarahchen@devconnect.com / password123');
    console.log('- alexrivera@devconnect.com / password123');
    console.log('- mayapatel@devconnect.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run seeder
seedDatabase();
