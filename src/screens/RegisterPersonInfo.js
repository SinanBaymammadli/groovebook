import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "../components/Text";
import RegisterPersonInfoForm from "../components/forms/RegisterPersonInfoForm";
import Screen from "../components/Screen";

class RegisterPersonInfo extends Component {
  componentDidMount = () => {};

  render() {
    const { navigation, registerState } = this.props;

    return (
      <Screen
        style={{
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Text
          h2
          style={{
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Sign up
        </Text>

        <View>
          {!!registerState.message && (
            <Text
              style={{
                textAlign: "center",
                marginBottom: 20,
                color: "#43a047",
              }}
            >
              {registerState.message}
            </Text>
          )}
          {!!registerState.error.message && <Text>{registerState.error.message}</Text>}
        </View>

        <RegisterPersonInfoForm
          onSubmit={() => navigation.navigate("RegisterAddressInfo")}
          loading={registerState.loading}
        />

        <TouchableOpacity
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Already a member?</Text>
        </TouchableOpacity>
      </Screen>
    );
  }
}

RegisterPersonInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  registerState: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  registerState: state.auth.register,
});

export default connect(
  mapStateToProps,
  null
)(RegisterPersonInfo);
