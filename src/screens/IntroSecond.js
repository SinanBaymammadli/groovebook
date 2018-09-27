import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, StatusBar } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import IntroSecondBg from "../assets/images/intro2.png";

class IntroSecond extends Component {
  componentDidMount = () => {};

  render() {
    const { navigation } = this.props;

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
          source={IntroSecondBg}
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
              Album, foto, lærred, t-shirt…
            </Text>
            <Text
              h4
              style={{
                textAlign: "center",
              }}
            >
              mulighederne er uendelige
            </Text>
          </View>
          <Button title="Next" onPress={() => navigation.navigate("IntroThird")} />
        </View>
      </View>
    );
  }
}

IntroSecond.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default IntroSecond;
