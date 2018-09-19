import React from "react";
import PropTypes from "prop-types";
import { Text as NativeText } from "react-native-elements";
import variables from "../styles/variables";

const Text = ({ style, children, h1, h2, h3, h4, error }) => (
  <NativeText
    h1={h1}
    h2={h2}
    h3={h3}
    h4={h4}
    style={[
      {
        color: variables.mainTextColor,
        fontWeight: "normal",
      },
      !h1 && !h2 && !h3 && !h4 && { fontSize: 16 },
      error && {
        fontSize: 12,
        color: variables.dangerColor,
        marginBottom: 5,
      },
      style && style,
    ]}
  >
    {children}
  </NativeText>
);

Text.propTypes = {
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Text.defaultProps = {
  style: {},
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  error: false,
};

export default Text;
