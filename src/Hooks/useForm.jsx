import React, { useState } from "react";
import {
  regexEmail,
  regexPassword,
} from "../Components/Utils/Regex/validacaoRegex";

const validacao = {
  email: {
    regex: regexEmail,
    message: "Preencha um email válido",
  },
  senha: {
    regex: regexPassword,
    message:
      "Preencha com pelo menos uma letra, numero ou caractere especial [ a-A, 1, @ ]",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (validacao[type] && !validacao[type].regex.test(value)) {
      setError(validacao[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  function reset() {
    setValue("");
    setError(null);
  }

  return {
    value,
    setValue,
    error,
    setError,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    reset,
  };
};

export default useForm;
