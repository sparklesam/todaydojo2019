import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { Categories } from 'components/Listing';
import { SliceZone } from 'components'

const Item = styled.li`
  margin-bottom: 1.45rem;
  background: #FBFBFB;
  transition: box-shadow .2s ease-in-out;
  

  &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  padding: 1em;
`

const Headline = styled.p`
  /*font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';*/
  /* color: ${props => props.theme.colors.grey};*/
  color: #979DAD;
  margin-bottom: 5px;
  font-weight: 500;
  line-height: 1.5;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #BABABA;
  a {
    color: #BABABA;
    /*color: ${props => props.theme.colors.grey};*/
    font-style: normal;
    font-weight: 500;
  }
`;

/* Disabled Link to Individual Post 
const StyledLink = styled(Link)`
*/

const StyledLink = /*(Link)*/ styled.div`
  font-size: 32px;
  line-height: 42px;
  color: #2F3D61;
  font-weight: 700;
  cursor: auto; 
  /*color: ${props => props.theme.colors.black};*/
  font-style: normal;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.777rem;
  }
`;

const BrowseButton = styled.button`
  font-family: 'Roboto', 'Arial';
  display: block;
  color: #1FDCBA;
  font-style: normal;
  background-color: #E7FDF9;
  border: none;
  border-radius: 25px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  transition: all .2s ease-in-out;
  &:hover  {
    background-color: #D5F4EE;
    cursor: pointer;
    color: #13CBAA;
    text-decoration: none;
  }
`;

export default class ListItem extends Component {
  render() {
    const { node, categories } = this.props;
    return (
      <Item>
        <Img sizes={node.data.feature.localFile.childImageSharp.sizes} />
        <Content>
        <Headline>
          {categories && <Categories categories={categories} />}
        </Headline>
        <StyledLink /*to={node.uid}*/>{node.data.title.text}</StyledLink>
        <SliceZone allSlices={node.data.body} />
        <a target="_blank" href={node.data.url.url}><BrowseButton>Browse Now</BrowseButton></a>
        </Content>
      </Item>
    );
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};
