# MongoDB Atlas Setup Guide for DevConnect

## Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Choose "Shared" (free tier) for development

## Step 2: Create a Cluster
1. Click "Build a Cluster"
2. Choose "Shared" cluster (free)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose the region closest to your location
5. Click "Create Cluster" (this may take a few minutes)

## Step 3: Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set "Built-in Role" to "Read and Write to any database"
5. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `devconnect`

## Step 6: Update Environment Variables
Replace the `MONGODB_URI` in your `.env` file with:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/devconnect?retryWrites=true&w=majority
```

## Step 7: Test Connection
1. Start the backend server:
   ```bash
   npm run dev
   ```
2. Check console for "Connected to MongoDB" message

## Database Schema
The following collections will be automatically created:
- `users` - User profiles and authentication
- `posts` - User posts with likes, comments
- `messages` - Direct messages between users

## Sample Data (Optional)
You can use MongoDB Compass or Atlas Data Explorer to:
1. Create sample users
2. Add sample posts
3. Test the API endpoints

## Security Notes
- Never commit `.env` file to version control
- Use strong passwords for database users
- Restrict IP addresses in production
- Enable MongoDB Atlas alerts for monitoring
