import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import stripe from "tipsi-stripe";
import Text from "../components/Text";
import RegisterAddressInfoForm from "../components/forms/RegisterAddressInfoForm";
import Screen from "../components/Screen";
import { register } from "../redux/auth/actions";
import { getCountries, getCities } from "../redux/address/actions";

class WithoutPaymentRegisterAddressInfo extends Component {
  componentDidMount = () => {
    const { callGetCountries } = this.props;
    callGetCountries();
  };

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
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { registerState, countries, callGetCities, cities } = this.props;

    return (
      <Screen
        style={{
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <View>
          {!!registerState.message && (
            <Text
              style={{
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {registerState.message}
            </Text>
          )}

          {!!registerState.error.message && (
            <Text
              error
              style={{
                textAlign: "center",
              }}
            >
              {registerState.error.message}
            </Text>
          )}
        </View>

        <RegisterAddressInfoForm
          onSubmit={values => this.openPaymentScreen(values)}
          loading={registerState.loading}
          countries={countries}
          cities={cities}
          loadCities={callGetCities}
        />
      </Screen>
    );
  }
}

WithoutPaymentRegisterAddressInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  registerState: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  callRegister: PropTypes.func.isRequired,
  callGetCountries: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  callGetCities: PropTypes.func.isRequired,
};

WithoutPaymentRegisterAddressInfo.defaultProps = {
  countries: [],
  cities: [],
};

const mapStateToProps = state => ({
  registerState: state.auth.register,
  countries: state.address.country.countries,
  cities: state.address.city.cities,
});

export default connect(
  mapStateToProps,
  {
    callRegister: register,
    callGetCountries: getCountries,
    callGetCities: getCities,
  }
)(WithoutPaymentRegisterAddressInfo);
