import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Text from "./Text";
import ScaledImage from "./ScaledImage";
import formatPrice from "../helpers/formatPrice";
import variables from "../styles/variables";

const ProductType = ({
  navigation,
  productId,
  productType: { id, name, detail, price, imgUrl, photoCount },
}) => (
  <TouchableOpacity
    style={{
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: variables.dividerColor,
    }}
    onPress={() =>
      navigation.navigate("ProductPhotoSelect", {
        productId,
        productTypeId: id,
        minImageCount: photoCount,
        maxImageCount: photoCount,
      })
    }
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ScaledImage
        source={{ uri: imgUrl }}
        style={{
          width: 50,
          marginRight: 20,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>{name}</Text>
        <Text>{detail}</Text>
        <Text>{formatPrice(price)}</Text>
      </View>

      <EvilIcons name="chevron-right" size={30} />
    </View>
  </TouchableOpacity>
);

ProductType.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  productType: PropTypes.shape({}).isRequired,
  productId: PropTypes.number.isRequired,
};

export default ProductType;
