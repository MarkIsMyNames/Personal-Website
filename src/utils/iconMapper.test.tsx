import { render, screen } from '@testing-library/react';
import { Icon } from './iconMapper';

describe('iconMapper', () => {
  it('renders FaJava icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaJava"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaPython icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaPython"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders DiRuby icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="DiRuby"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiCplusplus icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="SiCplusplus"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaReact icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaReact"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiEmberdotjs icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="SiEmberdotjs"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders IoLogoJavascript icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="IoLogoJavascript"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiTypescript icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="SiTypescript"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaServer icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaServer"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders BiCodeBlock icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="BiCodeBlock"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaLinux icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaLinux"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders AiOutlineDatabase icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="AiOutlineDatabase"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaGithub icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaGithub"
      />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaEnvelope icon', () => {
    const { container } = render(
      <Icon
        size={24}
        iconName="FaEnvelope"
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

  it('applies size to icon', () => {
    const { container } = render(
      <Icon
        iconName="FaReact"
        size={24}
      />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
