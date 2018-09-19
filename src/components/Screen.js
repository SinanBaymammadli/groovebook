import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import variables from "../styles/variables";

const Screen = ({ children, style }) => (
  <View style={{ flex: 1, backgroundColor: variables.mainBgColor }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: variables.mainBgColor,
          },
          style && style,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  </View>
);

Screen.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  style: PropTypes.shape({}),
};

Screen.defaultProps = {
  style: {},
};

export default Screen;
