import { ImmersiveCategory } from '../types';

export interface ImmersiveCategoryMeta {
  key: ImmersiveCategory;
  label: string;
  count: number;
  freeCount: number;
  path: string;
  heading: string;
  eyebrow: string;
  blurb: string;
  lede: string;
}

export const IMMERSIVE_CATEGORIES: ImmersiveCategoryMeta[] = [
  {
    key: 'all',
    label: 'All Prompts',
    count: 683,
    freeCount: 35,
    path: '/prompts',
    heading: 'Immersive Website & 3D Prompts',
    eyebrow: '683 Immersive AI Prompts',
    blurb: 'Production-ready 3D scenes, full templates, sections, backdrops & gradients.',
    lede: 'Comprehensive AI design prompts for Claude, Cursor, GPT & v0 — copy the prompt, rebuild in your own stack.'
  },
  {
    key: 'template',
    label: 'Templates',
    count: 59,
    freeCount: 11,
    path: '/templates',
    heading: 'Immersive website prompts',
    eyebrow: 'New templates arrive weekly',
    blurb: 'Full pages and heroes, ready to ship.',
    lede: 'Complete, production-grade page and hero templates — copy the prompt, get the build.'
  },
  {
    key: '3d_scene',
    label: '3D Scenes',
    count: 114,
    freeCount: 12,
    path: '/3d-scenes',
    heading: '3D scene prompts',
    eyebrow: 'New scenes arrive weekly',
    blurb: 'Real-time WebGL scenes and shader fields.',
    lede: 'Interactive 3D scenes built in real-time WebGL — particles, fluids, terrain and space.'
  },
  {
    key: 'section',
    label: 'Sections',
    count: 10,
    freeCount: 2,
    path: '/sections',
    heading: 'Interactive section prompts',
    eyebrow: 'New sections arrive weekly',
    blurb: 'Drop-in page sections with their own motion.',
    lede: 'Self-contained page sections — features, carousels, roadmaps and loaders — each with its own motion.'
  },
  {
    key: 'background',
    label: 'Backgrounds',
    count: 476,
    freeCount: 8,
    path: '/backgrounds',
    heading: 'Animated background prompts',
    eyebrow: 'New backgrounds arrive weekly',
    blurb: 'Animated and still backdrops.',
    lede: 'Animated and static backdrops — landscapes, abstract glass, particles, cosmic and molecular.'
  },
  {
    key: 'gradient',
    label: 'Gradients',
    count: 24,
    freeCount: 2,
    path: '/gradients',
    heading: 'Interactive gradient prompts',
    eyebrow: 'New gradients arrive weekly',
    blurb: 'Interactive gradients in pure WebGL.',
    lede: 'Animated, pointer-interactive gradients drawn in pure WebGL — no libraries, no video.'
  }
];

