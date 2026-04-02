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
import { profile } from '../data/portfolioData';
import { SectionId } from '../types';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isNavClickScrollRef = useRef(false);

  const handleScroll = useCallback((): void => {
    if (isNavClickScrollRef.current) {
      return;
    }
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY < 10 || currentScrollY <= lastScrollYRef.current);
    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (sectionId?: SectionId): void => {
    const element = sectionId ? document.getElementById(sectionId) : null;
    if (sectionId && !element) {
      return;
    }

    isNavClickScrollRef.current = true;
    window.scrollTo({
      top: element ? element.getBoundingClientRect().top + window.scrollY : 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      isNavClickScrollRef.current = false;
      lastScrollYRef.current = window.scrollY;
    }, 1000);
  };

  return (
    <Nav
      $isVisible={isVisible}
      role="navigation"
      aria-label="Main navigation"
    >
      <NavContainer>
        <NavBrandContainer
          onClick={() => scrollTo()}
          role="button"
          aria-label="Navigate to About section"
        >
          <NavProfileImage
            src={profile.image}
            alt={`${profile.name} profile picture`}
          />
          <NavBrand>{profile.name}</NavBrand>
        </NavBrandContainer>
        <NavLinks role="menu">
          <NavLink
            onClick={() => scrollTo()}
            role="menuitem"
            aria-label="Navigate to About section"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Skills)}
            role="menuitem"
            aria-label="Navigate to Skills section"
          >
            Skills
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Projects)}
            role="menuitem"
            aria-label="Navigate to Projects section"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => scrollTo(SectionId.Contact)}
            role="menuitem"
            aria-label="Navigate to Contact section"
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}
