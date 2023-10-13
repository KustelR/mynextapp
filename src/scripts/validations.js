function validate(s, regex) {
    if (s.match(regex)) return true;
    else return false;
}

function validateLogin(s) {
    return (validate(s, '^[a-zA-Z0-9]+$'))
}

function validateEmail(s) {
    return (validate(s, '^[a-zA-Z0-9\-\.]+@[a-zA-Z0-9\-\.]+$'));
}

function validatePassword(s) {
    return (validate(s, '^.{8,}$'));
}

export {
    validateLogin,
    validateEmail,
    validatePassword,
}