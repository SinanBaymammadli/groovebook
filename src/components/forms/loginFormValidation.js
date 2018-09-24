import { minLength, isEmail } from "../../helpers/validation";

const loginFormValidation = values => {
  const errors = {};
  const { email, password } = values;

  errors.email = isEmail(email);
  errors.password = minLength(password, 6);

  return errors;
};

export default loginFormValidation;
