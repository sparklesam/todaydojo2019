import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { ListItem } from "components/Listing";
import { theme, reset } from "styles";

const List = styled.ul`
  margin-top: 4rem;
  margin-bottom: 4rem;
  list-style-type: none;
  margin-left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr;
    grid-gap: 0px;
  }
`;

export default class Listing extends Component {
  render() {
    const { posts } = this.props;
    return (
      <List>
        {posts.map((post) => {
          let categories = false;
          if (post.node.data.categories.category) {
            categories = post.node.data.categories.map(
              (c) => c.category.document.data.name
            );
          }
          return (
            <ListItem
              key={post.node.uid}
              node={post.node}
              categories={categories}
            />
          );
        })}
      </List>
    );
  }
}

Listing.propTypes = {
  posts: PropTypes.array.isRequired,
};
