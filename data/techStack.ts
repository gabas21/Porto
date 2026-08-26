export interface TechItem {
  name: string;
  category: 'Frontend Core' | 'UI Frameworks' | 'UI/UX & Design' | 'Backend & API' | 'Tools & AI';
  description: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  icon: string;
}

export const techStack: TechItem[] = [
  {
    name: 'Tailwind CSS & PostCSS',
    category: 'UI Frameworks',
    description: 'Design system scaling, custom tokens, fluid typography, dan responsive mobile-first layouts.',
    proficiency: 'Expert',
    icon: 'tailwindcss'
  },
  {
    name: 'Next.js & React.js',
    category: 'UI Frameworks',
    description: 'App Router, Server Components, SSR/SSG, dynamic state management, dan komponen modular.',
    proficiency: 'Advanced',
    icon: 'nextjs'
  },
  {
    name: 'HTML5 & JavaScript (ES6+)',
    category: 'Frontend Core',
    description: 'Semantik HTML5, async/await, DOM APIs, WebRTC Camera QR Scanner, dan event handling.',
    proficiency: 'Expert',
    icon: 'javascript'
  },
  {
    name: 'Blade Templating (Laravel)',
    category: 'Frontend Core',
    description: 'Slicing UI dari Figma ke komponen Blade modular, semantik, dan terintegrasi data dinamis.',
    proficiency: 'Advanced',
    icon: 'laravel'
  },
  {
    name: 'Figma (UI/UX Design)',
    category: 'UI/UX & Design',
    description: 'Design Slicing 100% fidelitas visual, Design System, Prototyping, dan Mobile-First Design.',
    proficiency: 'Expert',
    icon: 'figma'
  },
  {
    name: 'PHP & Laravel Ecosystem',
    category: 'Backend & API',
    description: 'RESTful API integration, routing, controller logic, dan arsitektur web modern Laravel.',
    proficiency: 'Advanced',
    icon: 'laravel'
  },
  {
    name: 'MySQL & Supabase',
    category: 'Backend & API',
    description: 'JSON data handling, relational database schema, realtime subscription, dan authentication.',
    proficiency: 'Advanced',
    icon: 'supabase'
  },
  {
    name: 'Git & GitHub Workflow',
    category: 'Tools & AI',
    description: 'Feature branching, Pull Requests (PRs), code reviews, version control, dan alur kerja kolaboratif.',
    proficiency: 'Advanced',
    icon: 'git'
  },
  {
    name: 'Postman & Vite / NPM',
    category: 'Tools & AI',
    description: 'API testing & contract validation, rapid bundling Vite, dan manajemen package dependency.',
    proficiency: 'Advanced',
    icon: 'typescript'
  },
  {
    name: 'AI-Assisted Dev (Antigravity/Cursor)',
    category: 'Tools & AI',
    description: 'Workflow pengembangan cerdas dengan AI coding assistants (Antigravity, Cursor, Windsurf, OpenCode).',
    proficiency: 'Expert',
    icon: 'react'
  }
];
