import { createStackNavigator } from "react-navigation";
import AlbumList from "../screens/AlbumList";
import AlbumPhotoSelect from "../screens/AlbumPhotoSelect";

const AlbumNav = createStackNavigator({
  AlbumList: {
    screen: AlbumList,
    navigationOptions: {
      title: "Albums",
    },
  },
  AlbumPhotoSelect: {
    screen: AlbumPhotoSelect,
    navigationOptions: {
      title: "Photo select",
    },
  },
});

export default AlbumNav;
