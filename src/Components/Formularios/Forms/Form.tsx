import React from "react";
import styles from "./Form.module.css";

interface FormProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    <div className={styles.modal} {...props}>
      {children}
    </div>
  );
};

export default Form;
