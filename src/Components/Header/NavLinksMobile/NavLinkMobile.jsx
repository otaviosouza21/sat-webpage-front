import React, { useContext } from "react";
import menuBurguer from "../../../assets/icons/menu-burgues.svg";
import closeIcon from "../../../assets/icons/close.svg";
import style from "./NavLinkMobile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/GlobalContext";

const NavLinkMobile = ({ links }) => {
  const [menuMobile, setMenuMobile] = React.useState(false);
  const { userAuth, modal, setModal } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className={style.containerMenuMobile}>
      <img
        onClick={() => setMenuMobile(true)}
        className={style.menuBurguer}
        src={menuBurguer}
        alt=""
      />
      {menuMobile && (
        <ul className={`${style.navLinksMobile} animation-left-rigth`}>
          <img
            onClick={() => setMenuMobile(false)}
            className={style.closeMenu}
            src={closeIcon}
            alt=""
          />
          {!userAuth.status && (
            <li className={style.butonsMobile}>
              <p
                className="btn btn-outline-success"
                onClick={() => {
                  setModal("modalLogin");
                  setMenuMobile(false);
                }}
              >
                Entrar
              </p>
              <p
                className="btn btn-success"
                onClick={() => navigate("/usuario/cadastro")}
              >
                Cadastre-se
              </p>
            </li>
          )}
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.patch}>{link.nome}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NavLinkMobile;
