export enum SectionId {
  About = 'about',
  Skills = 'skills',
  Projects = 'projects',
  Contact = 'contact',
}

export const KeyboardKey = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
};

export type Skill = {
  name: string;
  iconName: string;
};

export type ProjectHighlight = {
  text: string;
};

export type Project = {
  title: string;
  role: string;
  description: string;
  highlights: ProjectHighlight[];
  images: string[];
  tags: string[];
};

export type Profile = {
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  github: string;
  graduationYear: number;
  university: string;
};
