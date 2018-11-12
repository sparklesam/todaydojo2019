import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { graphql } from 'gatsby';
import { Layout, Listing, Wrapper, Title } from 'components';
import Categories from '../components/Listing/Categories';
import kebabCase from 'lodash/kebabCase';
import Link from 'gatsby-link';

const Hero = styled.header`
  background-color: ${props => props.theme.colors.greyLight};
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 20px;
`

const Category = styled.div`
  display: block;
  margin-bottom: 30px;
  a {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-style: normal;
  }
`

const HeroInner = styled(Wrapper)`
  padding-top: 13rem;
  padding-bottom: 13rem;
  h1 {
    margin-bottom: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;

const HeroText = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  li {
    display: inline;
    &:not(:first-child) {
      margin-left: 2.5rem;
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${props => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`;

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, category },
    } = this.props;
    return (
      <Layout>
        <Hero>
          <HeroInner>
            <h1>{homepage.data.title.text}</h1>
            <HeroText dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />
          </HeroInner>
        </Hero>
        <Content>
        <Wrapper>
          <Title style={{ marginTop: '4rem' }}>Categories</Title>
          {category.edges.map(c =>(
            <Category><Link to={`/categories/${kebabCase(c.node.data.name)}`}>{c.node.data.name}</Link></Category>
          ))}
        </Wrapper>
        <Wrapper style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
          <Listing posts={posts.edges} />
        </Wrapper>
        </Content>
      </Layout>
    );
  }
}

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
query IndexQuery {
  homepage: prismicHomepage {
    data {
      title {
        text
      }
      content {
        html
      }
    }
  }
  social: allPrismicHeroLinksBodyLinkItem {
    edges {
      node {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
  category: allPrismicCategory(sort:{ fields: [data___name], order: ASC}) {
    edges {
      node {
        id
        data {
          name
        }
      }
    }
  }
  posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
    edges {
      node {
        uid
        data {
          feature {
            url
           }
          title {
            text
          }
          url {
            url
          }
          body {
            ... on PrismicPostBodyText {
              slice_type
              id
              primary {
                text {
                  html
                }
              }
            }
          }
          date(formatString: "DD.MM.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  projects: allPrismicProjectsBodyLinkItem {
    edges {
      node {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
}
`;
