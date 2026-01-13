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
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const ContactRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;

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
