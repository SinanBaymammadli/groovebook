import React from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import Text from "./Text";
import variables from "../styles/variables";
import formatPrice from "../helpers/formatPrice";

const { width } = Dimensions.get("window");

const ProductCard = ({ navigation, product: { id, name, photos, types } }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("Product", {
        productId: id,
      })
    }
    style={{
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: variables.dividerColor,
      overflow: "hidden",
      backgroundColor: variables.mainBgColor,
    }}
  >
    <Image
      source={{ uri: photos[0].url }}
      style={{
        width: "100%",
        height: (width * 9) / 16,
      }}
    />
    <View
      style={{
        paddingVertical: 24,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            marginBottom: 5,
          }}
        >
          30 x 40 cm
        </Text>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginBottom: 5,
            textAlign: "right",
          }}
        >
          Per stk.
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: variables.accentColor,
            marginLeft: 30,
          }}
        >
          {formatPrice(types[0].price)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

ProductCard.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
