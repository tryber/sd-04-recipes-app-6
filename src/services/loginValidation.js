const loginValidation = (email, password) => {
  let emailValidation = email?.match(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );
  let passwordValidation = password?.length > 6;
  if (emailValidation && passwordValidation) return false;
  return true;
};

export default loginValidation;
