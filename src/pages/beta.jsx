import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { graphql } from "gatsby";
import { Layout, Listingv2, Wrapper, Title, Header } from "components";
import { theme, reset } from "styles";

const Hero = styled.header`
  background: /*linear-gradient(90deg, #0E38A6 0%, #0181DE 100%)*/ white;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 150px;
  h1 {
    color: ${props => props.theme.colors.titlegrey};
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

const HeroText = styled.div`
  color: #878787;
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

class Beta extends Component {
  render() {
    const {
      data: { homepage, social, articles, posts, category }
    } = this.props;

    return (
      <Layout>
        <Hero>
          <Wrapper>
            <h1>{homepage.data.title.text}</h1>
            <HeroText
              dangerouslySetInnerHTML={{ __html: homepage.data.content.html }}
            />
          </Wrapper>
          <Wrapper>
            <Listingv2 posts={articles.edges} />
            <Listingv2 posts={posts.edges} />
          </Wrapper>
        </Hero>
      </Layout>
    );
  }
}

export default Beta;

Beta.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query BetaQuery {
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
    category: allPrismicCategory(sort: { fields: [data___name], order: ASC }) {
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
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
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
            types {
              document {
                data {
                  name
                  bgcolor
                  textcolor
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
    articles: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          types: {
            document: { elemMatch: { data: { name: { eq: "Article" } } } }
          }
        }
      }
      limit: 5
    ) {
      edges {
        node {
          uid
          data {
            feature {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                    presentationWidth
                    presentationHeight
                  }
                }
              }
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
            types {
              document {
                data {
                  name
                  bgcolor
                  textcolor
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
  }
`;
