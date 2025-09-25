# Firebase Web App Configuration Needed

Your service account key is for server-side operations. For Next.js client-side, you need:

## Get Web App Config:

1. Go to Firebase Console: https://console.firebase.google.com/project/maretacodes-story
2. Click the gear icon (Project Settings)
3. Scroll down to "Your apps" section
4. If you don't have a web app yet:
   - Click "Add app" button
   - Choose Web (</>) icon
   - Register your app with a nickname like "portfolio-blog"
   - Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "maretacodes-story.firebaseapp.com",
  projectId: "maretacodes-story",
  storageBucket: "maretacodes-story.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

5. Use those values in your .env.local file

## Current Status:

- ✅ Firebase project created: maretacodes-story
- ✅ Service account key available (for admin operations)
- ❓ Need web app config for client-side operations

Please get the web app config and I'll help you set it up!
