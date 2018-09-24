import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductCard from "../components/ProductCard";
import LoadingModal from "../components/LoadingModal";
import { getProducts } from "../redux/product/actions";

class ProductList extends Component {
  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    const { navigation, callGetProducts } = this.props;
    const categoryId = navigation.getParam("categoryId");
    callGetProducts(categoryId);
  };

  keyExtractor = item => item.id.toString();

  render() {
    const { productsState, navigation } = this.props;

    return (
      <View>
        <FlatList
          data={productsState.products}
          keyExtractor={this.keyExtractor}
          onRefresh={this.getProducts}
          refreshing={productsState.loading}
          renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        />
        <LoadingModal visible={productsState.loading} />
      </View>
    );
  }
}

ProductList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  callGetProducts: PropTypes.func.isRequired,
  productsState: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  productsState: state.product.products,
});

export default connect(
  mapStateToProps,
  {
    callGetProducts: getProducts,
  }
)(ProductList);
