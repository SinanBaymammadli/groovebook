import { minLength, isEmail, isMatching, required } from "../../helpers/validation";

const registerFormValidation = values => {
  const errors = {};
  const { name, email, password, password_confirmation, street, country_id, city_id, zip } = values;

  errors.name = minLength(name, 3);
  errors.email = isEmail(email);
  errors.password = minLength(password, 6);
  errors.password_confirmation = isMatching(password_confirmation, password);

  errors.street = minLength(street, 3);
  errors.country_id = required(country_id);
  errors.city_id = required(city_id);
  errors.zip = required(zip);

  return errors;
};

export default registerFormValidation;
