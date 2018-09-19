import React from "react";
import PropTypes from "prop-types";
import { Modal as NativeModal, TouchableOpacity } from "react-native";

const Modal = ({ children, visible, onBackDropPressed }) => (
  <NativeModal
    animationType="fade"
    hardwareAccelerated
    transparent
    visible={visible}
    onRequestClose={() => null}
  >
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      activeOpacity={1}
      onPress={onBackDropPressed}
    >
      <TouchableOpacity
        style={{
          marginHorizontal: 16,
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 5,
          elevation: 10,
        }}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </TouchableOpacity>
  </NativeModal>
);

Modal.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  visible: PropTypes.bool.isRequired,
  onBackDropPressed: PropTypes.func,
};

Modal.defaultProps = {
  onBackDropPressed: () => null,
};

export default Modal;
