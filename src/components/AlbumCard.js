import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Text from "./Text";
import variables from "../styles/variables";
import Button from "./Button";
import ProgressBar from "./ProgressBar";

const AlbumCard = ({ album, index, navigation, settings, onPrintPressed }) => (
  <View
    style={{
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: 300,
        marginLeft: 30,
        marginRight: index === 0 ? 30 : 0,
        borderWidth: 1,
        borderColor: variables.dividerColor,
        backgroundColor: variables.mainBgColor,
        padding: 30,
      }}
    >
      <Text>{`Created: ${album.created_at}`}</Text>
      <Text>{`Status: ${album.status.display_name}`}</Text>
      <Text>{`Photos: ${album.photos.length}/ ${settings.max_photo_count}`}</Text>
      <ProgressBar
        progress={album.photos.length / settings.max_photo_count}
        threshold={settings.min_photo_count / settings.max_photo_count}
      />
    </View>

    <View>
      {!album.ordered &&
        (album.photos.length < settings.max_photo_count && (
          <Button
            title="Add photos"
            onPress={() =>
              navigation.navigate("AlbumPhotoSelect", {
                albumId: album.id,
              })
            }
          />
        ))}
      {!album.ordered &&
        (album.photos.length >= settings.min_photo_count && (
          <Button title="Print now" onPress={onPrintPressed} />
        ))}
    </View>
  </View>
);

AlbumCard.propTypes = {
  album: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  settings: PropTypes.shape({}).isRequired,
};

export default AlbumCard;
