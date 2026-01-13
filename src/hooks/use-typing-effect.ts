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
  const [isFinished, setIsFinished] = useState(false);

  const handleTyping = useCallback(() => {
    if (isFinished) return;

    const currentText = texts[textIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(false);
        const nextTextIndex = (textIndex + 1);
        if (nextTextIndex >= texts.length && !loop) {
          setIsFinished(true);
          return;
        }
        setTextIndex(nextTextIndex % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        if (!loop && textIndex === texts.length - 1) {
            setIsFinished(true);
            return;
        }
        setTimeout(() => setIsDeleting(true), delay);
      }
    }
  }, [charIndex, isDeleting, textIndex, texts, delay, loop, isFinished]);

  useEffect(() => {
    if (isFinished) return;

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, handleTyping, isDeleting, typeSpeed, deleteSpeed, isFinished]);

  return displayedText;
}
