#!/bin/bash

# Setup Environment Variables for Vercel Deployment
# Run this script to add all required environment variables to your Vercel project

echo "🚀 Setting up environment variables for Vercel deployment..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

echo "📝 Please provide your Firebase configuration values:"
echo ""

# Firebase Client Config (Public)
read -p "NEXT_PUBLIC_FIREBASE_API_KEY: " firebase_api_key
read -p "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: " firebase_auth_domain
read -p "NEXT_PUBLIC_FIREBASE_PROJECT_ID: " firebase_project_id
read -p "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: " firebase_storage_bucket
read -p "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: " firebase_messaging_sender_id
read -p "NEXT_PUBLIC_FIREBASE_APP_ID: " firebase_app_id

echo ""
echo "📋 For FIREBASE_SERVICE_ACCOUNT_KEY:"
echo "1. Go to Firebase Console > Project Settings > Service Accounts"
echo "2. Click 'Generate new private key'"
echo "3. Copy the entire JSON content"
echo ""
read -p "Paste your Firebase Service Account Key JSON (single line): " firebase_service_account_key

echo ""
echo "🔧 Adding environment variables to Vercel..."

# Add public variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production <<< "$firebase_api_key"
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production <<< "$firebase_auth_domain"
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production <<< "$firebase_project_id"
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production <<< "$firebase_storage_bucket"
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production <<< "$firebase_messaging_sender_id"
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production <<< "$firebase_app_id"

# Add private variables
vercel env add FIREBASE_SERVICE_ACCOUNT_KEY production <<< "$firebase_service_account_key"

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "🚀 You can now redeploy your application:"
echo "   vercel --prod"
echo ""
echo "📝 To manage environment variables:"
echo "   vercel env ls"
echo "   vercel env rm <variable_name>"
echo ""