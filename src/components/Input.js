import React from "react";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";
import variables from "../styles/variables";
import Text from "./Text";

const Input = props => {
  const { input, meta, ...inputProps } = props;

  const invalid = meta.error && meta.touched;

  return (
    <View>
      <TextInput
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        {...inputProps}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: variables.lightTextColor,
          marginBottom: 10,
          padding: 10,
        }}
        placeholderTextColor={variables.lightTextColor}
      />
      {invalid && <Text error>{meta.error}</Text>}
    </View>
  );
};

Input.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Input;
