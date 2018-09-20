import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import stripe from "tipsi-stripe";
import Text from "../components/Text";
import RegisterAddressInfoForm from "../components/forms/RegisterAddressInfoForm";
import Screen from "../components/Screen";
import { register } from "../redux/auth/actions";

class RegisterAddressInfo extends Component {
  componentDidMount = () => {};

  openPaymentScreen = async values => {
    const options = {};
    const { navigation, callRegister } = this.props;

    try {
      const { tokenId } = await stripe.paymentRequestWithCardForm(options);
      const registerData = {
        ...values,
        stripeToken: tokenId,
      };
      await callRegister(registerData);

      const { registerState } = this.props;

      if (registerState.success) {
        navigation.navigate("AlbumPhotoSelect");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        <RegisterAddressInfoForm
          onSubmit={values => this.openPaymentScreen(values)}
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

RegisterAddressInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  registerState: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  callRegister: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  registerState: state.auth.register,
});

export default connect(
  mapStateToProps,
  {
    callRegister: register,
  }
)(RegisterAddressInfo);
