export const required = value => (value ? undefined : "This field is required.");

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less.` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more.` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const number = value =>
  value && Number.isNaN(Number(value)) ? "Must be a number" : undefined;

export const matchPassword = (value, allValues) =>
  value !== allValues.password ? `This field must match with password field` : undefined;
