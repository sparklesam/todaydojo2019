import React, { Component } from "react";
import styled from "react-emotion";
import { Layout, Listing, Wrapper, Title, Header } from "components";
import Link from "gatsby-link";

const Section = styled(Wrapper)`
  padding-top: 4rem;
`;
const Paragraph = styled.div`
  margin-bottom: 2rem;
`;

class Changelog extends Component {
  render() {
    return (
      <Layout>
        <Wrapper>
          <Header />
        </Wrapper>
        <Section>
          <h1>Changelog</h1>
        </Section>
        <Section>
          <Paragraph>
            <h3>Feb 2019</h3>
            <li>Added Changelog page</li>
            <li> Updated Open Graph Thumbnail for all categories.</li>
          </Paragraph>
          <Paragraph>
            <h3>Jan 2019</h3>
            <li>
              Added{" "}
              <Link to="/categories/design-conference">Design Conference</Link>,{" "}
              <Link to="/categories/figma">Figma</Link> category
            </li>
          </Paragraph>
        </Section>
      </Layout>
    );
  }
}
export default Changelog;
