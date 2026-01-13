"use client";

import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type LikeButtonProps = {
  projectId: string;
};

export default function LikeButton({ projectId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const projectLikesRef = ref(rtdb, `likes/${projectId}`);
    const unsubscribe = onValue(projectLikesRef, (snapshot) => {
      const data = snapshot.val();
      setLikes(data?.count || 0);
    });

    const likedStatus = localStorage.getItem(`liked-${projectId}`);
    if (likedStatus === 'true') {
      setIsLiked(true);
    }

    return () => unsubscribe();
  }, [projectId]);

  const handleLike = useCallback(() => {
    if (isAnimating) return;

    const projectLikesRef = ref(rtdb, `likes/${projectId}`);
    const newLikedState = !isLiked;

    setIsLiked(newLikedState);
    setIsAnimating(true);
    
    // Optimistic UI update
    setLikes(prevLikes => newLikedState ? prevLikes + 1 : prevLikes - 1);

    runTransaction(projectLikesRef, (currentData) => {
      if (!currentData) {
        return { count: 1 };
      }
      currentData.count = newLikedState ? currentData.count + 1 : Math.max(0, currentData.count - 1);
      return currentData;
    }).then(() => {
        if(newLikedState) {
            localStorage.setItem(`liked-${projectId}`, 'true');
        } else {
            localStorage.removeItem(`liked-${projectId}`);
        }
    }).catch(() => {
        // Revert optimistic update on error
        setLikes(prevLikes => newLikedState ? prevLikes - 1 : prevLikes + 1);
        setIsLiked(!newLikedState);
    }).finally(() => {
      setTimeout(() => setIsAnimating(false), 500);
    });

  }, [isLiked, projectId, isAnimating]);

  return (
    <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-2">
      <Heart className={cn(
        "w-5 h-5 transition-all duration-300", 
        isLiked ? "text-red-500 fill-current" : "text-muted-foreground",
        isAnimating && isLiked ? "animate-ping" : ""
      )} />
      <span className="text-sm font-medium text-muted-foreground tabular-nums">{likes}</span>
    </Button>
  );
}
