import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAlbums } from "../redux/album/actions";
import Button from "../components/Button";

class AlbumList extends Component {
  componentDidMount = () => {
    this.getAlbums();
  };

  getAlbums = () => {
    const { callGetAlbums } = this.props;
    callGetAlbums();
  };

  keyExtractor = item => item.id.toString();

  render() {
    const { navigation, albumsState } = this.props;

    return (
      <View>
        {albumsState.albums.length === 0 ? (
          <View>
            <Text>hello</Text>
            <Button
              title="Create your first"
              onPress={() => navigation.navigate("RegisterPersonInfo")}
            />
          </View>
        ) : (
          <FlatList
            data={albumsState.categories}
            keyExtractor={this.keyExtractor}
            onRefresh={this.getAlbums}
            refreshing={albumsState.loading}
            renderItem={({ item }) => <Text>hello</Text>}
          />
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
};

const mapStateToProps = state => ({
  albumsState: state.album.albums,
});

export default connect(
  mapStateToProps,
  {
    callGetAlbums: getAlbums,
  }
)(AlbumList);
