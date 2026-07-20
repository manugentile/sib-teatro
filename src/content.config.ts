import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    sideImage: z.string().optional(),
    mainImage: z.string().optional(),
  }),
});

const shows = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    posterImage: z.string(),
    order: z.number().optional(),
  }),
});

const people = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    image: z.string(),
    order: z.number().optional(),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    date: z.union([z.string(), z.date()]),
    time: z.string(),
    order: z.number().optional(),
  }),
});

const navigation = defineCollection({
  type: "data",
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
