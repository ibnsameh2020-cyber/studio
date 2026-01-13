'use server';
/**
 * @fileOverview A flow for processing contact form submissions.
 *
 * This file defines a Genkit flow that takes contact form data,
 * saves it to Firestore, and is designed to be extended to send
 * an email notification.
 *
 * - processContactRequest - The main function to handle the contact request.
 * - ContactRequest - The TypeScript type for the contact form input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Client-side Type and Schema ---
const ContactRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});
export type ContactRequest = z.infer<typeof ContactRequestSchema>;


// --- Server-side Firebase Initialization ---
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for the server-side flow environment
const app = !getApps().length ? initializeApp(firebaseConfig, "genkit-firebase") : getApp("genkit-firebase");
const db = getFirestore(app);


// --- Exported Functions ---

// Exported wrapper function to be called from the client.
export async function processContactRequest(
  input: ContactRequest
): Promise<void> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactRequestSchema,
    outputSchema: z.void(),
  },
  async (data) => {
    // Save the contact submission to Firestore.
    // This now uses the correctly initialized 'db' instance for the server.
    await addDoc(collection(db, 'contacts'), {
      ...data,
      submittedAt: serverTimestamp(),
    });

    // TODO: Add email sending logic here.
    console.log(
      `Contact form submission from ${data.name} <${data.email}> saved.`
    );
    console.log(`Message: ${data.message}`);
  }
);