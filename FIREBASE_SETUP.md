# Firebase Setup for Blog System

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Firestore security rules
4. Get your Firebase configuration

## Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard
4. Choose your preferred settings

### 2. Enable Firestore

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select your preferred location

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and choose Web (</>)
4. Register your app
5. Copy the configuration object

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Security Rules

For development, you can use these basic rules in Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to blog posts and tags
    match /blog_posts/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }

    match /blog_tags/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Collections Structure

Your Firestore will have these collections:

#### `blog_posts`

- `id` (auto-generated)
- `title` (string)
- `slug` (string)
- `excerpt` (string)
- `content` (string)
- `publishedAt` (timestamp)
- `updatedAt` (timestamp)
- `tags` (array of strings)
- `featured` (boolean)
- `readingTime` (number)
- `language` (string: 'en' | 'id')
- `views` (number)
- `likes` (number)

#### `blog_tags`

- `id` (auto-generated)
- `name` (string)
- `slug` (string)
- `count` (number)

## Usage

### Admin Panel

- Create posts: `/admin/create-post`
- Manage posts: `/admin/manage-posts`

### Public Pages

- All stories: `/story`
- Individual story: `/story/[slug]`
- Stories by tag: `/tag/[tag]`
- Homepage with latest stories: `/`

## Features

✅ **Create** - Add new blog posts with rich content
✅ **Read** - Display posts with proper formatting
✅ **Update** - Edit existing posts and toggle featured status
✅ **Delete** - Remove posts with confirmation
✅ **Search** - Find posts by title, content, or tags
✅ **Tags** - Automatic tag management with counts
✅ **Views/Likes** - Track engagement metrics
✅ **Featured Posts** - Highlight important content
✅ **Responsive** - Works on all devices
✅ **Real-time** - Uses Firestore for live data

## Development

```bash
npm run dev
```

Navigate to:

- `http://localhost:3000` - Homepage
- `http://localhost:3000/story` - Blog listing
- `http://localhost:3000/admin/create-post` - Create new post
- `http://localhost:3000/admin/manage-posts` - Manage all posts

## Production Considerations

1. **Authentication**: Add Firebase Auth for admin access
2. **Security Rules**: Implement proper access control
3. **Image Upload**: Add Firebase Storage for images
4. **Performance**: Enable Firestore indexes for queries
5. **SEO**: Consider static generation for public pages
6. **Search**: Implement full-text search with Algolia
7. **Analytics**: Track user engagement and popular content

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check environment variables
2. **Permission denied**: Update Firestore security rules
3. **Collection not found**: Create a test post to initialize collections
4. **Build errors**: Make sure all environment variables are set

### Debug Mode

Add this to see Firebase operations in console:

```javascript
// In lib/firebase.ts
import { enableNetwork, connectFirestoreEmulator } from "firebase/firestore";

// For local development
if (process.env.NODE_ENV === "development") {
  console.log("Firebase initialized for development");
}
```
