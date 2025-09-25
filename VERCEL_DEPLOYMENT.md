# Environment Variables for Production Deployment

## Required Environment Variables for Vercel

### Firebase Client Configuration (Public)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Admin SDK (Private - for server-side operations)
```bash
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your_project_id","private_key_id":"key_id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com","client_id":"your_client_id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your_project_id.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

## How to Set Up in Vercel:

### Method 1: Via Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with its value
4. Set the environment scope (Production, Development, Preview)

### Method 2: Via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add FIREBASE_SERVICE_ACCOUNT_KEY
```

## Getting Firebase Service Account Key:

1. Go to Firebase Console
2. Navigate to Project Settings > Service Accounts
3. Click "Generate new private key"
4. Download the JSON file
5. Copy the entire JSON content as a single line string
6. Paste it as the value for FIREBASE_SERVICE_ACCOUNT_KEY

## Important Notes:

- ⚠️ Never commit the actual service account key to git
- ⚠️ The service account key should be a single line JSON string
- ⚠️ Make sure to escape quotes properly in the JSON
- ✅ All NEXT_PUBLIC_ variables are safe to expose to client
- ✅ FIREBASE_SERVICE_ACCOUNT_KEY should be server-only

## Troubleshooting:

If you get "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set":
1. Verify the environment variable exists in Vercel dashboard
2. Check if the JSON is properly formatted (no line breaks)
3. Redeploy after adding the variables
4. Check Vercel function logs for more details