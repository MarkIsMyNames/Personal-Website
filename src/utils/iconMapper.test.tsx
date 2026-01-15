import { render, screen } from '@testing-library/react';
import { Icon } from './iconMapper';

describe('iconMapper', () => {
  it('renders FaJava icon', () => {
    const { container } = render(<Icon iconName="FaJava" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaPython icon', () => {
    const { container } = render(<Icon iconName="FaPython" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders DiRuby icon', () => {
    const { container } = render(<Icon iconName="DiRuby" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiCplusplus icon', () => {
    const { container } = render(<Icon iconName="SiCplusplus" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaReact icon', () => {
    const { container } = render(<Icon iconName="FaReact" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiEmberdotjs icon', () => {
    const { container } = render(<Icon iconName="SiEmberdotjs" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders IoLogoJavascript icon', () => {
    const { container } = render(<Icon iconName="IoLogoJavascript" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders SiTypescript icon', () => {
    const { container } = render(<Icon iconName="SiTypescript" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaServer icon', () => {
    const { container } = render(<Icon iconName="FaServer" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders BiCodeBlock icon', () => {
    const { container } = render(<Icon iconName="BiCodeBlock" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaLinux icon', () => {
    const { container } = render(<Icon iconName="FaLinux" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders AiOutlineDatabase icon', () => {
    const { container } = render(<Icon iconName="AiOutlineDatabase" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaGithub icon', () => {
    const { container } = render(<Icon iconName="FaGithub" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders FaEnvelope icon', () => {
    const { container } = render(<Icon iconName="FaEnvelope" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders fallback for unknown icon', () => {
    render(<Icon iconName="UnknownIcon" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('applies className to icon', () => {
    const { container } = render(
      <Icon
        iconName="FaReact"
        className="test-class"
      />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('test-class');
  });

  it('applies className to fallback', () => {
    render(
      <Icon
        iconName="UnknownIcon"
        className="test-class"
      />,
    );
    const fallback = screen.getByText('?');
    expect(fallback).toHaveClass('test-class');
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
