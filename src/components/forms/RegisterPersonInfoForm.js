import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import Button from "../Button";
import Input from "../Input";
import registerFormValidation from "./registerFormValidation";

const RegisterPersonInfoForm = props => {
  const { handleSubmit, onSubmit, loading, invalid } = props;

  return (
    <View>
      <Field
        name="name"
        component={Input}
        placeholder="Name"
        autoCapitalize="none"
        returnKeyType="next"
      />
      <Field
        name="email"
        component={Input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Field
        name="password"
        component={Input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        enablesReturnKeyAutomatically
        returnKeyType="next"
      />
      <Field
        name="password_confirmation"
        component={Input}
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

RegisterPersonInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "register",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate: registerFormValidation,
})(RegisterPersonInfoForm);
