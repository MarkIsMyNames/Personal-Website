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
  }, [handleScroll]);

  const smoothScrollTo = useCallback((sectionTop: number): void => {
    isNavClickScrollRef.current = true;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    setTimeout(() => {
      isNavClickScrollRef.current = false;
      lastScrollYRef.current = window.scrollY;
    }, 1000);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: SectionId): void => {
      const element = document.getElementById(sectionId);
      if (element) {
        smoothScrollTo(element.getBoundingClientRect().top + window.scrollY);
      }
    },
    [smoothScrollTo],
  );

  const scrollToTop = useCallback((): void => {
    smoothScrollTo(0);
  }, [smoothScrollTo]);

  return (
    <Nav
      $isVisible={isVisible}
      role="navigation"
      aria-label="Main navigation"
    >
      <NavContainer>
        <NavBrandContainer
          onClick={scrollToTop}
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
            onClick={scrollToTop}
            role="menuitem"
            aria-label="Navigate to About section"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollToSection(SectionId.Skills)}
            role="menuitem"
            aria-label="Navigate to Skills section"
          >
            Skills
          </NavLink>
          <NavLink
            onClick={() => scrollToSection(SectionId.Projects)}
            role="menuitem"
            aria-label="Navigate to Projects section"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => scrollToSection(SectionId.Contact)}
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
