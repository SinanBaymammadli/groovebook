import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, StatusBar, AsyncStorage } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import IntroThirdBg from "../assets/images/intro3.png";
import { SEEN_INTRO } from "../constants";

class IntroThird extends Component {
  componentDidMount = () => {};

  getStartedPressed = async () => {
    const { navigation } = this.props;
    await AsyncStorage.setItem(SEEN_INTRO, "true");
    navigation.navigate("RootTabNav");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#fff",
          justifyContent: "flex-end",
        }}
      >
        <StatusBar hidden />
        <Image
          source={IntroThirdBg}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        />

        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: 20,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              h4
              style={{
                textAlign: "center",
              }}
            >
              Få dine billeder fra mobilen
            </Text>
            <Text
              h4
              style={{
                textAlign: "center",
              }}
            >
              som album hver måned!
            </Text>
          </View>
          <Button title="Get started" onPress={this.getStartedPressed} />
        </View>
      </View>
    );
  }
}

IntroThird.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default IntroThird;
