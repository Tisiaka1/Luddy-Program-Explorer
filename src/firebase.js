import { getApp, getApps, initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const env = import.meta.env ?? {};

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

console.log(env.FIREBASE_API_KEY, env.FIREBASE_PROJECT_ID, env.FIREBASE_APP_ID);

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
