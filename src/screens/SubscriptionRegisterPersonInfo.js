import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "../components/Text";
import RegisterPersonInfoForm from "../components/forms/RegisterPersonInfoForm";
import Screen from "../components/Screen";

class SubscriptionRegisterPersonInfo extends Component {
  componentDidMount = () => {};

  onSubmit = () => {
    const { navigation } = this.props;

    navigation.navigate("SubscriptionRegisterAddressInfo");
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
        <RegisterPersonInfoForm onSubmit={this.onSubmit} loading={registerState.loading} />

        <TouchableOpacity
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("SubscriptionLogin")}
        >
          <Text>Already a member?</Text>
        </TouchableOpacity>
      </Screen>
    );
  }
}

SubscriptionRegisterPersonInfo.propTypes = {
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
)(SubscriptionRegisterPersonInfo);
