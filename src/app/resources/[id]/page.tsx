
"use client";

import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { notFound, useParams } from 'next/navigation';
import ResourceDetailsClient from './resource-details-client';
import { useEffect, useState } from 'react';
import { Resource } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function ResourceDetailsPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !id) return;

    const getResource = async () => {
      const resourceId = Array.isArray(id) ? id[0] : id;
      const docRef = doc(firestore, 'resources', resourceId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setResource(docSnap.data() as Resource);
      } else {
        notFound();
      }
      setLoading(false);
    };

    getResource();
  }, [firestore, id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return notFound();
  }

  return <ResourceDetailsClient resource={resource} />;
}
