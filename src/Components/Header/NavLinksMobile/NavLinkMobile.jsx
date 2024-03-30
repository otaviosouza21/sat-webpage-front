import React from "react";
import menuBurguer from "../../../assets/icons/menu-burgues.svg";
import closeIcon  from "../../../assets/icons/close.svg";
import style from "./NavLinkMobile.module.css";
import { Link } from "react-router-dom";

const NavLinkMobile = ({ links }) => {
  const [menuMobile, setMenuMobile] = React.useState(false);

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
