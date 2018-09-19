import React from "react";
import PropTypes from "prop-types";
import { Button as NativeButton } from "react-native-elements";
import variables from "../styles/variables";

const Button = ({ title, outline, ...rest }) => (
  <NativeButton
    title={title.toUpperCase()}
    titleStyle={{
      fontSize: 16,
      color: outline ? variables.accentColor : variables.secondaryTextColor,
    }}
    buttonStyle={{
      backgroundColor: outline ? variables.mainBgColor : variables.accentColor,
      borderColor: variables.accentColor,
      borderWidth: outline ? 1 : 0,
      height: 50,
      elevation: 0,
      borderRadius: 5,
    }}
    loadingProps={{
      size: "large",
      color: outline ? variables.accentColor : variables.secondaryTextColor,
    }}
    {...rest}
  />
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  outline: PropTypes.bool,
};

Button.defaultProps = {
  outline: false,
};

export default Button;
