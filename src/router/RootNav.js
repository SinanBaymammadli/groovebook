import { createSwitchNavigator } from "react-navigation";
import RootTabNav from "./RootTabNav";
import AuthNav from "./AuthNav";

const RootNav = createSwitchNavigator(
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
