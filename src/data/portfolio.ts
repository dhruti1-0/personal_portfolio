export type LearningCategory = 'All' | 'Languages' | 'Web' | 'Core CS' | 'Tooling';

export interface LearningArea {
  id: string;
  name: string;
  category: Exclude<LearningCategory, 'All'>;
  focus: string;
}

export const PROFILE = {
  name: 'Dhruti Deepan Pradhan',
  shortName: 'Dhruti Pradhan',
  headline: 'Turning curiosity into things that work.',
  roleSummary: 'B.Tech Student at Jain University',
  heroDescription:
    'A technology student focused on programming, problem-solving, and software development—building clear foundations across systems logic and modern web interfaces.',
  aboutParagraphs: [
    'I am a Bachelor of Technology student at Jain University with a steady interest in how software systems are designed, reasoned about, and built from first principles.',
    'My academic focus revolves around programming, structured problem-solving, and picking up new technical skills through hands-on experimentation—from low-level memory concepts in C to clean web interfaces and Python-backed APIs.',
  ],
  education: {
    institution: 'Jain University',
    degree: 'Bachelor of Technology',
    status: 'Currently Pursuing',
    focusNote:
      'Undergraduate coursework centered on programming fundamentals, data structures, and software engineering principles.',
  },
} as const;

export const LEARNING_CATEGORIES: readonly LearningCategory[] = [
  'All',
  'Languages',
  'Web',
  'Core CS',
  'Tooling',
] as const;

export const LEARNING_AREAS: readonly LearningArea[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    focus: 'Scripting, structured problem-solving, and backend API fundamentals.',
  },
  {
    id: 'c-programming',
    name: 'C Programming',
    category: 'Languages',
    focus: 'Procedural logic, pointers, memory layout, and core syntax.',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Web',
    focus: 'Semantic document structure, accessibility landmarks, and clean markup.',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Web',
    focus: 'Responsive layouts, grid and flexbox architecture, and visual hierarchy.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web',
    focus: 'Client-side interactivity, asynchronous requests, and application state.',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    category: 'Core CS',
    focus: 'Arrays, linked lists, stacks, queues, trees, and foundational complexity.',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'Core CS',
    focus: 'Breaking down requirements into clear, testable algorithmic steps.',
  },
  {
    id: 'git-github',
    name: 'Git and GitHub',
    category: 'Tooling',
    focus: 'Version history, branching workflows, and collaborative code management.',
  },
] as const;
