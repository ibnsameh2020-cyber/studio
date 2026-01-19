'use server';
/**
 * @fileOverview A simple AI flow to format resource content.
 * - formatContent - Takes raw text and returns it with basic HTML styling.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ArticleFormatInputSchema = z.object({
    content: z.string().describe('The raw, unformatted text of the article.'),
});

const ArticleFormatOutputSchema = z.object({
    formattedContent: z.string().describe('The article content formatted with simple HTML tags for styling (e.g., <h2>, <h3>, <p>, <strong>, <em>).'),
});

const prompt = ai.definePrompt({
  name: 'formatArticlePrompt',
  input: { schema: ArticleFormatInputSchema },
  output: { schema: ArticleFormatOutputSchema },
  prompt: `You are an expert content styler. Your task is to format the given text into a clean, readable HTML format.

  Use the following guidelines:
  - Wrap paragraphs in <p> tags.
  - Identify main topics and use <h2> for their headings.
  - Use <h3> for sub-headings where appropriate.
  - Use <strong> for bolding key terms and sentences for emphasis.
  - Use <em> for italicizing words that need a different tone.
  - Do not add any classes or inline styles to the HTML tags.
  - Ensure the output is a single string of valid HTML.
  - Do not add a title for the whole article. The content provided is just the body.

  Here is the content to format:
  {{{content}}}
  `,
  config: {
    model: 'gemini-2.5-flash-lite',
  },
});

const formatArticleFlow = ai.defineFlow(
  {
    name: 'formatArticleFlow',
    inputSchema: ArticleFormatInputSchema,
    outputSchema: ArticleFormatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate formatted content.");
    }
    return output;
  }
);

export async function formatContent(content: string): Promise<string> {
    const result = await formatArticleFlow({ content });
    return result.formattedContent;
}
