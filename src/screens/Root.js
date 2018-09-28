import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { USER_TOKEN, SEEN_INTRO } from "../constants";
import { getAuthInfo } from "../redux/auth/actions";
import createRootNav from "../router/RootNav";

class App extends Component {
  state = {
    loading: true,
    seenIntro: false,
  };

  componentDidMount = async () => {
    try {
      const seenIntro = await AsyncStorage.getItem(SEEN_INTRO);

      if (seenIntro) {
        const userToken = await AsyncStorage.getItem(USER_TOKEN);
        if (userToken) {
          axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

          const { callGetAuthInfo } = this.props;
          await callGetAuthInfo();

          this.setState({
            loading: false,
            seenIntro: true,
          });
        } else {
          this.setState({
            loading: false,
            seenIntro: true,
          });
        }
      } else {
        this.setState({
          loading: false,
          seenIntro: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        seenIntro: false,
      });
    }
  };

  render() {
    const { loading, seenIntro } = this.state;

    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const RootNav = createRootNav(seenIntro);
    return <RootNav />;
  }
}

export default connect(
  null,
  {
    callGetAuthInfo: getAuthInfo,
  }
)(App);
