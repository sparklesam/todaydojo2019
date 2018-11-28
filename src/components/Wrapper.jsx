import styled from 'react-emotion';

const Wrapper = styled.div`
  z-index: 2;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 1rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 0.5rem;
  }
`;

export default Wrapper;
