import { minLength, isEmail, isMatching } from "../../helpers/validation";

const registerFormValidation = values => {
  const errors = {};
  const { name, email, password, password_confirmation, address } = values;

  errors.name = minLength(name, 3);
  errors.email = isEmail(email);
  errors.password = minLength(password, 6);
  errors.password_confirmation = isMatching(password_confirmation, password);

  errors.address = minLength(address, 3);

  return errors;
};

export default registerFormValidation;
