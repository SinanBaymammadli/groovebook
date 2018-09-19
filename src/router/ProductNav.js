import { createStackNavigator } from "react-navigation";
import CategoryList from "../screens/CategoryList";
import ProductList from "../screens/ProductList";
// import Product from "../screens/Product";
// import PhotoSelect from "../screens/PhotoSelect";

const ProductNav = createStackNavigator(
  {
    CategoryList: {
      screen: CategoryList,
      navigationOptions: {
        title: "CategoryList",
      },
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        title: "ProductList",
      },
    },
    // Product: {
    //   screen: Product,
    //   navigationOptions: {
    //     title: "Product",
    //   },
    // },
    // PhotoSelect: {
    //   screen: PhotoSelect,
    //   navigationOptions: {
    //     title: "PhotoSelect",
    //   },
    // },
  },
  {
    initialRouteName: "CategoryList",
  }
);

export default ProductNav;
