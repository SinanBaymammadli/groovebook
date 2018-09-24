import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View } from "react-native";
import Modal from "./Modal";
import Text from "./Text";

const LoadingModal = ({ visible, text }) => (
  <Modal visible={visible}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" />
      <Text
        style={{
          marginLeft: 20,
        }}
      >
        {text || "Loading..."}
      </Text>
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoadingModal;
