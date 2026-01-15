
"use client";
import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T>(path: string, q?: Query) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = q || collection(firestore, path);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      try {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
        setData(result);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    }, (err) => {
        setError(err);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, path, q]);

  return { data, loading, error };
}
