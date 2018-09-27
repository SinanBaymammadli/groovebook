import { createStackNavigator } from "react-navigation";

import IntroFirst from "../screens/IntroFirst";
import IntroSecond from "../screens/IntroSecond";
import IntroThird from "../screens/IntroThird";

const IntroNav = createStackNavigator(
  {
    IntroFirst: {
      screen: IntroFirst,
      navigationOptions: {
        header: null,
      },
    },
    IntroSecond: {
      screen: IntroSecond,
      navigationOptions: {
        header: null,
      },
    },
    IntroThird: {
      screen: IntroThird,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: "IntroFirst",
  }
);

export default IntroNav;
