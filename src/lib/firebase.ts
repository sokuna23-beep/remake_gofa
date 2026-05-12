import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Helper to get env variables with fallback to config file
const getEnv = (key: string, configValue: string) => {
  const value = import.meta.env[key];
  if (!value || value === 'SEE_ENV_VARS' || value === 'undefined') {
    return configValue === 'SEE_ENV_VARS' ? null : configValue;
  }
  return value;
};

const firebaseConfig = {
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID', firebaseConfigData.projectId),
  appId: getEnv('VITE_FIREBASE_APP_ID', firebaseConfigData.appId),
  apiKey: getEnv('VITE_FIREBASE_API_KEY', ''), 
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN', firebaseConfigData.authDomain),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET', firebaseConfigData.storageBucket),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', firebaseConfigData.messagingSenderId),
};

// Global fallback for API key if still missing
if (!firebaseConfig.apiKey) {
  firebaseConfig.apiKey = 'AIzaSyDTCgYcD84tfOIbwySxHVC_DqOBkgsJql0';
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const databaseId = getEnv('VITE_FIREBASE_DATABASE_ID', firebaseConfigData.firestoreDatabaseId);
export const db = getFirestore(app, databaseId || undefined);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signIn() {
  try {
    // Basic check for configured API Key
    if (firebaseConfig.apiKey.includes('SEE_ENV')) {
      throw new Error("Configuration Firebase incomplète (API Key manquante).");
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create/Check user profile in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'sokuna23@gmail.com';
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        role: user.email === adminEmail ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      });
    }
    return user;
  } catch (error: any) {
    console.error("Firebase Login Error Detail:", error);
    if (error.code === 'auth/popup-blocked') {
      throw new Error("Le pop-up de connexion a été bloqué par votre navigateur.");
    }
    throw error;
  }
}

export async function logOut() {
  await signOut(auth);
}
