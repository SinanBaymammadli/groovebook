import { createStackNavigator } from "react-navigation";
import CategoryList from "../screens/CategoryList";
import ProductList from "../screens/ProductList";
import Product from "../screens/Product";
import ProductPhotoSelect from "../screens/ProductPhotoSelect";

const ProductNav = createStackNavigator(
  {
    CategoryList: {
      screen: CategoryList,
      navigationOptions: {
        title: "Categories",
      },
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        title: "Products",
      },
    },
    Product: {
      screen: Product,
      navigationOptions: {
        title: "Product",
      },
    },
    ProductPhotoSelect: {
      screen: ProductPhotoSelect,
      navigationOptions: {
        title: "Photo select",
      },
    },
  },
  {
    initialRouteName: "CategoryList",
  }
);

export default ProductNav;
