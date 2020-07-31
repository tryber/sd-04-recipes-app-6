const loginValidation = (email, password) => {
  let emailValidation = true;
  let passwordValidation = true;

  if (email) {
    emailValidation = email.match(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
  }
  if (password) {
    passwordValidation = password.length > 6;
  }
  if (emailValidation && passwordValidation) return false;
  return true;
};

export default loginValidation;
