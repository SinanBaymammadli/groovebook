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
      title: "WithoutPaymentLogin",
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Profile")} title="Back" />,
    }),
  },
  WithoutPaymentRegisterAddressInfo: {
    screen: WithoutPaymentRegisterAddressInfo,
    navigationOptions: {
      title: "WithoutPaymentRegisterAddressInfo",
    },
  },
  WithoutPaymentRegisterPersonInfo: {
    screen: WithoutPaymentRegisterPersonInfo,
    navigationOptions: {
      title: "WithoutPaymentRegisterPersonInfo",
    },
  },
});

const SingleChargeAuthNav = createStackNavigator({
  SingleChargeLogin: {
    screen: SingleChargeLogin,
    navigationOptions: ({ navigation }) => ({
      title: "SingleChargeLogin",
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Cart")} title="Back" />,
    }),
  },
  SingleChargeRegisterAddressInfo: {
    screen: SingleChargeRegisterAddressInfo,
    navigationOptions: {
      title: "SingleChargeRegisterAddressInfo",
    },
  },
  SingleChargeRegisterPersonInfo: {
    screen: SingleChargeRegisterPersonInfo,
    navigationOptions: {
      title: "SingleChargeRegisterPersonInfo",
    },
  },
});

const SubscriptionAuthNav = createStackNavigator({
  SubscriptionRegisterPersonInfo: {
    screen: SubscriptionRegisterPersonInfo,
    navigationOptions: ({ navigation }) => ({
      title: "SubscriptionRegisterPersonInfo",
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("AlbumList")} title="Back" />
      ),
    }),
  },
  SubscriptionRegisterAddressInfo: {
    screen: SubscriptionRegisterAddressInfo,
    navigationOptions: {
      title: "SubscriptionRegisterAddressInfo",
    },
  },
  SubscriptionLogin: {
    screen: SubscriptionLogin,
    navigationOptions: {
      title: "SubscriptionLogin",
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
