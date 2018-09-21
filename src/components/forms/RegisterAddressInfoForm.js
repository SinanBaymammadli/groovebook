import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import Button from "../Button";
import Input from "../Input";
import registerFormValidation from "./registerFormValidation";
import Select from "../Select";

const RegisterAddressInfoForm = props => {
  const { handleSubmit, onSubmit, loading, invalid, countries, loadCities, cities } = props;

  return (
    <View>
      <Field
        name="street"
        component={Input}
        placeholder="Street"
        autoCapitalize="none"
        returnKeyType="next"
      />
      <Field
        name="country_id"
        component={Select}
        placeholder="Country"
        options={countries}
        onChange={newValue => {
          if (newValue) {
            loadCities(newValue);
          }
        }}
      />
      <Field name="city_id" component={Select} placeholder="City" options={cities} />
      <Field
        name="zip"
        component={Input}
        placeholder="Zip"
        autoCapitalize="none"
        returnKeyType="next"
      />
      <Button
        disabled={invalid || loading}
        onPress={handleSubmit(onSubmit)}
        title="Next"
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
  loadCities: PropTypes.func.isRequired,
};

RegisterAddressInfoForm.defaultProps = {
  countries: [],
  cities: [],
};

export default reduxForm({
  form: "register",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: registerFormValidation,
})(RegisterAddressInfoForm);
