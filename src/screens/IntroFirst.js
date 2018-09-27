import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, StatusBar } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import IntroFirstBg from "../assets/images/intro1.png";

class IntroFirst extends Component {
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
          source={IntroFirstBg}
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
              Print dine minder
            </Text>
            <Text
              h4
              style={{
                textAlign: "center",
              }}
            >
              på kun 3 klik
            </Text>
          </View>
          <Button title="Next" onPress={() => navigation.navigate("IntroSecond")} />
        </View>
      </View>
    );
  }
}

IntroFirst.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default IntroFirst;
