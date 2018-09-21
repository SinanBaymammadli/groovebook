import { createStackNavigator } from "react-navigation";
import RegisterPersonInfo from "../screens/RegisterPersonInfo";
import RegisterAddressInfo from "../screens/RegisterAddressInfo";

const AuthNav = createStackNavigator({
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
