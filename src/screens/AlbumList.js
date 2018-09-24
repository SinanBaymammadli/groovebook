import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAlbums, getAlbumSettings, printAlbum } from "../redux/album/actions";
import Button from "../components/Button";
import AlbumCard from "../components/AlbumCard";
import LoadingModal from "../components/LoadingModal";

class AlbumList extends Component {
  componentDidMount = async () => {
    const { navigation, callGetAlbumSettings } = this.props;

    console.log("ALbumList cdm");

    await callGetAlbumSettings();
    this.getAlbums();

    navigation.addListener("willFocus", () => {
      const { albumsState } = this.props;
      if (albumsState.create.success || albumsState.update.success) {
        this.getAlbums();
      }
    });
  };

  getAlbums = () => {
    const { callGetAlbums } = this.props;
    callGetAlbums();
  };

  keyExtractor = item => item.id.toString();

  createAlbum = () => {
    const { navigation } = this.props;

    navigation.navigate("AlbumPhotoSelect");
  };

  render() {
    const {
      navigation,
      albumsState,
      currentUserState,
      albumSettingsState,
      callPrintAlbum,
    } = this.props;

    if (albumsState.albums.loading) {
      return <LoadingModal visible />;
    }

    if (!currentUserState.success) {
      // no user
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>hello</Text>
          <Button title="Join us" onPress={() => navigation.navigate("RegisterPersonInfo")} />
        </View>
      );
    }

    if (!albumsState.albums.albums.length) {
      // user but no album
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>hello</Text>
          <Button title="Create your first" onPress={() => this.createAlbum()} />
        </View>
      );
    }

    // user with album
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={albumsState.albums.albums}
          keyExtractor={this.keyExtractor}
          horizontal
          inverted
          renderItem={({ item, index }) => (
            <AlbumCard
              index={index}
              album={item}
              navigation={navigation}
              settings={albumSettingsState}
              onPrintPressed={async () => {
                await callPrintAlbum(item.id);
                this.getAlbums();
              }}
            />
          )}
        />

        {!!albumsState.albums.albums[0].ordered && (
          <View>
            <Text>hello</Text>
            <Button title="Add new album" onPress={() => this.createAlbum()} />
          </View>
        )}
      </View>
    );
  }
}

AlbumList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  callGetAlbums: PropTypes.func.isRequired,
  albumsState: PropTypes.shape({}).isRequired,
  currentUserState: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  currentUserState: state.auth.currentUser,
  albumsState: state.album,
  albumSettingsState: state.album.setting,
});

export default connect(
  mapStateToProps,
  {
    callGetAlbums: getAlbums,
    callGetAlbumSettings: getAlbumSettings,
    callPrintAlbum: printAlbum,
  }
)(AlbumList);
