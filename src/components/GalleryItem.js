import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import variables from "../styles/variables";

const GalleryItem = ({ item, index, screenWidth, toggleImage, changeCount, disabled }) => (
  <TouchableOpacity
    style={{
      width: screenWidth / 4,
      height: screenWidth / 4,
      padding: 2,
    }}
    onPress={() => toggleImage(index, item.node.count)}
  >
    <View>
      <Image
        style={{
          width: "100%",
          height: "100%",
        }}
        source={{ uri: item.node.image.uri }}
      />
      {item.node.selected && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            alignItems: "flex-end",
          }}
        >
          {!disabled && (
            <TouchableOpacity
              style={{
                padding: 5,
              }}
              onPress={() => changeCount(index, 1)}
            >
              <Entypo name="plus" size={25} color="#fff" />
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {item.node.count > 1 && (
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => changeCount(index, -1)}
              >
                <Entypo name="minus" size={25} color="#fff" />
              </TouchableOpacity>
            )}

            <View
              style={{
                padding: 5,
              }}
            >
              {item.node.count > 1 ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: variables.accentColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: variables.secondaryTextColor,
                      fontSize: 18,
                    }}
                  >
                    {item.node.count}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    backgroundColor: variables.accentColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons name="check" size={20} color={variables.secondaryTextColor} />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

GalleryItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  screenWidth: PropTypes.number.isRequired,
  toggleImage: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GalleryItem;
