import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';
import BookmarkIcon from '../../static/HeroPin.svg'
import { Categories } from 'components/Listingv2';

const NavBar = styled.div`
padding: 1rem 0;
margin: 0 auto;
border-bottom: #f7f7f7 1px solid;
max-width: 1200px;
display: flex;
justify-content: space-between;
align-items: center;

@media (max-width: ${props => props.theme.breakpoints.l}) {
  max-width: 100%; ;
  margin: 0 1.5rem;
}
`
const Button_Suggest = styled.a`
  font-weight: 500;
  min-height: 2rem;
  border-radius: 5px;
  line-height: 30px;

`
const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2em;

  &:last-child {
    margin-right: 0;
  }

`

const NavLink = styled.p`
  height: auto;
  margin: 0;
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0;
  font-style: normal;
  font-size: 1rem;

`

const Icon = styled.img`
  width: 2rem;
  margin-right: 10px;
`

class Navigation extends Component {
    render() {
      const { invert } = this.props;
      return (
        <NavBar>
        <Link exact to="/" style={{ opacity: "1"}}><Button><Icon src={BookmarkIcon} /><NavLink style={{ color: "#6469DA" }}></NavLink></Button></Link>
        <Button_Suggest href="mailto:sammatwong@gmail.com">Suggest</Button_Suggest>
        </NavBar>
        
      );
    }
  }

export default Navigation;