
"use client";
import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, Query, DocumentData, collection } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T>(path: string, q?: Query) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedQuery = useMemo(() => {
    if (!firestore || !path) return null;
    return q || collection(firestore, path);
  }, [firestore, path, q]);

  useEffect(() => {
    if (!memoizedQuery) {
        // If firestore is ready but path is not, then we are not loading.
        if (firestore) {
            setLoading(false);
        }
        return;
    }

    const unsubscribe = onSnapshot(memoizedQuery, (snapshot) => {
      try {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
        setData(result);
        setError(null);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }, (err) => {
        setError(err);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [memoizedQuery, firestore]);

  return { data, loading, error };
}
