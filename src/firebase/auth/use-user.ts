
"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin, loading: adminLoading } = useAdminStatus(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading: loading || adminLoading, isAdmin };
}

export function useAdminStatus(user: User | null) {
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // This is the admin email you specified
    const ADMIN_EMAIL = "ibn.sameh.2020@gmail.com";
    const isAdminEmail = user.email === ADMIN_EMAIL;
    setIsAdmin(isAdminEmail);
    setLoading(false);

  }, [user, firestore]);

  return { isAdmin, loading };
}
