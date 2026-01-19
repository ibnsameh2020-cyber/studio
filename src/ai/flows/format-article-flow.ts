
'use server';
/**
 * @fileOverview An AI flow to automatically structure article content.
 *
 * - formatArticle - A function that takes raw text and converts it to a structured format.
 * - FormatArticleInput - The input type for the formatArticle function.
 * - FormatArticleOutput - The return type for the formatArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatArticleInputSchema = z.object({
  content: z.string().describe('The raw, unformatted blog post content.'),
});
export type FormatArticleInput = z.infer<typeof FormatArticleInputSchema>;

const ContentBlockSchema = z.object({
  type: z.enum(['h1', 'h2', 'p', 'blockquote', 'list']),
  content: z.union([z.string(), z.array(z.string())]),
});

const FormatArticleOutputSchema = z.object({
  structuredContent: z.array(ContentBlockSchema).describe('The structured content of the article.'),
});
export type FormatArticleOutput = z.infer<typeof FormatArticleOutputSchema>;

export async function formatArticle(input: FormatArticleInput): Promise<FormatArticleOutput> {
  return formatArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'formatArticlePrompt',
  input: {schema: FormatArticleInputSchema},
  output: {schema: FormatArticleOutputSchema},
  prompt: `You are an expert web content stylist and structural analyst. Your task is to take raw text content for a blog post and convert it into a structured JSON format, while also applying inline styling.

You must analyze the text and break it down into an array of content blocks. Each block should have a 'type' and 'content'.

**Block Types & Rules:**
- 'h1': For main section headers. These are major titles in the article.
- 'h2': For sub-headers. These are secondary titles within a main section.
- 'p': For a standard paragraph of text.
- 'blockquote': For an impactful "pull quote" that should be emphasized. Use this sparingly.
- 'list': For a numbered or bulleted list. The 'content' for this type **must** be an array of strings, with each string being a single list item.
- **IMPORTANT**: Do NOT confuse a numbered list (e.g., "1. First item, 2. Second item") with a header. A header is a title for a section, not part of a sequence of items.

**Inline Styling Rules:**
- For **bold** text to emphasize key terms, wrap the text in double asterisks. Example: "This is a **very important** point."
- For *italic* text for subtle emphasis, wrap the text in single asterisks. Example: "The concept of *deja vu*."

**Output Format:**
- Your final output must be a valid JSON object with a single key "structuredContent" containing the array of blocks.
- For 'list' types, the \`content\` property is an array of strings. For all other types, it is a single string.

**Example:**
Raw Content:
"Introduction to Gardening. A *rewarding* hobby. Getting Started. To start, you will need a few things: 1. Good soil. 2. Sunlight (which is **very important**). 3. Water."

Expected JSON Output:
{
  "structuredContent": [
    { "type": "h1", "content": "Introduction to Gardening" },
    { "type": "p", "content": "A *rewarding* hobby." },
    { "type": "h2", "content": "Getting Started" },
    { "type": "p", "content": "To start, you will need a few things:" },
    { "type": "list", "content": ["Good soil.", "Sunlight (which is **very important**).", "Water."] }
  ]
}

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
    try {
      const {output} = await prompt(input);
      if (!output || !output.structuredContent || output.structuredContent.length === 0) {
        throw new Error("AI returned empty or invalid content.");
      }
      return output;
    } catch (error) {
      console.error("AI content formatting failed.", error);
      // If AI call fails or returns empty, throw an error to be handled by the caller.
      throw new Error("The AI Stylist was unable to process the content. Please try again.");
    }
  }
);
