import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import Button from "../Button";
import Input from "../Input";
import { required, email, matchPassword, minLength } from "../../helpers/validation";

const RegisterForm = props => {
  const { handleSubmit, onSubmit, loading, invalid } = props;

  return (
    <View>
      <Field
        name="name"
        component={Input}
        validate={[required, minLength(3)]}
        placeholder="Name"
        autoCapitalize="none"
        returnKeyType="next"
      />
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
        returnKeyType="next"
      />
      <Field
        name="password_confirmation"
        component={Input}
        validate={[required, matchPassword]}
        placeholder="Password Confirmation"
        autoCapitalize="none"
        secureTextEntry
        enablesReturnKeyAutomatically
        onSubmitEditing={handleSubmit(onSubmit)}
        returnKeyType="go"
      />
      <Button
        disabled={invalid || loading}
        onPress={handleSubmit(onSubmit)}
        title="Sign up"
        loading={loading}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({ form: "register" })(RegisterForm);
