import { createStackNavigator } from "react-navigation";
import RegisterPersonInfo from "../screens/RegisterPersonInfo";
import RegisterAddressInfo from "../screens/RegisterAddressInfo";
import Login from "../screens/Login";

const AuthNav = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Sign in",
    },
  },
  RegisterPersonInfo: {
    screen: RegisterPersonInfo,
    navigationOptions: {
      title: "Account Information",
    },
  },
  RegisterAddressInfo: {
    screen: RegisterAddressInfo,
    navigationOptions: {
      title: "Shipping Adress",
    },
  },
});

export default AuthNav;
