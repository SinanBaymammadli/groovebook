import { createStackNavigator } from "react-navigation";
import Cart from "../screens/Cart";

const CartNav = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: "Cart",
    },
  },
});

export default CartNav;
