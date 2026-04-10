import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Nav,
  NavContainer,
  NavBrandContainer,
  NavProfileImage,
  NavBrand,
  NavLinks,
  NavLink,
} from './Navigation.styles';
import { AriaRole, SectionId } from '../../types';
import { useTranslation } from 'react-i18next';
import {
  NAV_SCROLL_TOP_THRESHOLD,
  NAV_CLICK_SCROLL_LOCK_MS,
  SCROLL_BEHAVIOR,
  FIRST_INDEX,
  SCROLL_TOP_ZERO,
} from '../../config';

export function Navigation() {
  const { t } = useTranslation();
  const profile = t('profile', { returnObjects: true });
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(FIRST_INDEX);
  const isNavClickScrollRef = useRef(false);

  const handleScroll = useCallback((): void => {
    if (isNavClickScrollRef.current) {
      return;
    }

    const currentScrollY = window.scrollY;
    setIsVisible(
      currentScrollY < NAV_SCROLL_TOP_THRESHOLD || currentScrollY <= lastScrollYRef.current,
    );
    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollTo = (sectionId?: SectionId): void => {
    const element = sectionId ? document.getElementById(sectionId) : null;
    if (sectionId && !element) {
      return;
    }

    isNavClickScrollRef.current = true;
    window.scrollTo({
      top: element ? element.getBoundingClientRect().top + window.scrollY : SCROLL_TOP_ZERO,
      behavior: SCROLL_BEHAVIOR,
    });
    setTimeout(() => {
      isNavClickScrollRef.current = false;
      lastScrollYRef.current = window.scrollY;
    }, NAV_CLICK_SCROLL_LOCK_MS);
  };

  return (
    <Nav
      $isVisible={isVisible}
      role={AriaRole.Navigation}
      aria-label={t('navigation.ariaLabels.nav')}
    >
      <NavContainer>
        <NavBrandContainer
          onClick={() => scrollTo()}
          role={AriaRole.Button}
          aria-label={t('navigation.ariaLabels.link', { section: t('navigation.sections.about') })}
        >
          <NavProfileImage
            src={profile.image}
            alt={`${profile.name} profile picture`}
          />
          <NavBrand>{profile.name}</NavBrand>
        </NavBrandContainer>
        <NavLinks role={AriaRole.Menu}>
          <NavLink
            onClick={() => scrollTo()}
            role={AriaRole.MenuItem}
            aria-label={t('navigation.ariaLabels.link', {
              section: t('navigation.sections.about'),
            })}
          >
            {t('navigation.sections.about')}
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Skills)}
            role={AriaRole.MenuItem}
            aria-label={t('navigation.ariaLabels.link', {
              section: t('navigation.sections.skills'),
            })}
          >
            {t('navigation.sections.skills')}
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Projects)}
            role={AriaRole.MenuItem}
            aria-label={t('navigation.ariaLabels.link', {
              section: t('navigation.sections.projects'),
            })}
          >
            {t('navigation.sections.projects')}
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Contact)}
            role={AriaRole.MenuItem}
            aria-label={t('navigation.ariaLabels.link', {
              section: t('navigation.sections.contact'),
            })}
          >
            {t('navigation.sections.contact')}
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}
