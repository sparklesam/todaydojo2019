import styled from 'react-emotion';

const Title = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 1.4444rem;
  font-weight: 400;
  position: relative;
  &:before {
    content: '';
    width: 3rem;
    height: 1px;
    background-color: ${props => props.theme.colors.grey};
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -80px;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    &:before {
      width: 1.5rem;
      left: -40px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    &:before {
      width: 1.5rem;
      left: -35px;
    }
  }
`;

export default Title;
