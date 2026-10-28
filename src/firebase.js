import { getApp, getApps, initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const env = import.meta.env ?? {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const hasRequiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.projectId,
  firebaseConfig.appId,
].every(Boolean);

let model = null;

if (hasRequiredConfig) {
  try {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const ai = getAI(app, { backend: new GoogleAIBackend() });

    model = getGenerativeModel(ai, {
      model: "gemini-3.5-flash-lite",
    });
  } catch (error) {
    console.error("Firebase AI initialization failed:", error);
  }
}

export { model };
