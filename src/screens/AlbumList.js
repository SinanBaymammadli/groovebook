import React, { Component } from "react";
import { FlatList, View, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAlbums, getAlbumSettings, printAlbum } from "../redux/album/actions";
import Button from "../components/Button";
import AlbumCard from "../components/AlbumCard";
import LoadingModal from "../components/LoadingModal";
import Text from "../components/Text";
import AlbumBgImage from "../assets/images/album-bg.png";

class AlbumList extends Component {
  componentDidMount = async () => {
    const { navigation } = this.props;

    this.getAlbums();

    navigation.addListener("willFocus", () => {
      const { albumsState, loginState } = this.props;
      if (albumsState.create.success || albumsState.update.success || loginState.success) {
        this.getAlbums();
      }
    });
  };

  getAlbums = async () => {
    const { callGetAlbums, callGetAlbumSettings } = this.props;
    await callGetAlbumSettings();
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

    let AlbumListContent;

    // no user
    if (!currentUserState.success) {
      AlbumListContent = (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Join our monthly album subscription
          </Text>
          <Button
            title="Get started"
            onPress={() => navigation.navigate("SubscriptionRegisterPersonInfo")}
          />
        </View>
      );
    }

    // user but no album
    if (currentUserState.success && !albumsState.albums.albums.length) {
      AlbumListContent = (
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
    if (currentUserState.success && albumsState.albums.albums.length) {
      AlbumListContent = (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={albumsState.albums.albums}
            keyExtractor={this.keyExtractor}
            horizontal
            contentContainerStyle={{}}
            inverted
            ListEmptyComponent={
              <View>
                <Text>empty</Text>
              </View>
            }
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
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Button title="Add new album" onPress={() => this.createAlbum()} />
            </View>
          )}
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={AlbumBgImage}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />

        {AlbumListContent}

        <LoadingModal visible={albumsState.albums.loading} />
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
  albumSettingsState: PropTypes.shape({}).isRequired,
  callPrintAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUserState: state.auth.currentUser,
  albumsState: state.album,
  albumSettingsState: state.album.setting,
  loginState: state.auth.login,
});

export default connect(
  mapStateToProps,
  {
    callGetAlbums: getAlbums,
    callGetAlbumSettings: getAlbumSettings,
    callPrintAlbum: printAlbum,
  }
)(AlbumList);
