---
description: Repository Information Overview
alwaysApply: true
---

# DevConnect Information

## Summary
DevConnect is a full-stack social networking platform for developers, built with React and Node.js. It allows developers to connect, share posts with code snippets, and communicate with each other through a modern web interface.

## Structure
- **devconnect/**: Main project directory
  - **backend/**: Node.js Express server with MongoDB
  - **src/**: React frontend application
  - **public/**: Static assets

## Language & Runtime
**Frontend Language**: JavaScript (React)
**Backend Language**: JavaScript (Node.js)
**Version**: React 19.1.0, Node.js
**Build System**: Vite 7.0.6
**Package Manager**: npm

## Dependencies
**Main Frontend Dependencies**:
- react: ^19.1.0
- react-dom: ^19.1.0
- react-router-dom: ^7.7.1
- framer-motion: ^12.23.12
- lucide-react: ^0.536.0

**Main Backend Dependencies**:
- express
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT authentication)
- bcrypt (Password hashing)
- socket.io (Real-time messaging)
- cors (Cross-origin resource sharing)
- helmet (Security headers)

**Development Dependencies**:
- tailwindcss: ^4.1.11
- postcss: ^8.5.6
- @vitejs/plugin-react: ^4.6.0
- eslint: ^9.30.1
- nodemon (Backend hot reloading)

## Build & Installation
```bash
# Frontend
cd devconnect
npm install
npm run dev

# Backend
cd devconnect/backend
npm install
nodemon server.js
```

## Database
**Type**: MongoDB (Atlas)
**Models**:
- User (authentication, profiles, following)
- Post (content sharing with code snippets)
- Message (direct messaging between users)

## Frontend Architecture
**Component Structure**: 
- Uses React components with hooks
- Organized in src/components, src/pages, src/layout
- Context API for state management (src/context)

**Styling**:
- TailwindCSS for styling
- Custom theme with light/dark mode support
- CSS variables for theming

**API Integration**:
- Custom API client in src/utils/api.js
- Organized by resource (auth, users, posts, messages)
- FormData handling for file uploads

## Backend Architecture
**API Routes**:
- /api/auth - Authentication and user management
- /api/users - User profiles and social connections
- /api/posts - Content creation and interaction
- /api/messages - Direct messaging
- /api/upload - File uploads

**Real-time Features**:
- Socket.io for instant messaging
- User online status tracking