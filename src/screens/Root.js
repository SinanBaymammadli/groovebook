import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { USER_TOKEN } from "../constants";
import RootNav from "../router/RootNav";
import { getAuthInfo } from "../redux/auth/actions";

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount = async () => {
    try {
      const userToken = await AsyncStorage.getItem(USER_TOKEN);
      if (userToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

        const { callGetAuthInfo } = this.props;
        await callGetAuthInfo();

        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { loading } = this.state;

    return loading ? <ActivityIndicator /> : <RootNav />;
  }
}

export default connect(
  null,
  {
    callGetAuthInfo: getAuthInfo,
  }
)(App);
