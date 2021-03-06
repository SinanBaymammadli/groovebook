import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout, getAuthInfo } from "../redux/auth/actions";

import Screen from "../components/Screen";
import Text from "../components/Text";
import Button from "../components/Button";

class Profile extends Component {
  componentDidMount() {}

  render() {
    const { callLogout, authState, navigation } = this.props;

    return (
      <Screen
        style={{
          marginHorizontal: 16,
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        {authState.success ? (
          <View>
            {authState.email && (
              <View>
                <Text h3>{authState.name}</Text>
                <Text>{authState.email}</Text>
              </View>
            )}
            <Button outline title="LOGOUT" onPress={() => callLogout()} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Button title="LOGIN" onPress={() => navigation.navigate("WithoutPaymentLogin")} />
          </View>
        )}
      </Screen>
    );
  }
}

Profile.propTypes = {
  callLogout: PropTypes.func.isRequired,
  authState: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ authState: state.auth.currentUser });

export default connect(
  mapStateToProps,
  {
    callLogout: logout,
    callGetAuthInfo: getAuthInfo,
  }
)(Profile);
