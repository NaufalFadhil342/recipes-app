import { useState, useEffect, useCallback } from "react";
import { usersReqValidation } from "../validation/usersReqValidation";

const usersDefaultState = {
  username: "",
  email: "",
  phoneNumber: "",
  message: "",
  usersPermission: false,
};

const usersValidationRules = {
  username: { required: true, type: "text" },
  email: { required: true, type: "email" },
  phoneNumber: { required: true, type: "tel", minLength: 8 },
  usersPermission: { required: true, type: "checkbox" },
};

export const useReqForm = (dialRef) => {
  const [usersState, setUsersState] = useState(usersDefaultState);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectDialCode, setSelectDialCode] = useState("+62");
  const [showDialCode, setShowDialCode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneOutsideClick = useCallback(
    (e) => {
      if (dialRef.current && !dialRef.current.contains(e.target)) {
        setShowDialCode(false);
      }
    },
    [dialRef],
  );

  useEffect(() => {
    const countriesDialCodes = () => {
      fetch("countries.json")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data.countries);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    countriesDialCodes();

    document.addEventListener("mousedown", handlePhoneOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handlePhoneOutsideClick);
  }, [handlePhoneOutsideClick]);

  const handleReqChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setUsersState((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const fieldErrors = usersReqValidation(
      { ...usersState, [name]: newValue },
      usersValidationRules,
    );

    setErrors((prevError) => ({
      ...prevError,
      [name]: fieldErrors[name] || null,
    }));
  };

  const handleReqSubmit = (e) => {
    e.preventDefault();

    const validationErrors = usersReqValidation(
      usersState,
      usersValidationRules,
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);

      const usersData = {
        username: usersState.username,
        email: usersState.email,
        phoneNumber: `${selectDialCode}${usersState.phoneNumber}`,
        message: usersState.message,
        usersPermission: usersState.usersPermission,
      };

      setTimeout(() => {
        console.log("users request", usersData);
        setUsersState(usersDefaultState);
        setErrors({});
        setSelectDialCode("+62");
        setIsSubmitted(false);
      }, 1000);
    } else {
      console.error("Form has errors:", validationErrors);
    }
  };

  return {
    usersState,
    errors,
    countries,
    selectDialCode,
    showDialCode,
    isSubmitted,
    handleReqChange,
    handleReqSubmit,
    setSelectDialCode,
    setShowDialCode,
  };
};
