import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import Button from "../Button";
import Input from "../Input";
import { required, email } from "../../helpers/validation";

const LoginForm = props => {
  const { handleSubmit, onSubmit, loading, invalid } = props;

  return (
    <View>
      <Field
        name="email"
        component={Input}
        validate={[required, email]}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Field
        name="password"
        component={Input}
        validate={[required]}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        enablesReturnKeyAutomatically
        onSubmitEditing={handleSubmit(onSubmit)}
        returnKeyType="go"
      />
      <Button
        disabled={invalid || loading}
        onPress={handleSubmit(onSubmit)}
        title="Sign in"
        loading={loading}
      />
    </View>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({ form: "login" })(LoginForm);
