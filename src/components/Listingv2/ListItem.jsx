import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Categories } from "components/Listingv2";
import { SliceZone } from "components";

const Item = styled.li`
  margin-bottom: 1.45rem;
  background: #fbfbfb;
  transition: box-shadow 0.2s ease-in-out;
  <<<<<<<headdisplay: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  padding: 1rem;
  =======>>>>>>>41cdd695431ab99214797fe907093a82239c4abf &:hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  padding: 1em;
`;

const Headline = styled.p`
  /*font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';*/
  /* color: ${(props) => props.theme.colors.grey};*/
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
    /*color: ${(props) => props.theme.colors.grey};*/
    font-style: normal;
    font-weight: 500;
  }
`;

/* Disabled Link to Individual Post 
const StyledLink = styled(Link)`
*/

const TypePill = styled.div`
  display: inline-block;
  border-radius: 10rem;
  text-align: center;
  justify-items: center;
  padding: 0.2rem 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const TypeIcon = styled.img`
  width: 15px;
  margin-right: 0.2rem;
  margin-top: -0.2rem;
`;

const StyledLink = styled.a`
  font-size: 1.5rem;
  line-height: 2rem;
  color: #2F3D61;
  font-weight: 600;
  cursor: pointer; 
  /*color: ${(props) => props.theme.colors.black};*/
  font-style: normal;
  transition: background-size .4s ease;
  background: linear-gradient(to bottom, transparent 62%, #ffd644 0) left center/0% 75% no-repeat;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.777rem;  
  }

  &:hover {
    background-size: 100% 100%;
  }
`;

const BrowseButton = styled.button`
  font-family: "Roboto", "Arial";
  display: block;
  color: #1fdcba;
  font-style: normal;
  background-color: #e7fdf9;
  border: none;
  border-radius: 25px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #d5f4ee;
    cursor: pointer;
    color: #13cbaa;
    text-decoration: none;
  }
`;

export default class ListItem extends Component {
  render() {
    const { node, categories } = this.props;

    return (
      <Item>
        {!!node.data && !!node.data.feature ? (
          <Img fluid={node.data.feature.fluid} />
        ) : (
          <Img src={node.data.feature.localfile.publicURL} />
        )}
        <Content>
          <StyledLink href={node.data.url.url} target="blank">
            {node.data.title.text}
          </StyledLink>
          <SliceZone allSlices={node.data.body} />
          {!!node.data.types && !!node.data.types.document ? (
            <TypePill
              style={{
                background: `${node.data.types.document.data.bgcolor}`,
                color: `${node.data.types.document.data.textcolor}`,
              }}
            >
              <TypeIcon src={node.data.types.document.data.icon.url} />{" "}
              {node.data.types.document.data.name}
            </TypePill>
          ) : (
            <></>
          )}
        </Content>
      </Item>
    );
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};
