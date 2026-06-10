import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    oneliner: z.string(),
    status: z.enum(['built', 'strategy']),
    order: z.number(),
    tags: z.array(z.string()),
    links: z.object({
      github: z.string().optional(),
      demo: z.string().optional(),
      prd: z.string().optional(),
    }).default({}),
    architectureSteps: z.array(z.string()).optional(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  }),
});

export const collections = { projects };
