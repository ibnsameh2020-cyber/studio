"use client";
import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData, collection } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T>(path: string, q?: Query) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If firestore isn't ready, or the path is invalid, do nothing.
    if (!firestore || !path) {
      // If firestore is ready but path isn't, we're not loading.
      if (firestore) {
        setLoading(false);
        setData(null);
      }
      return;
    }
    
    // Set loading to true at the start of any query execution.
    setLoading(true);

    const queryToRun = q || collection(firestore, path);

    const unsubscribe = onSnapshot(queryToRun, (snapshot) => {
      try {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
        setData(result);
        setError(null);
      } catch (e: any) {
        console.error("Firestore onSnapshot error:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }, (err) => {
        console.error("Firestore onSnapshot error:", err);
        setError(err);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, path, q]); // Depend directly on the inputs

  return { data, loading, error };
}
