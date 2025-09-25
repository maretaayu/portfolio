# Deployment Checklist ✅

## Pre-Deployment

- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] Firebase project created and configured
- [ ] Service account key generated
- [ ] Environment variables prepared

## Vercel Deployment Steps

### 1. Environment Variables Setup
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` (JSON string, single line)

### 2. Firebase Setup
- [ ] Firestore database created
- [ ] Security rules configured
- [ ] Service account has proper permissions
- [ ] Test API endpoints locally

### 3. Deployment
- [ ] Push code to GitHub
- [ ] Connect Vercel to GitHub repo
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy and test

## Quick Setup Commands

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Run automated environment setup
./scripts/setup-vercel-env.sh

# 3. Deploy
vercel --prod
```

## Testing Deployment

After deployment, test these endpoints:
- [ ] `https://your-domain.vercel.app/` - Homepage
- [ ] `https://your-domain.vercel.app/story` - Blog listing
- [ ] `https://your-domain.vercel.app/admin` - Admin interface
- [ ] `https://your-domain.vercel.app/api/blog` - Blog API
- [ ] `https://your-domain.vercel.app/api/tags` - Tags API

## Common Issues & Solutions

### ❌ "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set"
**Solution**: 
1. Check environment variables in Vercel dashboard
2. Ensure the service account key is a single-line JSON string
3. Redeploy after adding the variable

### ❌ "Firebase Admin SDK initialization failed"
**Solution**:
1. Verify the service account JSON format
2. Check Firebase project permissions
3. Ensure Firestore is enabled

### ❌ API endpoints returning 500 errors
**Solution**:
1. Check Vercel function logs
2. Verify Firebase configuration
3. Test API endpoints locally first

## Support Resources

- `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
- `FIREBASE_STATUS.md` - Firebase setup status
- Vercel logs - Check function execution logs
- Firebase Console - Monitor database activity

## Success Indicators ✅

When deployment is successful, you should see:
- ✅ Website loads without errors
- ✅ Blog posts display correctly
- ✅ Admin interface accessible
- ✅ CRUD operations working
- ✅ No console errors in production