import React from "react";
import PropTypes from "prop-types";

import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Ionicons from "react-native-vector-icons/Ionicons";
import Text from "./Text";
import variables from "../styles/variables";

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLabel: undefined,
      selectedValue: undefined,
    };
  }

  render() {
    const { input, meta, options, placeholder, ...rest } = this.props;
    const { selectedValue, selectedLabel } = this.state;
    const invalid = meta.error && meta.touched;

    return (
      <View>
        <RNPickerSelect
          onValueChange={(value, index) => {
            this.setState(
              {
                selectedValue: value,
                selectedLabel: options[index - 1] && options[index - 1].label,
              },
              input.onChange(value)
            );
          }}
          value={selectedValue}
          {...rest}
          items={options}
        >
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: variables.lightTextColor,
            }}
          >
            <Text
              style={{
                color: selectedLabel ? variables.mainTextColor : variables.lightTextColor,
              }}
            >
              {selectedLabel || placeholder}
            </Text>
            <View
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
              }}
            >
              <Ionicons name="ios-arrow-dropdown" color={variables.lightTextColor} size={25} />
            </View>
          </View>
        </RNPickerSelect>
        {invalid && <Text error>{meta.error}</Text>}
      </View>
    );
  }
}

export default Select;

Select.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
