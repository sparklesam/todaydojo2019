import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import BookmarkIcon from '../../static/HeroPin.svg'

const NavBar = styled.div`
`


const Button = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2em;
`


const NavLink = styled.h5`
  height: auto;
  margin: 0;
  text-transform: none;
  font-family: 'IBM Plex Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  font-style: normal;
  font-size: 1rem;
`

const Icon = styled.img`
  width: 25px;
  margin-right: 10px;
`

class Navigation extends Component {
    render() {
      const { invert } = this.props;
      return (
        <NavBar>
        <Link exact to="/" style={{ opacity: "1"}}><Button><Icon src={BookmarkIcon} /><NavLink style={{ color: "#6469DA" }}>Pins</NavLink></Button></Link>
        </NavBar>
      );
    }
  }

export default Navigation;