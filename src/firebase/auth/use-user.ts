
"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      const ADMIN_EMAIL = "ibn.sameh.2020@gmail.com";
      if (user && user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading, isAdmin };
}

// The separate useAdminStatus is no longer needed.
// This simplifies the logic and removes the race condition.
export function useAdminStatus(user: User | null) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const ADMIN_EMAIL = "ibn.sameh.2020@gmail.com";
    const isAdminEmail = user.email === ADMIN_EMAIL;
    setIsAdmin(isAdminEmail);
    setLoading(false);

  }, [user]);

  return { isAdmin, loading };
}
