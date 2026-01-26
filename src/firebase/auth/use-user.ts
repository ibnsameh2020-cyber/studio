
"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAnonymous(user.isAnonymous);
        
        const ADMIN_EMAILS = ["ibn.sameh.2020@gmail.com", "same7mousa@gmail.com"];
        if (user.email && ADMIN_EMAILS.includes(user.email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      } else {
        signInAnonymously(auth).catch((error) => {
            console.error("Anonymous sign-in failed:", error);
            setUser(null);
            setIsAdmin(false);
            setIsAnonymous(false);
            setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, isAdmin, isAnonymous };
}
