import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "../components/Text";
import RegisterForm from "../components/forms/RegisterForm";
import Screen from "../components/Screen";
import { register } from "../redux/auth/actions";

class Register extends Component {
  componentDidMount = () => {};

  render() {
    const { navigation, callRegister, registerState } = this.props;

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
          {!!registerState.error && <Text>{registerState.error}</Text>}
        </View>

        <RegisterForm onSubmit={values => callRegister(values)} loading={registerState.loading} />

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

Register.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  callRegister: PropTypes.func.isRequired,
  registerState: PropTypes.shape({
    message: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  registerState: state.auth.register,
});

export default connect(
  mapStateToProps,
  {
    callRegister: register,
  }
)(Register);
