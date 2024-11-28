import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message,color }) => {
  const [visible, setVisible] = useState(true);



  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

if(visible)
  return (
    <div className={styles.toast} style={{background:color}}>
      <p>{message}</p>
      <span onClick={()=>setVisible(false)}>X</span>
    </div>
  );
};

export default Toast;
