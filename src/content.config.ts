import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    sideImage: z.string().optional(),
    category: z.string().optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),
  }),
});

const chi_siamo = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/chi_siamo" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    sideImage: z.string().optional(),
    mainImage: z.string().optional(),
  }),
});

const shows = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/shows" }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    posterImage: z.string().optional(), // Reso optional per evitare blocchi se manca in un file
    order: z.number().optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    image: z.string().optional(), // Reso optional
    order: z.number().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    venue: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    time: z.string().optional(),
    order: z.number().optional(),
  }),
});

const navigation = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/navigation" }),
  schema: z.object({
    items: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          href: z.string(),
          parentId: z.string().optional(),
          order: z.number().optional(),
          external: z.boolean().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  posts,
  chi_siamo,
  shows,
  people,
  events,
  navigation,
};