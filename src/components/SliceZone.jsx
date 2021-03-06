import React, { Component } from "react";
import PropTypes from "prop-types";
import { BodyText, CodeBlock, Image, Quote } from "slices";
import styled from "react-emotion";
import { prism } from "styles";

const Content = styled.div`
  ${prism};
  padding: 1rem 0;
  p,
  li {
    font-size: 16px;
    line-height: 26px;
    color: #727682;
    letter-spacing: -0.003em;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    code {
      padding: 0.2rem 0.5rem;
      margin: 0.5rem 0;
    }
  }
`;

export default class SliceZone extends Component {
  render() {
    const { allSlices } = this.props;
    const slice = allSlices.map((s) => {
      switch (s.slice_type) {
        // These are the API IDs of the slices
        case "text":
          return <BodyText key={s.id} input={s} />;
        case "codeblock":
          return <CodeBlock key={s.id} input={s} />;
        case "image":
          return <Image key={s.id} input={s} />;
        case "quote":
          return <Quote key={s.id} input={s} />;
        default:
          return null;
      }
    });
    return <Content>{slice}</Content>;
  }
}

SliceZone.propTypes = {
  allSlices: PropTypes.array.isRequired,
};
