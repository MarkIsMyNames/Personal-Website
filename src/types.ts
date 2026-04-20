export enum ErrorMessage {
  RootElementNotFound = 'Root element not found',
  NoImageAtIndex = 'No image found at modal index',
  IconNotFound = 'Icon not found in icon map',
}

export enum TestErrorMessage {
  NoBioSentence = 'No bio sentence found in the default locale',
  NoMultiImageProject = 'No multi-image projects found in the default locale',
  NoSingleImageProject = 'No single-image projects found in the default locale',
  NoSkillData = 'No skill data found in the default locale',
  LocaleKeyNotFound = 'Locale key not found',
  EmailLinkNoBoundingBox = 'email link has no bounding box',
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

export const AriaRole = {
  Article: 'article',
  Button: 'button',
  Dialog: 'dialog',
  List: 'list',
  ListItem: 'listitem',
  Menu: 'menu',
  MenuItem: 'menuitem',
  Navigation: 'navigation',
} as const;

export const WindowGlobal = {
  AddEventListener: 'addEventListener',
  RemoveEventListener: 'removeEventListener',
  ScrollTo: 'scrollTo',
  Navigator: 'navigator',
} as const;

export const HtmlTag = {
  A: 'a',
  Button: 'button',
  Div: 'div',
  Html: 'html',
  Img: 'img',
  Link: 'link',
  Meta: 'meta',
  Nav: 'nav',
  Svg: 'svg',
};

export const HtmlAttr = {
  Src: 'src',
  Alt: 'alt',
  FetchPriority: 'fetchpriority',
  Href: 'href',
  Target: 'target',
  Rel: 'rel',
  Lang: 'lang',
  Content: 'content',
  Name: 'name',
  TabIndex: 'tabindex',
  AriaModal: 'aria-modal',
  AriaHidden: 'aria-hidden',
  AriaLabel: 'aria-label',
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

export const Typeof = {
  Object: 'object',
  String: 'string',
  Story: 'story',
} as const;

export const LinkRel = {
  Alternate: 'alternate',
  Icon: 'icon',
  NoopenerNoreferrer: 'noopener noreferrer',
} as const;

export const Hreflang = {
  XDefault: 'x-default',
} as const;

export const LinkTarget = {
  Blank: '_blank',
} as const;

export const FetchPriority = {
  High: 'high',
} as const;

export const ScrollBehavior = {
  Smooth: 'smooth',
} as const;

export const DomEvent = {
  KeyDown: 'keydown',
  PointerDown: 'pointerdown',
  PointerUp: 'pointerup',
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
  Escape: 'Escape',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  KeyA: 'KeyA',
};

export type LocaleRecord = { [key: string]: LocaleValue };
export type LocaleValue = string | number | boolean | null | LocaleRecord | LocaleValue[];

export function isRecord(value: LocaleValue): value is LocaleRecord {
  return typeof value === Typeof.Object && value !== null && !Array.isArray(value);
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
