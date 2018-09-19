import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Gallery from "../components/Gallery";
import { createAlbum } from "../redux/album/actions";
import Modal from "../components/Modal";
import Text from "../components/Text";
import variables from "../styles/variables";

class AlbumPhotoSelected extends Component {
  onSubmit = async photos => {
    const { callCreateAlbum, navigation, authState } = this.props;

    if (authState.success) {
      await callCreateAlbum(photos);
      navigation.navigate("Album");
    } else {
      navigation.navigate("Register");
    }
  };

  render() {
    const { albumState } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Gallery
          onSubmit={this.onSubmit}
          minImageCount={1}
          maxImageCount={50}
          submitBtnText="UPLOAD PHOTOS"
        />

        <Modal visible={albumState.create.loading}>
          <ActivityIndicator />
          <Text>Loading</Text>
        </Modal>
      </View>
    );
  }
}

AlbumPhotoSelected.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  albumState: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  albumState: state.album,
  authState: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  {
    callCreateAlbum: createAlbum,
  }
)(AlbumPhotoSelected);
