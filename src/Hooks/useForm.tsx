import React, { useState } from "react";
import {
  regexEmail,
  regexPassword,
  regexPhone,
} from "../Components/Utils/Regex/validacaoRegex.ts";

export interface useFormProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate: (value: string) => boolean;
  onBlur: () => void;
  reset: () => void;
}

type ValidationType = "email" | "senha" | "phone" | false;

interface ValidationRules {
  [key: string]: {
    regex: RegExp;
    message: string;
  };
}

const validacao: ValidationRules = {
  email: {
    regex: regexEmail,
    message: "Preencha um email válido",
  },
  senha: {
    regex: regexPassword,
    message:
      "Preencha com pelo menos uma letra, número ou caractere especial [ a-A, 1, @ ]",
  },
  phone: {
    regex: regexPhone,
    message: "Preencha um número válido (XX) XXXXX-XXXX",
  },
};

const useForm = (type?: ValidationType) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function validate(value: string): boolean {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (type && validacao[type] && !validacao[type].regex.test(value)) {
      setError(validacao[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value: targetValue } = event.target;

    if (error) validate(targetValue);

    if (type === "phone") {
      const formattedNumber = formatPhoneNumber(targetValue);
      setValue(formattedNumber);
    } else {
      setValue(targetValue);
    }
  }

  function reset(): void {
    setValue("");
    setError(null);
  }

  function formatPhoneNumber(value: string): string {
    // Remove tudo o que não é dígito
    const onlyDigits = value.replace(/\D/g, "");

    // Limita o número de dígitos ao máximo esperado: 11 dígitos (2 para DDD + 9 para o número)
    const clampedDigits = onlyDigits.slice(0, 11);

    // Formatação
    let formatted = clampedDigits.replace(
      /^(\d{2})(\d{0,5})(\d{0,4}).*/,
      "($1) $2-$3"
    );

    // Remove o traço (-) caso não tenham dígitos suficientes para o número principal
    formatted = formatted.replace(/(-)$/, "");

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
    reset,
  };
};

export default useForm;
