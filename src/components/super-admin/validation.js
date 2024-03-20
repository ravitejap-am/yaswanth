const emailregex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validatePersonalInfoForm = (data) => {
  let errors = {};
  if (!data.name.trim()) {
    errors.name = 'Organization name is required';
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
