import { createStackNavigator } from "react-navigation";
import RegisterPersonInfo from "../screens/RegisterPersonInfo";
import RegisterAddressInfo from "../screens/RegisterAddressInfo";

const AuthNav = createStackNavigator({
  RegisterPersonInfo: {
    screen: RegisterPersonInfo,
    navigationOptions: {
      title: "RegisterPersonInfo",
      header: null,
    },
  },
  RegisterAddressInfo: {
    screen: RegisterAddressInfo,
    navigationOptions: {
      title: "RegisterAddressInfo",
      header: null,
    },
  },
});

export default AuthNav;
