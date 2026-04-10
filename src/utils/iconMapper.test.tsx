import { render } from '@testing-library/react';
import { UNKNOWN_ICON_NAME, CONTACT_ICON_SIZE } from '../config';
import { Icon } from './iconMapper';

const knownIconNames = [
  'FaJava',
  'FaPython',
  'DiRuby',
  'SiCplusplus',
  'FaReact',
  'SiEmberdotjs',
  'IoLogoJavascript',
  'SiTypescript',
  'FaServer',
  'BiCodeBlock',
  'FaLinux',
  'AiOutlineDatabase',
  'FaGithub',
  'FaEnvelope',
  'FaDatabase',
  'FaMobileAlt',
  'FaProjectDiagram',
  'SiKotlin',
  'SiFlask',
  'SiRubyonrails',
];

describe('iconMapper', () => {
  it.each(knownIconNames)('renders %s icon', (iconName) => {
    const { container } = render(
      <Icon
        size={CONTACT_ICON_SIZE}
        iconName={iconName}
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders fallback icon for unknown icon name', () => {
    const { container } = render(
      <Icon
        size={CONTACT_ICON_SIZE}
        iconName={UNKNOWN_ICON_NAME}
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
