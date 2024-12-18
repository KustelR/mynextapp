function validate(s, regex) {
  if (s.match(regex)) return true;
  else return false;
}
/**
 * Checks if string is a valid login (^[a-zA-Z0-9]+$)
 * @param {string} s string to be validated
 * @returns {boolean} is matching
 */
function validateLogin(s) {
  return validate(s, "^[a-zA-Z0-9]+$");
}

function validateEmail(s) {
  return validate(s, "^[a-zA-Z0-9\-\.]+@[a-zA-Z0-9\-\.]+$");
}

function validatePassword(s) {
  return validate(s, "^.{8,}$");
}

export { validateLogin, validateEmail, validatePassword };
