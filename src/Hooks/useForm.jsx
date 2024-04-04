import React, { useState } from "react";
import {
  regexEmail,
  regexPassword,
  regexPhone
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
  phone:{
    regex: regexPhone,
    message: 'Preencha um numero valido (XX) XXXX-XXX'
  }
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
    
    if (type === 'phone') {
      const formattedNumber = formatPhoneNumber(target.value);
      setValue(formattedNumber);
    } else {
      setValue(target.value);
    }
  }

  function reset() {
    setValue("");
    setError(null);
  }

  function formatPhoneNumber(value) {
    // Remove tudo o que não é dígito
    const onlyDigits = value.replace(/\D/g, '');
  
    // Limita o número de dígitos ao máximo esperado: 11 dígitos (2 para DDD + 9 para o número)
    const clampedDigits = onlyDigits.slice(0, 11);
  
    // Formatação
    let formatted = clampedDigits.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
  
    // Remove o traço (-) caso não tenham dígitos suficientes para o número principal
    formatted = formatted.replace(/(-)$/, '');
  
    return formatted;
  }
  

  return {
    value,
    setValue,
    error,
    setError,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    reset: ()=> reset(),
  };
};

export default useForm;
