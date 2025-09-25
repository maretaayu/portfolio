import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";

// Firebase Admin initialization with fallback
let adminApp: any = null;
let isFirebaseAvailable = false;

// Get service account from environment variable
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

try {
  if (!serviceAccountKey) {
    console.warn('⚠️ Firebase Admin SDK: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
    console.warn('Running in fallback mode - Firebase features will be limited');
  } else {
    // Parse the service account JSON and type it properly
    let serviceAccount: ServiceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountKey) as ServiceAccount;
    } catch (error) {
      console.warn('⚠️ Firebase Admin SDK: Invalid FIREBASE_SERVICE_ACCOUNT_KEY format');
      console.warn('Error:', error instanceof Error ? error.message : String(error));
      throw new Error("Invalid service account format");
    }

    // Initialize Firebase Admin if not already initialized
    if (getApps().length === 0) {
      adminApp = initializeApp(
        {
          credential: cert(serviceAccount),
          projectId: serviceAccount.projectId,
        },
        "admin"
      );
      console.log('✅ Firebase Admin SDK initialized successfully');
    } else {
      adminApp = getApps().find((app) => app.name === "admin");
      console.log('✅ Firebase Admin SDK already initialized');
    }
    
    isFirebaseAvailable = true;
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin SDK initialization failed:', error instanceof Error ? error.message : String(error));
  console.warn('Running in fallback mode - using mock data for development/deployment');
  isFirebaseAvailable = false;
}

// Export Firestore database instance (with fallback)
export const adminDb = adminApp ? getFirestore(adminApp) : null;

// Export Firebase availability status
export { isFirebaseAvailable };

// Export the admin app
export default adminApp;
