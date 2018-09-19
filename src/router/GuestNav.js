import { createStackNavigator } from "react-navigation";

import Login from "../screens/Login";
import Register from "../screens/Register";

const GuestNav = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: "Login",
  }
);

export default GuestNav;
