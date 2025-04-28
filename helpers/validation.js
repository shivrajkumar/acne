export const isValidName = (name) => {
  if (name === "")
    return {
      error: "This cannot be empty. Please enter a value",
      hasError: true,
    };

  if (!name.trim().match(/^[a-zA-Z\s]*$/))
    return {
      error: "Enter Alphabets only",
      hasError: true,
    };

  if (name.length > 49) {
    return {
      error: `Please provide input < 50 characters`,
      hasError: true,
    };
  }

  return { hasError: false };
};

export const isValidPhone = (phone) => {
  if (phone === "")
    return {
      error: "This cannot be empty. Please enter a value",
      hasError: true,
    };
  if (!phone.match(/^[0-9]+$/) || phone.length !== 10)
    return {
      error: `Please enter a valid 10 digit mobile number`,
      hasError: true,
    };

  return { hasError: false };
};

export const isValidAlternatePhone = (phone) => {
  if (phone === "")
    return {
      hasError: false,
    };
  if (!phone.match(/^[0-9]+$/) || phone.length !== 10)
    return {
      error: `Please enter a valid 10 digit mobile number`,
      hasError: true,
    };

  return { hasError: false };
};
export const isValidPhoneInternational=(phone)=>{
  if (phone === "")
    return {
      error: "This cannot be empty. Please enter a value",
      hasError: true,
    };
  if (!phone.match(/^[0-9]+$/) )
    return {
      error: `Please enter a valid  mobile number`,
      hasError: true,
    };

  return { hasError: false };
}
export const isValidEmail = (email) => {
  if (email === "")
    return {
      error: "This cannot be empty. Please enter a value",
      hasError: true,
    };
  if (!email.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/))
    return {
      error: `Please enter a valid email ID`,
      hasError: true,
    };

  return { hasError: false };
};

export const isValidAlternateEmail = (email) => {
  if (email === "")
    return {
      hasError: false,
    };
  if (!email.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/))
    return {
      error: `Please enter a valid email ID`,
      hasError: true,
    };

  return { hasError: false };
};

export const isValidAge = (age) => {
  if (age === "")
    return {
      error: `This cannot be empty. Please enter a value`,
      hasError: true,
    };

  if (!age.match(/^[0-9]+$/))
    return {
      error: `Hmm… that age isn’t valid`,
      hasError: true,
    };
  if (Number(age) > 99)
    return {
      error: `Well, please enter age < 100`,
      hasError: true,
    };
  if (Number(age) < 18) {
    return {
      error: `Clear Ritual treatment is available to adults 18 years and above.`,
      hasError: true,
    };
  }

  return { hasError: false };
};

export const isNotEmptyArray = (input) => {
  if (input.length === 0)
    return {
      error: `Please, select options`,
      hasError: true,
    };

  return { hasError: false };
};
