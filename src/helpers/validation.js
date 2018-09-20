export const required = value => (value ? undefined : "This field is required.");

export const maxLength = (value, max) => {
  if (!value) {
    return "This field is required.";
  }

  if (value.length > max) {
    return `Must be ${max} characters or less.`;
  }

  return undefined;
};

export const minLength = (value, min) => {
  if (!value) {
    return "This field is required.";
  }

  if (value.length < min) {
    return `Must be ${min} characters or more.`;
  }

  return undefined;
};

export const isEmail = value => {
  if (!value) {
    return "This field is required.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "Invalid email address";
  }

  return undefined;
};

export const isNumber = value =>
  value && Number.isNaN(Number(value)) ? "Must be a number" : undefined;

export const isMatching = (value, matchValue) => {
  if (!value) {
    return "This field is required.";
  }

  if (value !== matchValue) {
    return `This field must match with password field`;
  }

  return undefined;
};
