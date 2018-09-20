import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import Button from "../Button";
import Input from "../Input";
import registerFormValidation from "./registerFormValidation";

const RegisterAddressInfoForm = props => {
  const { handleSubmit, onSubmit, loading, invalid } = props;

  return (
    <View>
      <Field
        name="address"
        component={Input}
        placeholder="Address"
        autoCapitalize="none"
        returnKeyType="next"
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

RegisterAddressInfoForm.propTypes = {
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
})(RegisterAddressInfoForm);
