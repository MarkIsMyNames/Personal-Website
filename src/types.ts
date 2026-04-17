import { TYPEOF_OBJECT } from './config';

export enum ErrorMessage {
  RootElementNotFound = 'Root element not found',
  NoImageAtIndex = 'No image found at modal index',
  NoBioSentence = 'No bio sentence found in the default locale',
  NoMultiImageProject = 'No multi-image project found in the default locale',
  NoSingleImageProject = 'No single-image project found in the default locale',
  NoSkillData = 'No skill data found in the default locale',
  LocaleKeyNotFound = 'Locale key not found in default locale',
  IconNotFound = 'Icon not found in icon map',
}

export enum SectionId {
  About = 'about',
  Skills = 'skills',
  Projects = 'projects',
  Contact = 'contact',
}

export enum Field {
  Name = 'name',
  IconName = 'iconName',
  Title = 'title',
  Role = 'role',
  Description = 'description',
  Highlights = 'highlights',
  Tags = 'tags',
  Images = 'images',
}

export enum OverflowValue {
  Locked = 'hidden',
  Restored = 'unset',
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

export const WindowGlobal = {
  AddEventListener: 'addEventListener',
  RemoveEventListener: 'removeEventListener',
  ScrollTo: 'scrollTo',
  Navigator: 'navigator',
} as const;

export const HtmlTag = {
  Div: 'div',
  Img: 'img',
  Svg: 'svg',
};

export const HtmlAttr = {
  Src: 'src',
  Alt: 'alt',
  FetchPriority: 'fetchpriority',
  Href: 'href',
  Target: 'target',
  Rel: 'rel',
  AriaModal: 'aria-modal',
};

export const EnTopLevelKeys = [
  'navigation',
  'bio',
  'skills',
  'projects',
  'imageModal',
  'contact',
  'profile',
  'skillsData',
  'projectsData',
];

export const ContactMethods = ['email', 'github'];

export const DomEvent = {
  KeyDown: 'keydown',
  TouchStart: 'touchstart',
  TouchEnd: 'touchend',
  Scroll: 'scroll',
} as const;

export const KeyboardKey = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  A: 'a',
};

export const KeyCode = {
  Enter: 'Enter',
  Space: 'Space',
  KeyA: 'KeyA',
};

export type LocaleRecord = { [key: string]: LocaleValue };
export type LocaleValue = string | number | boolean | null | LocaleRecord | LocaleValue[];

export function isRecord(value: LocaleValue): value is LocaleRecord {
  return typeof value === TYPEOF_OBJECT && value !== null && !Array.isArray(value);
}

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
