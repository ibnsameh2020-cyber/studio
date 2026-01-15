
"use client";
import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import { 
    getAuth, 
    Auth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    type UserCredential
} from "firebase/auth";
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

    const storeUser = async (user: UserCredential["user"]) => {
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
    }
    
    const getFirebaseErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-disabled':
                return 'This user account has been disabled.';
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Invalid email or password.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'The password is too weak. Please use at least 6 characters.';
            default:
                return 'An unknown error occurred. Please try again.';
        }
    };


    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            await storeUser(result.user);
            return null;
        } catch (error: any) {
            console.error("Error signing in with Google: ", error);
            return getFirebaseErrorMessage(error.code);
        }
    };

    const signInWithEmailPassword = async (email: string, password: string): Promise<string | null> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return null;
        } catch (error: any) {
            console.error("Error signing in: ", error);
            return getFirebaseErrorMessage(error.code);
        }
    };
    
    const signUpWithEmailPassword = async (email: string, password: string, displayName: string): Promise<string | null> => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });
            await storeUser(result.user);
            return null;
        } catch (error: any) {
            console.error("Error signing up: ", error);
            return getFirebaseErrorMessage(error.code);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return { signInWithGoogle, signOut, signInWithEmailPassword, signUpWithEmailPassword };
}

// Custom hook to memoize Firebase queries
function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}


export { useUser, useCollection, useDoc, useMemoFirebase, useAuthActions as useAuth };
export { FirebaseProvider } from './provider';
export { FirebaseClientProvider } from './client-provider';
