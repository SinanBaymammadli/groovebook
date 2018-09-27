import { createSwitchNavigator } from "react-navigation";
import RootTabNav from "./RootTabNav";
import AuthNav from "./AuthNav";
import IntroNav from "./IntroNav";

const createRootNav = seenIntro =>
  createSwitchNavigator(
    {
      IntroNav: {
        screen: IntroNav,
        navigationOptions: {
          title: "IntroNav",
          header: null,
        },
      },
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
      initialRouteName: seenIntro ? "RootTabNav" : "IntroNav",
    }
  );

export default createRootNav;
