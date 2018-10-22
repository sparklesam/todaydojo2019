import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Content = styled.div`
  max-width: 720px;
`;

const BodyText = ({ input }) => <Content dangerouslySetInnerHTML={{ __html: input.primary.text.html }} />;

export default BodyText;

BodyText.propTypes = {
  input: PropTypes.object.isRequired,
};
