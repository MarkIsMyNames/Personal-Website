export enum SectionId {
  About = 'about',
  Skills = 'skills',
  Projects = 'projects',
  Contact = 'contact',
}

export enum AriaRole {
  Article = 'article',
  Button = 'button',
  Dialog = 'dialog',
  List = 'list',
  ListItem = 'listitem',
  Menu = 'menu',
  MenuItem = 'menuitem',
  Navigation = 'navigation',
}

export const KeyboardKey = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
} as const;

export type Skill = {
  name: string;
  iconName: string;
};

export type Project = {
  title: string;
  role: string;
  description: string;
  highlights: string[];
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
