import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import variables from "../styles/variables";

const GalleryItem = ({
  item,
  index,
  width,
  toggleImage,
  incrementImageCount,
  decrementImageCount,
}) => {
  const { uri } = item.node.image;

  return (
    <TouchableOpacity
      style={{
        width,
        height: width,
        padding: 2,
      }}
      onPress={() => toggleImage(index)}
    >
      <View>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={{ uri }}
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
            <TouchableOpacity
              style={{
                padding: 5,
              }}
              onPress={() => incrementImageCount(index)}
            >
              <Entypo name="plus" size={25} color="#fff" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => decrementImageCount(index)}
              >
                <Entypo name="minus" size={25} color="#fff" />
              </TouchableOpacity>

              <View
                style={{
                  padding: 5,
                }}
              >
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
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

GalleryItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  toggleImage: PropTypes.func.isRequired,
  incrementImageCount: PropTypes.func.isRequired,
  decrementImageCount: PropTypes.func.isRequired,
};

export default GalleryItem;
