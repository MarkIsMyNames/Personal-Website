import React, { useState, useEffect, useRef, useCallback } from 'react';
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

export const Navigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback((): void => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 10) {
      setIsVisible((prev) => (prev ? prev : true));
    } else if (currentScrollY > lastScrollYRef.current) {
      setIsVisible((prev) => (prev ? false : prev));
    } else {
      setIsVisible((prev) => (prev ? prev : true));
    }

    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    const nav = document.querySelector('nav');
    const navHeight = nav?.offsetHeight ?? 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          aria-label="Scroll to top"
        >
          <NavProfileImage
            src={profile.image}
            alt={`${profile.name} profile picture`}
          />
          <NavBrand>{profile.name}</NavBrand>
        </NavBrandContainer>
        <NavLinks role="menu">
          <NavLink
            onClick={() => scrollToSection('about')}
            role="menuitem"
            aria-label="Navigate to About section"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('skills')}
            role="menuitem"
            aria-label="Navigate to Skills section"
          >
            Skills
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('projects')}
            role="menuitem"
            aria-label="Navigate to Projects section"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => scrollToSection('contact')}
            role="menuitem"
            aria-label="Navigate to Contact section"
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};
