import React from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "./Text";
import ScaledImage from "./ScaledImage";
import formatPrice from "../helpers/formatPrice";

import variables from "../styles/variables";

const CartItem = ({
  item: {
    count,
    uuid,
    productType: { name, detail, price, imgUrl },
  },
  decrementCartItem,
  incrementCartItem,
  deleteCartItem,
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: variables.dividerColor,
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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>{name}</Text>
          <Text>{detail}</Text>
          <Text>{formatPrice(price)}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: variables.mainTextColor,
              borderRadius: 30 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => deleteCartItem(uuid)}
          >
            <Text
              style={{
                color: variables.mainBgColor,
                fontWeight: "bold",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            backgroundColor: variables.dividerColor,
            borderRadius: 25 / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={count === 1}
          onPress={() => decrementCartItem(uuid)}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginHorizontal: 20,
          }}
        >{`${count}`}</Text>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            backgroundColor: variables.dividerColor,
            borderRadius: 25 / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => incrementCartItem(uuid)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    productType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  decrementCartItem: PropTypes.func.isRequired,
  incrementCartItem: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default CartItem;
