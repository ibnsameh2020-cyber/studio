// This file is used to provide the Firebase configuration to the application.
// In the Studio environment, the configuration is primarily provided via the 
// NEXT_PUBLIC_FIREBASE_CONFIG environment variable.

const config = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_CONFIG 
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG) 
  : {};

export const firebaseConfig = config;
