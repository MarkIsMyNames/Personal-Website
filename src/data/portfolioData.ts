import { SkillCategory, type Skill, type Project, type Profile } from '../types';

export const profile: Profile = {
  name: 'Mark Drohan',
  title: 'Software Engineer',
  bio: 'Immersive Software Engineering student at the University of Limerick, graduating in 2027. Interested in mathematics, AI, and algorithm design. Outside of coding, I like playing chess, hurling and archery.',
  image: 'Personal Profile.jpg',
  email: 'MarkDrohan@protonmail.com',
  github: 'MarkIsMyNames',
  graduationYear: 2027,
  university: 'University of Limerick',
};

// Ordered by category: languages, frameworks, concepts, technologies
export const skills: Skill[] = [
  { name: 'Java', iconName: 'FaJava', category: SkillCategory.Language },
  { name: 'Kotlin', iconName: 'SiKotlin', category: SkillCategory.Language },
  { name: 'JavaScript', iconName: 'IoLogoJavascript', category: SkillCategory.Language },
  { name: 'TypeScript', iconName: 'SiTypescript', category: SkillCategory.Language },
  { name: 'Python', iconName: 'FaPython', category: SkillCategory.Language },
  { name: 'C/C++', iconName: 'SiCplusplus', category: SkillCategory.Language },
  { name: 'Ruby', iconName: 'DiRuby', category: SkillCategory.Language },
  { name: 'SQL', iconName: 'FaDatabase', category: SkillCategory.Language },
  { name: 'React', iconName: 'FaReact', category: SkillCategory.Framework },
  { name: 'Ember', iconName: 'SiEmberdotjs', category: SkillCategory.Framework },
  { name: 'Object-Oriented Programming', iconName: 'BiCodeBlock', category: SkillCategory.Concept },
  { name: 'Data Structures', iconName: 'AiOutlineDatabase', category: SkillCategory.Concept },
  { name: 'Algorithmic Design', iconName: 'FaProjectDiagram', category: SkillCategory.Concept },
  { name: 'Mobile Development', iconName: 'FaMobileAlt', category: SkillCategory.Technology },
  { name: 'MCP Servers', iconName: 'FaServer', category: SkillCategory.Technology },
  { name: 'Linux', iconName: 'FaLinux', category: SkillCategory.Technology },
];

// Projects data with embedded highlights
export const projects: Project[] = [
  {
    title: 'Intercom',
    role: 'Software Engineer - Messenger Team',
    description:
      'Worked on the Messenger team at Intercom, maintaining a platform used by thousands of businesses daily. Contributed to both backend and frontend development while winning multiple internal hackathons building innovative AI-powered tools.',
    highlights: [
      { text: 'Implemented custom emoji support across both backend and frontend systems' },
      { text: 'Contributed to code refactoring and resolved multiple P1 production incidents' },
      {
        text: 'Won hackathon by building an AI-powered incident resolver using GitHub Actions, Honeycomb, and Sentry MCPs to automatically debug and fix production issues',
      },
      {
        text: 'Won second hackathon by developing a real-time voice transcription feature for our web messenger',
      },
    ],
    images: ['Intercom.png'],
    tags: [
      'Ember.js',
      'JavaScript',
      'TypeScript',
      'Ruby',
      'AI/ML',
      'MCP Servers',
      'GitHub Actions',
      'Voice Recognition',
    ],
  },
  {
    title: 'Ganzy',
    role: 'Senior Lead Developer',
    description:
      'Built the frontend for Ganzy, an AI-powered study planner startup for Irish Leaving Cert students. The platform decomposes subjects into microskills and uses AI to create personalised study schedules, helping students focus on the areas that will gain them the most points in the Leaving Cert.',
    highlights: [
      {
        text: 'Led a team in architecting and building the frontend pages',
      },
      {
        text: 'Built interactive study scheduling interface that visualises personalised AI-generated study plans',
      },
      {
        text: 'Designed with scalability in mind as the platform plans to expand beyond Ireland to the US market',
      },
    ],
    images: ['Ganzy.png'],
    tags: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'AI/ML',
      'EdTech',
      'Startup',
      'UI/UX Design',
    ],
  },
  {
    title: 'NASA Space Apps Challenge',
    role: 'Team Lead - 3rd Place Winner',
    description:
      'Led a team to 3rd place in the NASA Space Apps Challenge in Athlone. Developed a solution for displaying and navigating multi-gigabyte/terabyte images online, enabling simplified exploration of Mars surface imagery and deep space photographs.',
    highlights: [
      { text: 'Secured 3rd place out of over 300 participants' },
      { text: 'Led the technical direction and kept the team on track' },
      {
        text: 'Figured out how to render multi-gigabyte images with smooth panning and no loading delays',
      },
      {
        text: 'Built a web scraper to generate large-scale test images for performance validation',
      },
      { text: 'Optimised rendering to minimise server load and browser memory usage' },
    ],
    images: ['NASA1.jpg', 'NASA2.jpg', 'NASA3.jpg'],
    tags: [
      'TypeScript',
      'Python',
      'Image Processing',
      'Web Development',
      'Performance Optimisation',
      'Team Leadership',
      'Algorithm Design',
    ],
  },
  {
    title: 'Kepler',
    role: 'CEO & Co-Founder - Hult Prize',
    description:
      'Co-founded Kepler, a climate-tech startup focused on developing autonomous ocean farming systems. Led the design of AI-powered underwater robots for planting and harvesting kelp for food and nutrient supplements, then pitching this venture at the Hult Prize competition.',
    highlights: [
      { text: 'Co-founded and led the business as CEO' },
      { text: 'Designed autonomous underwater robots with AI-powered navigation' },
      {
        text: 'Developed a go-to-market strategy and created a financial model with revenue projections',
      },
      {
        text: 'Pitched our idea to the judges at Hult Prize competition, securing top 6 spot in Ireland',
      },
    ],
    images: ['Hult 1.jpg', 'Hult 2.png', 'Hult 3.jpg'],
    tags: [
      'Python',
      'AI/ML',
      'Robotics',
      'Entrepreneurship',
      'Climate Tech',
      'Business Strategy',
      'Sustainability',
    ],
  },
  {
    title: 'HackJunction - Finland',
    role: 'AI Hackathon Participant',
    description:
      "Participated in HackJunction, the world's largest AI hackathon, held in Helsinki, Finland. Developed a personal finance management tool that uses machine learning to analyse spending patterns and generate personalised financial recommendations based on individual user behavior.",
    highlights: [
      { text: 'Competed in international AI hackathon with over 1500 participants' },
      { text: 'Built AI-powered personal finance tool to manage expenses' },
      {
        text: 'Implemented machine learning models to identify spending patterns and predict future expenses',
      },
      {
        text: 'Created personalised recommendation system to help users improve their financial decisions',
      },
    ],
    images: ['HackJunction1.jpg', 'HackJunction2.jpg', 'HackJunction3.jpg'],
    tags: [
      'Python',
      'AI/ML',
      'Data Analysis',
      'FinTech',
      'Machine Learning',
      'Personal Finance',
      'Pattern Recognition',
    ],
  },
  {
    title: 'Breaking Barriers Hackathon',
    role: 'Security Research & AI Development',
    description:
      'Developing an AI-powered penetration testing tool at the AWS Telco Hackathon (Breaking Barriers). The system used MCP servers to gather intelligence from LinkedIn, Instagram, and Facebook, then applied AI to generate phishing scenarios.',
    highlights: [
      {
        text: 'Built automated penetration testing tool to demonstrate AI-powered security assessment techniques',
      },
      {
        text: 'Integrated MCP servers to collect OSINT data (Data gathered from public sources) from multiple social media platforms',
      },
      { text: 'Developed AI-powered phishing simulation tool for security awareness training' },
      { text: 'Trained an AI to create highly sophisticated phishing emails' },
    ],
    images: ['AWSHACK1.jpg', 'AWSHACK2.png', 'AWSHACK3.jpg'],
    tags: [
      'Python',
      'AI/ML',
      'MCP Servers',
      'Cybersecurity',
      'Penetration Testing',
      'OSINT',
      'AWS',
      'Social Engineering',
    ],
  },
];
