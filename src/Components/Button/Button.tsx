import React, { useContext } from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Hooks/GlobalContext.tsx";
import ReactGA from "react-ga";

type ButtonProps = React.ComponentProps<"button"> & {
  color?: string;
  path?: string;
  handleSubmit?: React.MouseEventHandler;
  modalParam?: string;
  children: React.ReactNode;
};

const Button = ({
  color,
  path,
  handleSubmit,
  modalParam,
  children,
}: ButtonProps) => {
  const { setDataUpdate, setModal } = useGlobalContext();

  return (
    <button className={style.button} style={{ background: color && color }}>
      <Link
        onClick={(event) => {
          ReactGA.event({
            category: "Button",
            action: "Click",
            label: "My Button",
          });
          handleSubmit && handleSubmit(event);
          setDataUpdate(null);
          if (modalParam) {
            setModal(modalParam);
          }
        }}
        to={path || "/"}
      >
        {children}
      </Link>
    </button>
  );
};

export default Button;
