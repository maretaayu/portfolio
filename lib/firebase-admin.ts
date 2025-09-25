import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";

// Get service account from environment variable
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set"
  );
}

// Parse the service account JSON and type it properly
const serviceAccount = JSON.parse(serviceAccountKey) as ServiceAccount;

let adminApp;

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  adminApp = initializeApp(
    {
      credential: cert(serviceAccount),
      projectId: "maretacodes-story",
    },
    "admin"
  );
} else {
  adminApp = getApps().find((app) => app.name === "admin");
}

// Export Firestore database instance
export const adminDb = getFirestore(adminApp!);

// Export the admin app
export default adminApp;
