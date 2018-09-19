import React from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Text from "./Text";

const { width } = Dimensions.get("window");

const CategoryCard = ({ category: { id, name, imgUrl }, navigation }) => (
  <TouchableOpacity
    style={{
      marginBottom: 2,
    }}
    onPress={() =>
      navigation.navigate("ProductList", {
        categoryId: id,
      })
    }
  >
    <Image
      source={{ uri: imgUrl }}
      style={{
        width,
        height: (width * 9) / 16,
      }}
    />
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          paddingHorizontal: 30,
          paddingVertical: 15,
        }}
      >
        <Text>{name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

CategoryCard.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
