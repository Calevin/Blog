import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dateSchema = z.string().or(z.date()).transform((val) => {
  if (val instanceof Date) return val;
  // Handle DD-MM-YYYY or DD/MM/YYYY with optional HH:mm
  const match = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/.exec(val);
  if (match) {
    const [_, day, month, year, hour = "00", minute = "00"] = match;
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`);
  }
  return new Date(val);
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: dateSchema,
    updatedDate: dateSchema.optional(),
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
