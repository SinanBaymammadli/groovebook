import { createStackNavigator } from "react-navigation";
import Profile from "../screens/Profile";

const ProfileNav = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile",
    },
  },
});

export default ProfileNav;
