import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ fullPage }) => (fullPage ? '100vh' : '40vh')};
  gap: 1.2rem;
`;

const Spinner = styled.div`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border: 3px solid #e0e0e0;
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

const Label = styled.p`
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  margin: 0;
`;

const PageLoader = ({ label = 'Loading…', fullPage = false, size }) => (
  <Overlay fullPage={fullPage}>
    <Spinner size={size} />
    <Label>{label}</Label>
  </Overlay>
);

export default PageLoader;
