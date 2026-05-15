import { render } from '@testing-library/react';
import { UNKNOWN_ICON_NAME } from '../config';
import { theme } from '../styles/theme';
import { HtmlTag, ErrorMessage } from '../types';
import { Icon, iconMap } from './iconMapper';

const knownIconNames = Object.keys(iconMap);

describe('iconMapper', () => {
  it.each(knownIconNames)('renders %s icon', (iconName) => {
    const { container } = render(
      <Icon
        size={theme.sizes.contactIcon}
        iconName={iconName}
      />,
    );
    expect(container.querySelector(HtmlTag.Svg)).toBeInTheDocument();
  });

  it('throws for unknown icon name', () => {
    expect(() =>
      render(
        <Icon
          size={theme.sizes.contactIcon}
          iconName={UNKNOWN_ICON_NAME}
        />,
      ),
    ).toThrow(ErrorMessage.IconNotFound);
  });
});
