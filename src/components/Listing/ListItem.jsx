import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { Categories } from 'components/Listing';
import { SliceZone } from 'components'

const Item = styled.li`
  margin-bottom: 1.45rem;
  background: #F7F7F7;
  transition: box-shadow .2s ease-in-out;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  padding: 1em;
`

const Headline = styled.p`
  /*font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';*/
  color: ${props => props.theme.colors.grey};
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
  color: #000;
  font-weight: 500;
  cursor: auto; 
  /*color: ${props => props.theme.colors.black};*/
  font-style: normal;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.777rem;
  }
`;

const BrowseButton = styled.a`
  display: block;
  color: #fbb03b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-style: normal;
  transition: color .2s ease-in-out;
  ${Item}:hover & {
    color: #FFC062;
  }
`;

export default class ListItem extends Component {
  render() {
    const { node, categories } = this.props;
    return (
      <Item>
        <img src={node.data.feature.url} paddingTop="50%" objectFit="cover" width="100%"/>
        <Content>
        <Headline>
          {categories && <Categories categories={categories} />}
        </Headline>
        <StyledLink /*to={node.uid}*/>{node.data.title.text}</StyledLink>
        <SliceZone allSlices={node.data.body} />
        <BrowseButton target="_blank" href={node.data.url.url}>Browse Now</BrowseButton>
        </Content>
      </Item>
    );
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};
