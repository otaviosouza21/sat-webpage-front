import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message,color }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  return (
    <div
      className={`toast align-items-center ${color} border-0 ${styles.toast}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={visible ? { display: "block" } : { display: "none" }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
