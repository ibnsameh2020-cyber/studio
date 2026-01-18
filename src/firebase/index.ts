
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
    type UserCredential,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
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
            case 'auth/invalid-credential':
                return 'Invalid credentials. Please check your email and password.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'The password is too weak. Please use at least 6 characters.';
            case 'auth/requires-recent-login':
                return 'This action is sensitive and requires recent authentication. Please sign in again before retrying.';
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

    const updateUserProfile = async (displayName: string): Promise<string | null> => {
        const user = auth.currentUser;
        if (!user) {
            return "No user is signed in.";
        }

        try {
            // Update Firebase Auth profile
            await updateProfile(user, { displayName });

            // Update Firestore document
            const userRef = doc(firestore, "users", user.uid);
            await setDoc(userRef, { displayName }, { merge: true });

            return null;
        } catch (error: any) {
            console.error("Error updating profile: ", error);
            return getFirebaseErrorMessage(error.code) || "An unexpected error occurred.";
        }
    };

    const updateUserEmail = async (newEmail: string, currentPassword: string): Promise<string | null> => {
        const user = auth.currentUser;
        if (!user || !user.email) {
            return "No user is currently signed in or user has no email.";
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            
            await firebaseUpdateEmail(user, newEmail);
            
            const userRef = doc(firestore, "users", user.uid);
            await setDoc(userRef, { email: newEmail }, { merge: true });

            return null;
        } catch (error: any) {
            console.error("Error updating email:", error);
            return getFirebaseErrorMessage(error.code);
        }
    };

    const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<string | null> => {
        const user = auth.currentUser;
        if (!user || !user.email) {
            return "No user is currently signed in or user has no email.";
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await firebaseUpdatePassword(user, newPassword);
            return null;
        } catch (error: any) {
            console.error("Error updating password:", error);
            return getFirebaseErrorMessage(error.code);
        }
    };

    return { 
        signInWithGoogle, 
        signOut, 
        signInWithEmailPassword, 
        signUpWithEmailPassword, 
        updateUserProfile,
        updateUserEmail,
        updateUserPassword
    };
}

// Custom hook to memoize Firebase queries
function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}


export { useUser, useCollection, useDoc, useMemoFirebase, useAuthActions as useAuth };
export { FirebaseProvider } from './provider';
export { FirebaseClientProvider } from './client-provider';
