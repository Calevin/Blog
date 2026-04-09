import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    section: z.enum([
      "01_INPUT",
      "02_OUTPUT",
      "03_MY_SERVER",
      "04_MY_SETUP",
      "05_IA",
    ]),
  }),
});

export const collections = { blog };
