import { createStackNavigator } from "react-navigation";
import Register from "../screens/Register";

const AuthNav = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register",
      header: null,
    },
  },
});

export default AuthNav;
