"use client";

import { useState, useEffect, useCallback } from 'react';

type TypingEffectOptions = {
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
};

export function useTypingEffect(
  texts: string[],
  {
    loop = true,
    typeSpeed = 100,
    deleteSpeed = 50,
    delay = 1500,
  }: TypingEffectOptions = {}
) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const handleTyping = useCallback(() => {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        if (textIndex === texts.length - 1 && !loop) {
          return; 
        }
      }
    } else {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => setIsDeleting(true), delay);
      }
    }
  }, [charIndex, isDeleting, textIndex, texts, delay, loop]);

  useEffect(() => {
    if (textIndex === texts.length && !loop) {
        return; // Stop the effect if not looping and all texts have been typed
    }
    const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, handleTyping, isDeleting, typeSpeed, deleteSpeed, textIndex, loop, texts.length]);

  return displayedText;
}
