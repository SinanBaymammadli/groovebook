import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import Modal from "./Modal";
import Text from "./Text";

const LoadingModal = ({ visible }) => (
  <Modal visible={visible}>
    <ActivityIndicator size="large" />
    <Text>Loading</Text>
  </Modal>
);

LoadingModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoadingModal;
