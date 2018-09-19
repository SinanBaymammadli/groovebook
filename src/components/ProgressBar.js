import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import variables from "../styles/variables";

const ProgressBar = ({
  progress,
  threshold,
  bgColor,
  progressActiveColor,
  progressInactiveColor,
  height,
  minIndicatorColor,
}) => (
  <View>
    <View
      style={{
        height,
        backgroundColor: bgColor,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: progress >= threshold ? progressActiveColor : progressInactiveColor,
        }}
      />
      <View
        style={{
          height: "100%",
          position: "absolute",
          left: `${threshold * 100}%`,
          width: 1,
          backgroundColor: minIndicatorColor,
        }}
      />
    </View>
  </View>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  threshold: PropTypes.number.isRequired,
  bgColor: PropTypes.string,
  progressActiveColor: PropTypes.string,
  progressInactiveColor: PropTypes.string,
  height: PropTypes.number,
  minIndicatorColor: PropTypes.string,
};

ProgressBar.defaultProps = {
  bgColor: variables.dividerColor,
  progressActiveColor: variables.accentColor,
  progressInactiveColor: variables.lightAccentColor,
  height: 20,
  minIndicatorColor: variables.primaryTextColor,
};

export default ProgressBar;
