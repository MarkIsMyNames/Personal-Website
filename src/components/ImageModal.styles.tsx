import styled from 'styled-components';

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  animation: ${({ $isOpen }) => ($isOpen ? 'fadeIn 0.3s ease' : 'none')};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default;
  animation: zoomIn 0.3s ease;

  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    background: ${({ theme }) => theme.colors.accentPrimary};
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    transform: rotate(90deg);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.bgCard};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  line-height: 0;
  padding: 0;
  padding-bottom: 0.3rem;
  animation: fadeInNav 0.3s ease;
  opacity: 0;
  animation-fill-mode: forwards;
  font-family: Arial, sans-serif;
  font-weight: 300;

  @keyframes fadeInNav {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentPrimary};
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    transform: translateY(-50%) scale(1.1);
    padding-bottom: 0.3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    padding-bottom: 0.3rem;
  }
`;

export const NavigationButtonLeft = styled(NavigationButton)`
  left: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 1rem;
  }
`;

export const NavigationButtonRight = styled(NavigationButton)`
  right: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 1rem;
  }
`;
