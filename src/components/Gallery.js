import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  CameraRoll,
  PermissionsAndroid,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";

import Screen from "./Screen";
import variables from "../styles/variables";
import ProgressBar from "./ProgressBar";
import GalleryItem from "./GalleryItem";
import Button from "./Button";
import { IOS } from "../constants";

class Gallery extends Component {
  state = {
    roll: {
      edges: [],
      page_info: {
        has_next_page: true,
      },
    },
    screenWidth: 0,
    totalSelectedCount: 0,
    minValueReached: false,
  };

  componentDidMount = async () => {
    const { minImageCount, maxImageCount } = this.props;
    this.MAX_IMAGE_COUNT = maxImageCount;
    this.MIN_IMAGE_COUNT = minImageCount;

    if (IOS) {
      this.getPhotos();
    } else {
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
      } catch (err) {
        console.warn(err);
      }
    }
  };

  getPhotos = () => {
    const { width } = Dimensions.get("window");
    CameraRoll.getPhotos({
      first: 50,
      assetType: "Photos",
    })
      .then(roll => {
        this.setState({
          roll,
          screenWidth: width,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  keyExtractor = item => item.node.timestamp.toString();

  maxValueReached = () => {
    Alert.alert(
      "Maximum number reached",
      "My Alert Msg",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Add to cart", onPress: () => this.onSubmit() },
      ],
      { cancelable: false }
    );
  };

  totalSelectedCountChanged = () => {
    const { totalSelectedCount } = this.state;
    this.setState({
      minValueReached: totalSelectedCount >= this.MIN_IMAGE_COUNT,
    });
  };

  toggleImage = (index, count) => {
    // probably could make this function more simple by
    // toggling TouchableOpacity
    this.setState(
      prevState => {
        let { totalSelectedCount } = prevState;

        // if true that means we are unselecting image
        if (prevState.roll.edges[index].node.selected) {
          totalSelectedCount = prevState.totalSelectedCount - (count || 1);
        }
        // otherwise if we are selecting image
        // alse check if that we haven't reached max value yet
        else if (prevState.totalSelectedCount < this.MAX_IMAGE_COUNT) {
          totalSelectedCount = prevState.totalSelectedCount + (count || 1);
        } else {
          // call max value reached function
          this.maxValueReached();
        }

        return {
          totalSelectedCount,
          roll: {
            edges: prevState.roll.edges.map((edge, edgeIndex) => {
              if (edgeIndex !== index) {
                return edge;
              }

              return {
                node: {
                  ...edge.node,
                  count:
                    // if max value reached only allow to unselect
                    prevState.totalSelectedCount < this.MAX_IMAGE_COUNT
                      ? (edge.node.count || 0) + (count || 1)
                      : 0,
                  selected:
                    // if max value reached only allow to unselect
                    prevState.totalSelectedCount < this.MAX_IMAGE_COUNT
                      ? !edge.node.selected
                      : false,
                },
              };
            }),
          },
        };
      },
      () => {
        this.totalSelectedCountChanged();
      }
    );
  };

  unSelectAll = () => {
    this.setState(
      prevState => ({
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
      }),
      () => {
        this.totalSelectedCountChanged();
      }
    );
  };

  changeCount = (index, value) => {
    this.setState(
      prevState => ({
        totalSelectedCount: prevState.totalSelectedCount + value,
        roll: {
          edges: prevState.roll.edges.map((edge, edgeIndex) => {
            if (edgeIndex !== index) {
              return edge;
            }

            return {
              node: {
                ...edge.node,
                count: (edge.node.count || 1) + value,
              },
            };
          }),
        },
      }),
      () => {
        this.totalSelectedCountChanged();
      }
    );
  };

  preparePhotosToUpload = () => {
    const {
      roll: { edges },
    } = this.state;

    const photos = edges.filter(edge => edge.node.selected);

    return photos;
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    const photosToUpload = this.preparePhotosToUpload();
    onSubmit(photosToUpload);
    this.unSelectAll();
  };

  render() {
    const { roll, screenWidth, totalSelectedCount, minValueReached } = this.state;
    const { submitBtnText } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Screen
          style={{
            paddingHorizontal: 0,
          }}
        >
          <FlatList
            data={roll.edges}
            keyExtractor={this.keyExtractor}
            numColumns={4}
            renderItem={({ item, index }) => (
              <GalleryItem
                item={item}
                index={index}
                screenWidth={screenWidth}
                toggleImage={this.toggleImage}
                changeCount={this.changeCount}
                disabled={totalSelectedCount >= this.MAX_IMAGE_COUNT}
              />
            )}
          />
        </Screen>
        <View
          style={{
            backgroundColor: variables.mainBgColor,
            borderTopWidth: 1,
            borderTopColor: variables.dividerColor,
            padding: 10,
          }}
        >
          <ProgressBar
            progress={totalSelectedCount / this.MAX_IMAGE_COUNT}
            threshold={this.MIN_IMAGE_COUNT / this.MAX_IMAGE_COUNT}
          />
          <Text
            style={{
              textAlign: "right",
              marginVertical: 5,
            }}
          >
            {totalSelectedCount} / {this.MAX_IMAGE_COUNT}
          </Text>

          <Button title={submitBtnText} onPress={this.onSubmit} disabled={!minValueReached} />
        </View>
      </View>
    );
  }
}

Gallery.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  minImageCount: PropTypes.number.isRequired,
  maxImageCount: PropTypes.number.isRequired,
  submitBtnText: PropTypes.string.isRequired,
};

export default Gallery;
