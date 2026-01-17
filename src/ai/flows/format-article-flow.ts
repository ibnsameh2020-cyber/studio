'use server';
/**
 * @fileOverview An AI flow to automatically format article content for a richer presentation.
 *
 * - formatArticle - A function that takes raw text and applies stylistic markdown.
 * - FormatArticleInput - The input type for the formatArticle function.
 * - FormatArticleOutput - The return type for the formatArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatArticleInputSchema = z.object({
  content: z.string().describe('The raw, unformatted blog post content.'),
});
export type FormatArticleInput = z.infer<typeof FormatArticleInputSchema>;

const FormatArticleOutputSchema = z.object({
  formattedContent: z.string().describe('The content with special formatting markdown applied.'),
});
export type FormatArticleOutput = z.infer<typeof FormatArticleOutputSchema>;

export async function formatArticle(input: FormatArticleInput): Promise<FormatArticleOutput> {
  return formatArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'formatArticlePrompt',
  input: {schema: FormatArticleInputSchema},
  output: {schema: FormatArticleOutputSchema},
  prompt: `You are an expert web content stylist. Your task is to take raw text content for a blog post and apply special formatting to make it more visually appealing and "fancy".

You must analyze the text and apply the following formatting rules where appropriate:

1.  **Main Headers**: Identify titles or main section headers. Format them by starting the line with ".1 ", ".2 ", etc.
    Example: ".1 A New Beginning"

2.  **Sub-headers**: Identify sub-sections within a main section. Format them using a "number.number" format.
    Example: "1.1 The First Step"

3.  **Blockquotes**: Find a sentence that is impactful or serves as a great summary or "pull quote". Format it by starting the line with "> ". Use this sparingly for emphasis.
    Example: "> This is the core message of the section."

4.  **Bold Text**: Identify key terms or phrases that deserve emphasis and wrap them in double asterisks.
    Example: "This is a **very important** concept."

5.  **Italic Text**: Use italics for subtle emphasis, foreign words, or titles. Wrap the text in single asterisks.
    Example: "The concept of *deja vu* is fascinating."

Do NOT change the user's original text, only add the formatting syntax around it. Do not add any new content.
The goal is to produce a well-structured and visually interesting article. Return only the formatted text in the 'formattedContent' field.

Here is the raw content:
{{{content}}}
`,
});

const formatArticleFlow = ai.defineFlow(
  {
    name: 'formatArticleFlow',
    inputSchema: FormatArticleInputSchema,
    outputSchema: FormatArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      // If AI fails, return original content to avoid breaking the page.
      return { formattedContent: input.content };
    }
    return output;
  }
);
