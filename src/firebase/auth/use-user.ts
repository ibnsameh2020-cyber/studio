
"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        
        const ADMIN_EMAILS = ["ibn.sameh.2020@gmail.com", "same7mousa@gmail.com"];
        if (user.email && ADMIN_EMAILS.includes(user.email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      } else {
        // No user, sign in anonymously. The listener will re-run with the new user.
        signInAnonymously(auth).catch(error => {
          console.error("Anonymous sign in failed:", error);
          setLoading(false); // Ensure loading completes even if anon sign-in fails
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, isAdmin };
}
