import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import { theme, reset } from 'styles';
import { Layout, Listing, Wrapper, SliceZone, Title, SEO, Header } from 'components';
import Categories from '../components/Listing/Categories';
import website from '../../config/website';
import Backgroundshape from '../../static/bg.svg';

const Hero = styled.section`
  background: linear-gradient(90deg, #0E38A6 0%, #0181DE 100%);
  width: 100%;
  height: auto;
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
  z-index: 1; 
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  @media (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }

`

const ImageWrapper = styled.div`
  margin: 20px 0;
`
const Headline = styled.p`
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${props => props.theme.colors.greyBlue};
  font-size: 1.25rem;
  a {
    font-style: normal;
    font-weight: normal;
    color: ${props => props.theme.colors.greyBlue};
  }
  h6 {
    color: ${props => props.theme.colors.greyBlue};
  }
`;

const BrowseButton = styled.button`
  font-family: 'Roboto', 'Arial';
  display: block;
  & a {
    color: #1FDCBA;
    font-style: normal;
  }
  background-color: #E7FDF9;
  border: none;
  border-radius: 25px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 600;
  transition: all .2s ease-in-out;
  &:hover  {
    background-color: #D5F4EE;
  }
  
  & a:hover {
    color: #13CBAA;
    text-decoration: none;
  }
`;

const Description = styled.div`
  padding: 2vh 0 0 0;
  h6 {
    color: ${props => props.theme.colors.greyBlue};
  }
`

const Post = ({ data: { prismicPost, posts }, location }) => {
  const { data } = prismicPost;
  let categories = false;
  if (data.categories[0].category) {
    categories = data.categories.map(c => c.category.document[0].data.name);
  }
  return (
    <Layout>
      <SEO title={`${data.title.text} | ${website._title}`} pathname={location.pathname} article banner={`${data.feature.localFile.childImageSharp.sizes.src}`}/>
      <Hero>
        <Wrapper style={{ zIndex: '2', position: 'relative'}}>
          <Header invert />
          <Headline>
            <h6> {categories && <Categories categories={categories} />}</h6>
          </Headline>
          
          <h1>{data.title.text}</h1>
          
          <BrowseButton><a target="_blank" href={data.url.url} >Browse Now</a></BrowseButton>
        </Wrapper>
        <Background src={Backgroundshape} />
        
      </Hero>
      <Wrapper>
        <Grid>
        <div>
          <Description><h6>Description</h6></Description>
          <SliceZone allSlices={data.body} />
        </div>
        <ImageWrapper>
          <Img sizes={data.feature.localFile.childImageSharp.sizes} ></Img>
        </ImageWrapper>
        </Grid>
        <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
        <Listing posts={posts.edges} />
      </Wrapper>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        url {
          url
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
               aspectRatio
               sizes
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
          ... on PrismicPostBodyCodeBlock {
            slice_type
            id
            primary {
              code_block {
                html
              }
            }
          }
          ... on PrismicPostBodyImage {
            slice_type
            id
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    posts: allPrismicPost(limit: 2, sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
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
            feature {
              localFile {
                id
                childImageSharp {
                 sizes(maxWidth: 1280) {
                   src
                   srcSet
                   srcWebp
                   srcSetWebp
                   aspectRatio
                   sizes
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
