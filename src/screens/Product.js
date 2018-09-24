import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import ImageSlider from "react-native-image-slider";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import Screen from "../components/Screen";
import Text from "../components/Text";
import ProductType from "../components/ProductType";

class Product extends Component {
  state = {
    detailsOpen: false,
  };

  render() {
    const { navigation, productsState } = this.props;
    const productId = navigation.getParam("productId");
    const currentProduct = productsState.filter(product => product.id === productId)[0];
    const { id, name, description, details, photos, types } = currentProduct;
    const { detailsOpen } = this.state;

    return (
      <Screen>
        <View>
          <View
            style={{
              height: 300,
            }}
          >
            <ImageSlider images={photos.map(photo => photo.url)} />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}
          >
            <Text
              h4
              style={{
                fontWeight: "bold",
              }}
            >
              {name}
            </Text>
            <Text style={{ marginVertical: 10 }}>{description}</Text>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() =>
                this.setState(prevState => ({
                  detailsOpen: !prevState.detailsOpen,
                }))
              }
            >
              <Text>PRODUCT DETAILS</Text>
              <EvilIcons name={detailsOpen ? "chevron-down" : "chevron-up"} size={30} />
            </TouchableOpacity>
            <Text
              style={{
                display: detailsOpen ? "flex" : "none",
                marginBottom: 10,
              }}
            >
              {details}
            </Text>
            {types.map(type => (
              <ProductType
                key={type.id}
                navigation={navigation}
                productId={id}
                productType={type}
              />
            ))}
          </View>
        </View>
      </Screen>
    );
  }
}

Product.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  productsState: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapStateToProps = state => ({ productsState: state.product.products.products });

export default connect(
  mapStateToProps,
  null
)(Product);
