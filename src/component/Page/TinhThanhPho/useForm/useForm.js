import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});

  function onChangeInput(e) {
    e.persist();
    if (e.target.name === "ship" && e.target.value !== isNaN) {
      setData((data) => ({
        ...data,
        ship: parseInt(e.target.value),
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data)
    setErrors(validate(data));
    setIsSubmitting(true);
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  return {
    onChangeInput,
    data,
    setData,
    errors,
    handleSubmit,
  };
};

export default useForm;
