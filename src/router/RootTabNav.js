import React from "react";
import PropTypes from "prop-types";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { createBottomTabNavigator } from "react-navigation";

import ProductNav from "./ProductNav";
import AlbumNav from "./AlbumNav";
import CartNav from "./CartNav";
import ProfileNav from "./ProfileNav";

const ProductIcon = ({ tintColor }) => <SimpleLineIcons name="home" size={20} color={tintColor} />;

ProductIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const AlbumIcon = ({ tintColor }) => (
  <SimpleLineIcons name="notebook" size={20} color={tintColor} />
);

AlbumIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const CartIcon = ({ tintColor }) => <EvilIcons name="cart" size={30} color={tintColor} />;

CartIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const ProfileIcon = ({ tintColor }) => <Entypo name="user" size={20} color={tintColor} />;

ProfileIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const RootTabNav = createBottomTabNavigator(
  {
    ProductNav: {
      screen: ProductNav,
      navigationOptions: {
        title: "Product",
        tabBarIcon: ProductIcon,
      },
    },
    CartNav: {
      screen: CartNav,
      navigationOptions: {
        title: "Cart",
        tabBarIcon: CartIcon,
      },
    },
    AlbumNav: {
      screen: AlbumNav,
      navigationOptions: {
        title: "Album",
        tabBarIcon: AlbumIcon,
      },
    },
    ProfileNav: {
      screen: ProfileNav,
      navigationOptions: {
        title: "Profile",
        tabBarIcon: ProfileIcon,
      },
    },
  },
  {
    initialRouteName: "AlbumNav",
  }
);

export default RootTabNav;
