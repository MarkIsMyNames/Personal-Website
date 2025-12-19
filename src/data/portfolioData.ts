import type { Skill, Project, Profile } from '../types';

// Profile data
export const profile: Profile = {
  id: '1',
  name: 'Mark Drohan',
  title: 'Software Engineer',
  bio: 'Immersive Software Engineering student at the University of Limerick, graduating in 2027. Interested in mathematics, AI, and algorithm design. Outside of coding, I like playing chess, hurling and archery.',
  image: 'Personal Profile.jpg',
  email: 'MarkDrohan@protonmail.com',
  github: 'MarkIsMyNames',
  graduationYear: 2027,
  university: 'University of Limerick',
};

// Skills data - iconName corresponds to React Icons
export const skills: Skill[] = [
  { id: '1', name: 'Java', iconName: 'FaJava', category: 'language' },
  { id: '2', name: 'Python', iconName: 'FaPython', category: 'language' },
  { id: '3', name: 'Ruby', iconName: 'DiRuby', category: 'language' },
  { id: '4', name: 'C/C++', iconName: 'SiCplusplus', category: 'language' },
  { id: '5', name: 'React', iconName: 'FaReact', category: 'framework' },
  { id: '6', name: 'Ember', iconName: 'SiEmberdotjs', category: 'framework' },
  { id: '7', name: 'JavaScript', iconName: 'IoLogoJavascript', category: 'language' },
  { id: '8', name: 'TypeScript', iconName: 'SiTypescript', category: 'language' },
  { id: '9', name: 'MCP Servers', iconName: 'FaServer', category: 'tool' },
  { id: '10', name: 'Object-Oriented Programming', iconName: 'BiCodeBlock', category: 'tool' },
  { id: '11', name: 'Linux', iconName: 'FaLinux', category: 'tool' },
  { id: '12', name: 'Data Structures', iconName: 'AiOutlineDatabase', category: 'tool' },
];

// Projects data with embedded highlights
export const projects: Project[] = [
  {
    id: '1',
    title: 'Intercom',
    role: 'Software Engineer - Messenger Team',
    description:
      'Worked on the Messenger team at Intercom, maintaining a platform used by thousands of businesses daily. Contributed to both backend and frontend development while winning multiple internal hackathons building innovative AI-powered tools.',
    highlights: [
      {
        id: '1',
        text: 'Implemented custom emoji support across both backend and frontend systems',
        orderIndex: 0,
      },
      {
        id: '2',
        text: 'Contributed to code refactoring and resolved multiple P1 production incidents',
        orderIndex: 1,
      },
      {
        id: '3',
        text: 'Won hackathon by building an AI-powered incident resolver using GitHub Actions, Honeycomb, and Sentry MCPs to automatically debug and fix production issues',
        orderIndex: 2,
      },
      {
        id: '4',
        text: 'Won second hackathon by developing a real-time voice transcription feature for our web messenger',
        orderIndex: 3,
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
    orderIndex: 0,
  },
  {
    id: '2',
    title: 'NASA Space Apps Challenge',
    role: 'Team Lead - 3rd Place Winner',
    description:
      'Led a team to 3rd place in the NASA Space Apps Challenge in Athlone. Developed a solution for displaying and navigating multi-gigabyte/terabyte images online, enabling simplified exploration of Mars surface imagery and deep space photographs.',
    highlights: [
      {
        id: '5',
        text: 'Secured 3rd place out of over 300 participants',
        orderIndex: 0,
      },
      {
        id: '6',
        text: 'Led the technical direction and kept the team on track',
        orderIndex: 1,
      },
      {
        id: '7',
        text: 'Figured out how to render multi-gigabyte images with smooth panning and no loading delays',
        orderIndex: 2,
      },
      {
        id: '8',
        text: 'Built a web scraper to generate large-scale test images for performance validation',
        orderIndex: 3,
      },
      {
        id: '9',
        text: 'Optimised rendering to minimise server load and browser memory usage',
        orderIndex: 4,
      },
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
    orderIndex: 1,
  },
  {
    id: '3',
    title: 'Kepler',
    role: 'CEO & Co-Founder - Hult Prize',
    description:
      'Co-founded Kepler, a climate-tech startup focused on developing autonomous ocean farming systems. Led the design of AI-powered underwater robots for planting and harvesting kelp for food and nutrient supplements, then pitching this venture at the Hult Prize competition.',
    highlights: [
      {
        id: '10',
        text: 'Co-founded and led the business as CEO',
        orderIndex: 0,
      },
      {
        id: '11',
        text: 'Designed autonomous underwater robots with AI-powered navigation',
        orderIndex: 1,
      },
      {
        id: '12',
        text: 'Developed a go-to-market strategy and created a financial model with revenue projections',
        orderIndex: 2,
      },
      {
        id: '13',
        text: 'Pitched our idea to the judges at Hult Prize competition, securing top 6 spot in Ireland',
        orderIndex: 3,
      },
    ],
    images: ['Hult 1.jpg', 'Hult 2.jpg', 'Hult 3.jpg'],
    tags: [
      'Python',
      'AI/ML',
      'Robotics',
      'Entrepreneurship',
      'Climate Tech',
      'Business Strategy',
      'Sustainability',
    ],
    orderIndex: 2,
  },
  {
    id: '4',
    title: 'HackJunction - Finland',
    role: 'AI Hackathon Participant',
    description:
      "Participated in HackJunction, the world's largest AI hackathon, held in Helsinki, Finland. Developed a personal finance management tool that uses machine learning to analyse spending patterns and generate personalised financial recommendations based on individual user behavior.",
    highlights: [
      {
        id: '14',
        text: 'Competed in international AI hackathon with over 1500 participants',
        orderIndex: 0,
      },
      {
        id: '15',
        text: 'Built AI-powered personal finance tool to manage expenses',
        orderIndex: 1,
      },
      {
        id: '16',
        text: 'Implemented machine learning models to identify spending patterns and predict future expenses',
        orderIndex: 2,
      },
      {
        id: '17',
        text: 'Created personalised recommendation system to help users improve their financial decisions',
        orderIndex: 3,
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
    orderIndex: 3,
  },
  {
    id: '5',
    title: 'Breaking Barriers Hackathon',
    role: 'Security Research & AI Development',
    description:
      'Developing an AI-powered penetration testing tool at the AWS Telco Hackathon (Breaking Barriers). The system used MCP servers to gather intelligence from LinkedIn, Instagram, and Facebook, then applied AI to generate phishing scenarios.',
    highlights: [
      {
        id: '18',
        text: 'Built automated penetration testing tool to demonstrate AI-powered security assessment techniques',
        orderIndex: 0,
      },
      {
        id: '19',
        text: 'Integrated MCP servers to collect OSINT data (Data gathered from public sources) from multiple social media platforms',
        orderIndex: 1,
      },
      {
        id: '20',
        text: 'Developed AI-powered phishing simulation tool for security awareness training',
        orderIndex: 2,
      },
      {
        id: '21',
        text: 'Trained an AI to create highly sophisticated phishing emails',
        orderIndex: 3,
      },
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
    orderIndex: 4,
  },
];
