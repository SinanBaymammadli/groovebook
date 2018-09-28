import React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";

import SingleChargeLogin from "../screens/SingleChargeLogin";
import SingleChargeRegisterAddressInfo from "../screens/SingleChargeRegisterAddressInfo";
import SingleChargeRegisterPersonInfo from "../screens/SingleChargeRegisterPersonInfo";

import SubscriptionLogin from "../screens/SubscriptionLogin";
import SubscriptionRegisterAddressInfo from "../screens/SubscriptionRegisterAddressInfo";
import SubscriptionRegisterPersonInfo from "../screens/SubscriptionRegisterPersonInfo";

import WithoutPaymentLogin from "../screens/WithoutPaymentLogin";
import WithoutPaymentRegisterAddressInfo from "../screens/WithoutPaymentRegisterAddressInfo";
import WithoutPaymentRegisterPersonInfo from "../screens/WithoutPaymentRegisterPersonInfo";

const WithoutPaymentAuthNav = createStackNavigator({
  WithoutPaymentLogin: {
    screen: WithoutPaymentLogin,
    navigationOptions: ({ navigation }) => ({
      title: "Sign in",
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Profile")} title="Back" />,
    }),
  },
  WithoutPaymentRegisterAddressInfo: {
    screen: WithoutPaymentRegisterAddressInfo,
    navigationOptions: {
      title: "Sign up",
    },
  },
  WithoutPaymentRegisterPersonInfo: {
    screen: WithoutPaymentRegisterPersonInfo,
    navigationOptions: {
      title: "Sign up",
    },
  },
});

const SingleChargeAuthNav = createStackNavigator({
  SingleChargeLogin: {
    screen: SingleChargeLogin,
    navigationOptions: ({ navigation }) => ({
      title: "Sign in",
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Cart")} title="Back" />,
    }),
  },
  SingleChargeRegisterAddressInfo: {
    screen: SingleChargeRegisterAddressInfo,
    navigationOptions: {
      title: "Sign up",
    },
  },
  SingleChargeRegisterPersonInfo: {
    screen: SingleChargeRegisterPersonInfo,
    navigationOptions: {
      title: "Sign up",
    },
  },
});

const SubscriptionAuthNav = createStackNavigator({
  SubscriptionRegisterPersonInfo: {
    screen: SubscriptionRegisterPersonInfo,
    navigationOptions: ({ navigation }) => ({
      title: "Sign in",
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("AlbumList")} title="Back" />
      ),
    }),
  },
  SubscriptionRegisterAddressInfo: {
    screen: SubscriptionRegisterAddressInfo,
    navigationOptions: {
      title: "Sign up",
    },
  },
  SubscriptionLogin: {
    screen: SubscriptionLogin,
    navigationOptions: {
      title: "Sign up",
    },
  },
});

const AuthNav = createStackNavigator({
  WithoutPaymentAuthNav: {
    screen: WithoutPaymentAuthNav,
    navigationOptions: {
      header: null,
    },
  },
  SingleChargeAuthNav: {
    screen: SingleChargeAuthNav,
    navigationOptions: {
      header: null,
    },
  },
  SubscriptionAuthNav: {
    screen: SubscriptionAuthNav,
    navigationOptions: {
      header: null,
    },
  },
});

export default AuthNav;
