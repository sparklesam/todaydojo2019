import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "react-emotion";
import { Navigation, Layout, Listingv2, Wrapper, Title, SEO } from "components";
import website from "../../config/website";
import favicon from "../../static/logos/favicon.png";

const Wrap = styled(Wrapper)`
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    max-width: 100%;
  }
`;

const Hero = styled.section`
  background: /*linear-gradient(90deg, #0E38A6 0%, #0181DE 100%)*/ white;
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: 4rem;
  h1 {
    color: ${props => props.theme.colors.grey};
  }
`;

const Pagetitle = styled.div`
  padding-top: 4em;
`;

const Background = styled.img`
  /*  position: absolute;
  bottom: 0;
  right: 0;
  mix-blend-mode: multiply;
  z-index: 1; 
  width: 100%;
  */
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.greyBlue};
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;

  a {
    font-style: normal;
    font-weight: normal;
  }
`;

const Headline = styled.h1`
  display: block;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 1rem;
`;

const Category = ({
  pageContext: { category },
  data: {
    page: { data },
    posts: { edges, totalCount },
    categories
  },
  location
}) => (
  <Layout>
    <SEO
      title={` Best ${category} Design Resources 2019 | Curated Design Pins on ${
        website._title
      }`}
      pathname={location.pathname}
      banner={`${data.image.localFile.childImageSharp.publicURL}`}
      desc={`${data.description}`}
      keyword={`${data.keywords}`}
    />
    <Hero>
      <Navigation />
      <Wrap style={{ zIndex: "2", position: "relative" }}>
        <Pagetitle>
          <Subtitle>Category</Subtitle>
          <Headline>{category}</Headline>
          <Description>{data.description}</Description>
        </Pagetitle>
      </Wrap>
      {/*<Background src={Backgroundshape} />*/}
    </Hero>
    <Wrap>
      <Title style={{ marginTop: "4rem" }}>
        {totalCount} {totalCount === 1 ? "Post" : "Posts"}{" "}
        {totalCount === 1 ? "was" : "were"} tagged with "{category}"
      </Title>
      <Listingv2 posts={edges} />
    </Wrap>
  </Layout>
);

export default Category;

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    page: prismicCategory(data: { name: { eq: $category } }) {
      data {
        name
        description
        keywords
        image {
          localFile {
            id
            childImageSharp {
              fluid(maxWidth: 1280) {
                src
                srcSet
                srcWebp
                srcSetWebp
                aspectRatio
              }
            }
          }
        }
      }
    }
    posts: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          categories: {
            elemMatch: {
              category: {
                document: { elemMatch: { data: { name: { eq: $category } } } }
              }
            }
          }
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
                  fluid(maxWidth: 1280) {
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
            types {
              document {
                data {
                  bgcolor
                  textcolor
                  name
                  icon {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
    categories: allPrismicCategory(
      sort: { fields: [data___name], order: ASC }
    ) {
      edges {
        node {
          id
          data {
            name
          }
        }
      }
    }
  }
`;
