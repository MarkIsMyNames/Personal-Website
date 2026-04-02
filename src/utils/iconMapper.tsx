import type { ComponentType } from 'react';
import {
  FaJava,
  FaPython,
  FaReact,
  FaLinux,
  FaServer,
  FaGithub,
  FaEnvelope,
  FaDatabase,
  FaMobileAlt,
  FaProjectDiagram,
} from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';
import {
  SiCplusplus,
  SiEmberdotjs,
  SiTypescript,
  SiKotlin,
  SiFlask,
  SiRubyonrails,
} from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';
import { BiCodeBlock } from 'react-icons/bi';
import { AiOutlineDatabase } from 'react-icons/ai';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  FaJava,
  FaPython,
  DiRuby,
  SiCplusplus,
  FaReact,
  SiEmberdotjs,
  IoLogoJavascript,
  SiTypescript,
  FaServer,
  BiCodeBlock,
  FaLinux,
  AiOutlineDatabase,
  FaGithub,
  FaEnvelope,
  FaDatabase,
  FaMobileAlt,
  FaProjectDiagram,
  SiKotlin,
  SiFlask,
  SiRubyonrails,
};

type IconProps = {
  iconName: string;
  size: number;
};

export function Icon({ iconName, size }: IconProps) {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    return <span>?</span>;
  }

  const Component = IconComponent as ComponentType<{ size: number }>;
  return <Component size={size} />;
}
