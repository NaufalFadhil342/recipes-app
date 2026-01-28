export const usersReqValidation = (values, rules) => {
  let errors = {};

  if (!values || !rules) return errors;

  const fieldNameMap = {
    username: "Username",
    email: "Email",
    phoneNumber: "Phone number",
    usersPermission: "Aggreement",
  };

  const formatFieldName = (field) => {
    return fieldNameMap[field] || field;
  };

  for (const field in rules) {
    const value = values[field];
    const rule = rules[field];

    if (rule.required) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (rule.type === "checkbox" && !value)
      ) {
        if (rule.type === "checkbox") {
          errors[field] = "You must agree to the terms and conditions";
        } else {
          errors[field] = `${formatFieldName(field)} is required`;
        }
        continue;
      }
    }

    if (typeof value === "string" && value.trim() !== "") {
      if (rule.type === "username" && value) {
        errors[field] = "Username is required";
      }

      if (rule.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors[field] = "Email is invalid";
        }
      }

      if (rule.type === "tel") {
        const digitsOnly = value.replace(/\D/g, "");

        if (rule.minLength && digitsOnly.length < rule.minLength) {
          errors[field] =
            `Phone number must contain at least ${rule.minLength} digits`;
        }
      }
    }
  }

  return errors;
};
