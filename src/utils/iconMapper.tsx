import { useMemo, type ComponentType } from 'react';
import { FaJava, FaPython, FaReact, FaLinux, FaServer, FaGithub, FaEnvelope } from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';
import { SiCplusplus, SiEmberdotjs, SiTypescript } from 'react-icons/si';
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
};

type IconProps = {
  iconName: string;
  className?: string;
  size?: number;
};

export function Icon({ iconName, className = '', size }: IconProps) {
  const IconComponent = iconMap[iconName];

  const props = useMemo(
    () => (size !== undefined ? { className, size } : { className }),
    [className, size],
  );

  if (!IconComponent) {
    return <span className={className}>?</span>;
  }

  const Component = IconComponent as ComponentType<{ className?: string; size?: number }>;
  return <Component {...props} />;
}
