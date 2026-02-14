import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase using the namespaced API (compatible with v8)
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = app.auth();
export const db = app.firestore();

// Disable offline persistence to avoid "client is offline" errors
// This forces Firestore to always fetch from network
// db.settings({
//   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
// });

// Disable persistence (uses network only)
// db.enablePersistence({ synchronizeTabs: false }).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.warn('Firestore persistence unavailable - multiple tabs open');
//   } else if (err.code === 'unimplemented') {
//     console.warn('Firestore persistence not supported in this browser');
//   }
// });
