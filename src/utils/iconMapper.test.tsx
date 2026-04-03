import { render, screen } from '@testing-library/react';
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
        size={24}
        iconName={iconName}
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders fallback for unknown icon', () => {
    render(
      <Icon
        size={24}
        iconName="UnknownIcon"
      />,
    );
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
