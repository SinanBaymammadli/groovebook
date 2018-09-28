import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Gallery from "../components/Gallery";
import { createAlbum, updateAlbum } from "../redux/album/actions";
import LoadingModal from "../components/LoadingModal";

class AlbumPhotoSelected extends Component {
  onSubmit = async photos => {
    const { callCreateAlbum, callUpdateAlbum, navigation } = this.props;

    const albumId = navigation.getParam("albumId");

    if (albumId) {
      await callUpdateAlbum(photos, albumId);
    } else {
      await callCreateAlbum(photos);
    }

    const { albumState } = this.props;

    if (albumState.create.success || albumState.update.success) {
      navigation.navigate("AlbumList");
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
          submitBtnText="UPLOAD PHOTOS"
          allowUploadBeforeMinCountReached
          maxImageCount={albumState.setting.max_photo_count}
          minImageCount={albumState.setting.min_photo_count}
          uploadedImageCount={
            albumState.albums.albums[0].ordered ? 0 : albumState.albums.albums[0].photos.length
          }
        />

        <LoadingModal
          text="Uploading photos..."
          visible={albumState.create.loading || albumState.update.loading}
        />
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
    callUpdateAlbum: updateAlbum,
  }
)(AlbumPhotoSelected);
