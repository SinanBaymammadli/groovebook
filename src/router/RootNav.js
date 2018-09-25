import { createStackNavigator } from "react-navigation";
import RootTabNav from "./RootTabNav";
import AuthNav from "./AuthNav";

const RootNav = createStackNavigator(
  {
    RootTabNav: {
      screen: RootTabNav,
      navigationOptions: {
        title: "RootTabNav",
        header: null,
      },
    },
    AuthNav: {
      screen: AuthNav,
      navigationOptions: {
        title: "AuthNav",
        header: null,
      },
    },
  },
  {
    initialRouteName: "RootTabNav",
  }
);

export default RootNav;
