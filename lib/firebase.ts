import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean)

// Keep Firebase client initialization browser-only so Next.js can prerender the shell
// even when preview/build workers do not receive public project variables.
const app = typeof window !== 'undefined' && firebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null
export { app }
