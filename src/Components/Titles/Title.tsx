import React from "react";
import styles from "./Title.module.css";

interface TitleType{
  className?: String;
  text:string;
  fontSize?: string;
  subtitle?:string;
  icon?: HTMLOrSVGElement
}

const Title = ({className, text, fontSize, subtitle,icon}:TitleType) => {
  const sizeFunction = (size:string | undefined) => {
    if (size === "1") return "5rem";
    if (size === "3") return "3rem";
    if (size === "2") return "2rem";
  };

  return (
    <div className={`${styles.titleContainer} ${className}`}>
      <h1 style={{ fontSize: sizeFunction(fontSize) }}>
        {text}
      </h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default Title;
