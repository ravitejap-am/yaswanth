const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validatePersonalInfoForm = (data) => {
  let errors = {};
  if (!data.name.trim()) {
    errors.name = 'Organisation name is required';
  }
  if (!data?.address.country) {
    errors.country = 'Country is required';
  }
  if (!data?.address?.address1.trim()) {
    errors.address1 = 'Address one is required';
  }
  // if (!data?.address?.address2.trim()) {
  //   errors.address2 = 'Address two is required';
  // }
  if (!data?.address?.state) {
    errors.state = 'State is required';
  }
  if (!data?.address?.city) {
    errors.city = 'City is required';
  }
  if (data?.address?.postCode.length <= 0) {
    errors.postCode = 'Zip code is required';
  }
  if (
    data?.address?.postCode.length > 0 &&
    data?.address?.postCode.length <= 3
  ) {
    errors.postCode = 'Please enter valid zipcode';
  }
  return errors;
};
export const validateUserInfoForm = (data) => {
  let errors = {};
  if (!data.contact.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!data?.contact.lastName) {
    errors.lastName = 'Last name is required';
  }
  if (!data?.contact?.email.trim()) {
    errors.email = 'Email is required';
  }

  if (
    data.contact.firstName.trim().length > 0 &&
    !emailregex.test(data?.contact?.email)
  ) {
    errors.email = 'Please Enter Valid Email';
  }

  return errors;
};


export const validationOrgData = (jsonData) => {
  if (!jsonData || typeof jsonData !== 'object') {
    return false;
  }

  const { address } = jsonData;
  if (
    !address ||
    address.address1 === '' ||
    address.country === '' ||
    address.state === '' ||
    address.city === '' ||
    address.postCode === ''
  ) {
    return false;
  }
  if (address?.postCode?.length < 4) {
    return false;
  }
  const { contact } = jsonData;
  if (!contact || Object.values(contact).some((value) => value === '')) {
    return false;
  }

  const { metaData } = jsonData;
  if (
    !metaData ||
    metaData.length === 0 ||
    !metaData.every((meta) => meta.typeDetails)
  ) {
    return false;
  }

  return true;
};


export const validatePassword = (_, value) => {
  if (!value) {
    return Promise.reject("Please enter your password!");
  }
  if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return Promise.reject("Your password is very simple. Password should be a combination of at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
  }
  return Promise.resolve("");
};


export const validateConfirmPassword = (value, passwordValue) => {
  if (!value) {
    return Promise.reject('Please confirm your password!');
  }
    if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      return Promise.reject("Your password is very simple. Password should be a combination of at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
    }
  if (value !== passwordValue) {
    return Promise.reject('The password do not match!');
  }
  return Promise.resolve();
};


export const validPassword = (value, oldPassword) => {
  console.log("val pass---->",value);
  if (!value) {
    return "Please enter your password";
  }
  if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return "Your password is very simple. Password should be a combination of at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
  }
  if(value === oldPassword){
    return "New password should not match with old password";
  }

  return "";
};


export const validConfirmPassword = (value, passwordValue) => {
  console.log("val conf pass---->",value);
  console.log("cond-->",!value);
  if (!value) {
    return 'Please enter your password';
  }
  else if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      return "Your password is very simple. Password should be a combination of at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
    }
  else if (value !== passwordValue) {
    return 'The password do not match!';
  }
  return "";
};