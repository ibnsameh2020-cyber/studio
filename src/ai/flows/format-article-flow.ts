'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ArticleFormatInputSchema = z.object({
  content: z.string().describe('The raw, unformatted text of the article.'),
});

const ArticleFormatOutputSchema = z.object({
  formattedContent: z.string().describe('The article content formatted with engaging HTML tags.'),
});

const prompt = ai.definePrompt({
  name: 'formatArticlePrompt',
  model: 'googleai/gemini-2.5-flash-lite',
  input: { schema: ArticleFormatInputSchema },
  output: { schema: ArticleFormatOutputSchema },
  prompt: `You are an expert content styler and editor. Your task is to format the given raw text into a clean, readable, and engaging HTML format. The output should be suitable for a professional blog or resource article.

  Use the following guidelines:
  - Structure the content logically with headings and paragraphs.
  - Use <h2> for main section titles and <h3> for sub-headings.
  - Wrap all standard paragraphs in <p> tags.
  - Identify key terms, phrases, or sentences that deserve emphasis and wrap them in <strong> tags.
  - Use <em> for subtle emphasis or to introduce concepts.
  - If you identify a significant quote or a powerful statement that should stand out, wrap it in a <blockquote> tag. Inside the blockquote, place the text within a <p> tag.
  - If the text contains a list of items, format it as an unordered list (<ul>) with list items (<li>).
  - Do NOT add any classes or inline styles to the HTML tags.
  - Ensure the final output is a single, well-formed string of valid HTML.

  Here is the content to format:
  {{{content}}}
  `,
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
