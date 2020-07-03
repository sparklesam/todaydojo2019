import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { graphql } from "gatsby";
import { Layout, Listing, Wrapper, Title, Header } from "components";
import { theme, reset } from "styles";
import Categories from "../components/Listing/Categories";
import kebabCase from "lodash/kebabCase";
import Link from "gatsby-link";
import Backgroundshape from "../../static/bg.svg";

const Topbar = styled.div`
  background: #2f3d61;
  height: 40px;
  display: flex;
  align-items: center;
  h6 {
    color: white;
    opacity: 0.8;
    padding-top: 24px;
  }

  span {
  }
`;

const Hero = styled.header`
  background: /*linear-gradient(90deg, #0E38A6 0%, #0181DE 100%)*/ white;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 150px;
  h1 {
    color: ${(props) => props.theme.colors.titlegrey};
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const HeroInner = styled.div`
  text-align: left;
  h1 {
    color: ${(props) => props.theme.colors.grey};
    margin-bottom: 2rem;
    font-weight: 500;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding-top: 2rem;
    padding-bottom: 7rem;
  }
`;

const HeroText = styled.div`
  color: #878787;
  font-size: 1.7rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`;

const Background = styled.img`
  /*  position: absolute;
  bottom: 0;
  right: 0;
  mix-blend-mode: multiply;
  z-index: 0;
  width: 100%; */
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 20px;

  @media (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr;
    grid-gap: 0px;
  }
`;

const Category = styled.div`
  width: 100%;
  @media (max-width: ${theme.breakpoints.m}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  @media (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
const CateogryItem = styled.div`
  display: block;
  margin-bottom: 30px;
  a {
    font-style: normal;
    font-family: "Roboto", "Arial";
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  li {
    display: inline;
    &:not(:first-child) {
      margin-left: 2.5rem;
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${(props) => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`;

const NavBar = styled.div`
  margin: 1em auto;
  display: flex;
  flex-direction: row;
  margin-right: 10px;

  a {
    opacity: 0.5;

    &:hover {
      opacity: 1;
      text-decoration: none;
      transition: opacity 300ms ease-in-out;
    }
  }
`;

const Button = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;
`;

const NavLink = styled.h5`
  height: auto;
  margin: 0;
  text-transform: none;
  font-family: "IBM Plex Sans", "Helvetica Neue", "Segoe UI", "Helvetica",
    "Arial", sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  font-style: normal;
  font-size: 1rem;
`;

const Icon = styled.img`
  width: 25px;
  margin-right: 1em;
`;

class Index extends Component {
  render() {
    const {
      data: { homepage, posts, category },
    } = this.props;
    return (
      <Layout>
        <Wrapper>
          <Header />
        </Wrapper>
        <Hero>
          {/*<Background src={Backgroundshape} />*/}
          <Wrapper>
            <h1>{homepage.data.title.text}</h1>
            <HeroText
              dangerouslySetInnerHTML={{ __html: homepage.data.content.html }}
            />
          </Wrapper>
        </Hero>
        <Wrapper>
          <Content>
            <Wrapper
              style={{ paddingTop: "2rem", marginLeft: "0", marginRight: "0" }}
            >
              <Title style={{ marginTop: "4rem" }}>Categories</Title>
              <Category>
                {category.edges.map((c) => (
                  <CateogryItem>
                    <Link to={`/categories/${kebabCase(c.node.uid)}`}>
                      {c.node.data.name}
                    </Link>
                  </CateogryItem>
                ))}
              </Category>
            </Wrapper>
            <Wrapper style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
              <Title style={{ marginTop: "4rem" }}>Recent posts</Title>
              <Listing posts={posts.edges} />
            </Wrapper>
          </Content>
        </Wrapper>
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
    category: allPrismicCategory(sort: { fields: [data___name], order: ASC }) {
      edges {
        node {
          id
          uid
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
              fluid {
                ...GatsbyPrismicImageFluid
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
                  ... on PrismicCategory {
                    uid
                    id
                    data {
                      name
                    }
                  }
                }
              }
            }
            types {
              document {
                ... on PrismicType {
                  id
                  data {
                    name
                    icon {
                      fluid {
                        ...GatsbyPrismicImageFluid
                      }
                    }
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
