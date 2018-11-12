import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import { Layout, Listing, Wrapper, Title, SEO, Header } from 'components';
import website from '../../config/website';
import Backgroundshape from '../../static/bg.svg';

const Hero = styled.section`
  background: linear-gradient(90deg, #0E38A6 0%, #0181DE 100%);
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  padding-top: 1rem;
  padding-bottom: 4rem;
  h1 {
    color: ${props => props.theme.colors.bg};
  }
`;

const Background = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  mix-blend-mode: multiply;
  z-index: 0; 
`

const Headline = styled.p`
  color: ${props => props.theme.colors.greyBlue};
  font-size: 1.25rem;
  a {
    font-style: normal;
    font-weight: normal;
  }
`;

const Category = ({
  pageContext: { category },
  data: {
    posts: { edges, totalCount },
  },
  location,
}) => (
  <Layout>
    <SEO title={`${category} | ${website._title}`} pathname={location.pathname} />
    <Hero>
    <Background src={Backgroundshape} />
    <Wrapper>
        <Header invert />
        <Headline>Category</Headline>
        <h1>{category}</h1>
      </Wrapper>
    </Hero>
    <Wrapper>
      <Title style={{ marginTop: '4rem' }}>
        {totalCount} {totalCount === 1 ? 'Post' : 'Posts'} {totalCount === 1 ? 'was' : 'were'} tagged with "{category}"
      </Title>
      <Listing posts={edges} />
    </Wrapper>
  </Layout>
);

export default Category;

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};


export const pageQuery = graphql`
query CategoryPage($category: String!) {
  posts: allPrismicPost(
    sort: { fields: [data___date], order: DESC }
    filter: {
      data: {
        categories: { elemMatch: { category: { document: { elemMatch: { data: { name: { eq: $category } } } } } } }
      }
    }
  ) {
    totalCount
      edges {
        node {
          uid
          data {
            title {
              text
            }
            feature {
              url
              localFile {
                id
                childImageSharp {
                 sizes(maxWidth: 1280) {
                   src
                   srcSet
                   srcWebp
                   srcSetWebp
                   base64
                   aspectRatio
                   sizes
                 }
               }
              }
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
  }
`;
