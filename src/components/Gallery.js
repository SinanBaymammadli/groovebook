import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, CameraRoll, PermissionsAndroid, Alert, Text } from "react-native";
import { IOS, screenWidth } from "../constants";
import GalleryItem from "./GalleryItem";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import variables from "../styles/variables";

const COLUMN_COUNT = 4;
const GET_PHOTO_COUNT = 50;

class Gallery extends Component {
  state = {
    roll: {
      edges: [],
    },
    totalCount: 0,
  };

  componentDidMount = async () => {
    const { maxImageCount, uploadedImageCount } = this.props;
    this.MAX_IMAGE_COUNT = maxImageCount;

    this.setState({
      totalCount: uploadedImageCount,
    });

    if (IOS) {
      this.getPhotos();
    } else {
      this.getPermissionAndroid();
    }
  };

  getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Access Storage",
          message: "Access Storage for the pictures",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getPhotos();
      } else {
        console.log("Storage permission denied");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  getPhotos = async after => {
    try {
      const roll = await CameraRoll.getPhotos({
        after,
        first: GET_PHOTO_COUNT,
      });

      this.setState(prevState => ({
        roll: {
          edges: [...prevState.roll.edges, ...roll.edges],
          page_info: roll.page_info,
        },
      }));
    } catch (error) {
      console.warn(error);
    }
  };

  onEndReached = () => {
    const {
      roll: { page_info },
    } = this.state;

    if (page_info && page_info.has_next_page) {
      this.getPhotos(page_info.end_cursor);
    }
  };

  toggleImage = index => {
    const {
      roll: { edges },
      totalCount,
    } = this.state;

    const isSelecting = !edges[index].node.selected;

    if (isSelecting && totalCount >= this.MAX_IMAGE_COUNT) {
      this.maxValueReached();
    } else {
      this.setState(prevState => ({
        totalCount: prevState.roll.edges[index].node.selected
          ? prevState.totalCount - prevState.roll.edges[index].node.count
          : prevState.totalCount + 1,
        roll: {
          edges: prevState.roll.edges.map((edge, edgeIndex) => {
            if (edgeIndex !== index) {
              return edge;
            }

            return {
              node: {
                ...edge.node,
                count: 1,
                selected: !edge.node.selected,
              },
            };
          }),
        },
      }));
    }
  };

  incrementImageCount = index => {
    const { totalCount } = this.state;

    if (totalCount < this.MAX_IMAGE_COUNT) {
      this.setState(prevState => ({
        totalCount: prevState.totalCount + 1,
        roll: {
          edges: prevState.roll.edges.map((edge, edgeIndex) => {
            if (edgeIndex !== index) {
              return edge;
            }

            return {
              node: {
                ...edge.node,
                count: edge.node.count + 1,
              },
            };
          }),
        },
      }));
    } else {
      this.maxValueReached();
    }
  };

  decrementImageCount = index => {
    const {
      roll: { edges },
    } = this.state;

    if (edges[index].node.count > 1) {
      this.setState(prevState => ({
        totalCount: prevState.totalCount - 1,
        roll: {
          edges: prevState.roll.edges.map((edge, edgeIndex) => {
            if (edgeIndex !== index) {
              return edge;
            }

            return {
              node: {
                ...edge.node,
                count: edge.node.count - 1,
              },
            };
          }),
        },
      }));
    }
  };

  unSelectAll = () => {
    this.setState(prevState => ({
      totalSelectedCount: 0,
      roll: {
        edges: prevState.roll.edges.map(edge => ({
          node: {
            ...edge.node,
            selected: false,
            count: 0,
          },
        })),
      },
    }));
  };

  maxValueReached = () => {
    Alert.alert(
      "Maximum number reached",
      "My Alert Msg",
      [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "Add to cart", onPress: () => this.onSubmit() },
      ],
      { cancelable: false }
    );
  };

  chooseSelectedPhotos = () => {
    const {
      roll: { edges },
    } = this.state;

    const selectedPhotos = edges.filter(edge => edge.node.selected);

    return selectedPhotos;
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const selectedPhotos = this.chooseSelectedPhotos();
    onSubmit(selectedPhotos);
    this.unSelectAll();
  };

  keyExtractor = item => item.node.timestamp.toString();

  render() {
    const { roll, totalCount } = this.state;
    const {
      submitBtnText,
      minImageCount,
      uploadedImageCount,
      allowUploadBeforeMinCountReached,
    } = this.props;

    const uploadBtnDisabled = allowUploadBeforeMinCountReached
      ? totalCount - uploadedImageCount < 1
      : totalCount - uploadedImageCount < minImageCount;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={roll.edges}
          keyExtractor={this.keyExtractor}
          numColumns={COLUMN_COUNT}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => (
            <GalleryItem
              item={item}
              index={index}
              width={screenWidth / COLUMN_COUNT}
              toggleImage={this.toggleImage}
              incrementImageCount={this.incrementImageCount}
              decrementImageCount={this.decrementImageCount}
            />
          )}
        />
        <View
          style={{
            backgroundColor: variables.mainBgColor,
            borderTopWidth: 1,
            borderTopColor: variables.dividerColor,
            padding: 10,
          }}
        >
          <ProgressBar
            progress={totalCount / this.MAX_IMAGE_COUNT}
            threshold={minImageCount / this.MAX_IMAGE_COUNT}
          />
          <Text
            style={{
              textAlign: "right",
              marginVertical: 5,
            }}
          >
            {totalCount} / {this.MAX_IMAGE_COUNT}
          </Text>

          <Button title={submitBtnText} onPress={this.onSubmit} disabled={uploadBtnDisabled} />
        </View>
      </View>
    );
  }
}

Gallery.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  maxImageCount: PropTypes.number.isRequired,
  submitBtnText: PropTypes.string.isRequired,
  minImageCount: PropTypes.number.isRequired,
  uploadedImageCount: PropTypes.number,
  allowUploadBeforeMinCountReached: PropTypes.bool,
};

Gallery.defaultProps = {
  uploadedImageCount: 0,
  allowUploadBeforeMinCountReached: false,
};

export default Gallery;
