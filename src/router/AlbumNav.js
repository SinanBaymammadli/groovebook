import { createStackNavigator } from "react-navigation";
import AlbumList from "../screens/AlbumList";
import AlbumPhotoSelect from "../screens/AlbumPhotoSelect";

const AlbumNav = createStackNavigator({
  AlbumList: {
    screen: AlbumList,
    navigationOptions: {
      title: "AlbumList",
    },
  },
  AlbumPhotoSelect: {
    screen: AlbumPhotoSelect,
    navigationOptions: {
      title: "AlbumPhotoSelect",
    },
  },
});

export default AlbumNav;
