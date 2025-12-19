import styled from 'styled-components';

export const Nav = styled.nav<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
  padding: 1.25rem 2rem;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: ${({ theme }) => theme.colors.bgPrimary}f0;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem 1.5rem;
  }
`;

export const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
    justify-content: center;
  }
`;

export const NavBrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const NavProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.accentPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 2rem;
    height: 2rem;
  }
`;

export const NavBrand = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.35rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  padding-right: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1.75rem;
    padding-right: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 1.25rem;
    padding-right: 0;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 0.25rem 0;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.accent};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accentPrimary};

    &::after {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.05rem;
  }
`;
