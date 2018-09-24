import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import Gallery from "../components/Gallery";
import { addProductTypeToCart } from "../redux/cart/actions";

class PhotoSelected extends Component {
  state = {};

  onSubmit = async photos => {
    const { navigation, callAddProductTypeToCart, products } = this.props;
    const productTypeId = navigation.getParam("productTypeId");
    const productId = navigation.getParam("productId");
    const selectedProduct = products.filter(product => product.id === productId)[0];
    const productType = selectedProduct.types.filter(type => type.id === productTypeId)[0];

    await callAddProductTypeToCart({
      uuid: uuid(),
      count: 1,
      productType,
      photos,
    });

    navigation.navigate("Cart");
  };

  render() {
    const { navigation } = this.props;
    const minImageCount = navigation.getParam("minImageCount");
    const maxImageCount = navigation.getParam("maxImageCount");

    return (
      <Gallery
        onSubmit={this.onSubmit}
        minImageCount={minImageCount}
        maxImageCount={maxImageCount}
        submitBtnText="ADD TO CART"
      />
    );
  }
}

PhotoSelected.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  callAddProductTypeToCart: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapStateToProps = state => ({
  products: state.product.products.products,
});

export default connect(
  mapStateToProps,
  {
    callAddProductTypeToCart: addProductTypeToCart,
  }
)(PhotoSelected);
