export enum SkillCategory {
  Language = 'language',
  Framework = 'framework',
  Concept = 'concept',
  Technology = 'technology',
}

export type Skill = {
  name: string;
  iconName: string;
  category: SkillCategory;
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
