import React, { useContext, useEffect, useRef } from "react";
import menuBurguer from "../../../assets/icons/menu-burgues.svg";
import closeIcon from "../../../assets/icons/close.svg";
import style from "./NavLinkMobile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/GlobalContext";

const NavLinkMobile = ({ links }) => {
  const [menuMobile, setMenuMobile] = React.useState(false);
  const { userAuth, modal, setModal } = useContext(GlobalContext);
  const navigate = useNavigate();
  const closeMenuBtn = useRef();


function openMenuMobile(){
  if (menuMobile) { 
    closeMenuBtn.current.removeAttribute('class','animation-rigth-left') 
    closeMenuBtn.current.setAttribute('class','animation-left-rigth') 
  }
  setMenuMobile(true)
}

function closeMenuMobile(){
  if (closeMenuBtn.current) { 
    closeMenuBtn.current.removeAttribute('class','animation-left-rigth') 
    closeMenuBtn.current.setAttribute('class','animation-rigth-left') 
  }
  setTimeout(()=>{
    setMenuMobile(false)
  },500)

}
  return (
    <div className={style.containerMenuMobile}>
      <img
        onClick={openMenuMobile}
        className={style.menuBurguer}
        src={menuBurguer}
        alt=""
      />
      {menuMobile && (
        <ul className={`${style.navLinksMobile} animation-left-rigth`} ref={closeMenuBtn}>
          <img
            onClick={closeMenuMobile}
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
                  closeMenuMobile();
                }}
              >
                Entrar
              </p>
              <p
                className="btn btn-success"
                onClick={() => {
                    setModal("cadUsuario")
                    closeMenuMobile();

                  }}
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
