export const validateEmail = (email) => {
  if (!email.length) {
    return "Email field can not be empty!";
  }
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "Email is not valid!";
  }
  return "";
};

export const validateInput = (input, field, isSignin) => {
  if (isSignin) {
    if (!input.length) {
      return `${field} field can not be empty!`;
    }
    return "";
  }
  if (input.length < 5) {
    return `${field} field should have at least 5 characters!`;
  }
  if (input.length > 10) {
    return `${field} field should have less than 10 characters!`;
  }
  return "";
};

export const validatePassword = (password, onLogin) => {
  if (!password.length) {
    return "Password field can not be empty!";
  }
  if (password.length < 8 && !onLogin) {
    return "Password should have at least 8 characters!";
  }
  return "";
};
