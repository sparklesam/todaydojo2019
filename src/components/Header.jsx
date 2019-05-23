import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import BookmarkIcon from '../../static/HeroPin.svg'
import HomeIcon from '../../static/HeroProfile.svg'
import WorkIcon from '../../static/HeroProject.svg'
import BlogIcon from '../../static/HeroBlog.svg'
import PhotoIcon from '../../static/HeroPhotography.svg'

const NavBar = styled.div`
  max-width: 1440px;
  margin: 1em auto;
  display: flex;
  flex-direction: row;
  margin-right: 20px;

  a {
    opacity: 0.5;

    &:hover {
      opacity: 1;
      text-decoration: none;
      transition: opacity 300ms ease-in-out ;
    }
  }
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

const StyledHeader = styled.header`

  padding-bottom: 2rem;
  a {
    color: ${props => (props.invert ? props.theme.colors.greyLight : props.theme.colors.greyDark)};
    font-weight: 400;
    font-style: normal;
    font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
`;

class Header extends Component {
  render() {
    const { invert } = this.props;
    return (
      
      <NavBar>
      <a href="http://desktopofsamuel.com/"><Button><Icon src={HomeIcon} /><NavLink style={{ color: "#95973B" }}>Home</NavLink></Button></a>
        <a href="http://desktopofsamuel.com/work"><Button><Icon src={WorkIcon} /><NavLink style={{ color: "#49CB74" }}>Work</NavLink></Button></a>
        <a href="http://desktopofsamuel.com/blog"><Button><Icon src={BlogIcon} /><NavLink style={{ color: "#FE8170" }}>Blog</NavLink></Button></a>
        <a href="http://photo.desktopofsamuel.com"><Button><Icon src={PhotoIcon} /><NavLink style={{ color: "#3284DC" }}>Aperture</NavLink></Button></a>
        <Link exact to="/" style={{ opacity: "1"}}><Button><Icon src={BookmarkIcon} /><NavLink style={{ color: "#6469DA" }}>Pin</NavLink></Button></Link>
      </NavBar>
    );
  }
}

{/*<StyledHeader invert={invert}>
        <Link to="/">Dojo Today</Link>
      </StyledHeader>*/}

export default Header;

{/* Header.propTypes = {
  invert: PropTypes.bool,
};

Header.defaultProps = {
  invert: false,
}; */}
