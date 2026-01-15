
"use client";
import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { getFirestore, Firestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig as importedConfig } from './config';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useMemo } from 'react';

// This is a hack to get around the fact that the config is not available at build time
const firebaseConfig = importedConfig || JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export async function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
  return { app, auth, firestore };
}


function useAuthActions() {
    const auth = getAuth(app); 
    const firestore = getFirestore(app);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Create user profile in Firestore if it doesn't exist
            const userRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    id: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                });
            }
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return { signInWithGoogle, signOut };
}

// Custom hook to memoize Firebase queries
function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}


export { useUser, useCollection, useDoc, useMemoFirebase, useAuthActions as useAuth };
export { FirebaseProvider } from './provider';
export { FirebaseClientProvider } from './client-provider';
