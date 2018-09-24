import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CategoryCard from "../components/CategoryCard";
import LoadingModal from "../components/LoadingModal";
import { getCategories } from "../redux/product/actions";

class CategoryList extends Component {
  componentDidMount = () => {
    this.getCategories();
  };

  getCategories = () => {
    const { callGetCategories } = this.props;
    callGetCategories();
  };

  keyExtractor = item => item.id.toString();

  render() {
    const { navigation, categoriesState } = this.props;

    return (
      <View>
        <FlatList
          data={categoriesState.categories}
          keyExtractor={this.keyExtractor}
          onRefresh={this.getCategories}
          refreshing={categoriesState.loading}
          renderItem={({ item }) => <CategoryCard category={item} navigation={navigation} />}
        />
        <LoadingModal visible={categoriesState.loading} />
      </View>
    );
  }
}

CategoryList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  callGetCategories: PropTypes.func.isRequired,
  categoriesState: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  categoriesState: state.product.categories,
});

export default connect(
  mapStateToProps,
  {
    callGetCategories: getCategories,
  }
)(CategoryList);
