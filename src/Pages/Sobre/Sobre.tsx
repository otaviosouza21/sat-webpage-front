import { useEffect } from "react";

import Title from "../../Components/Titles/Title";
import Button from "../../Components/Button/Button";
import style from "./Sobre.module.css";
import star from "../../assets/icons/star.svg";
import worker from "../../assets/icons/worker.svg";
import tools from "../../assets/icons/tools.svg";
import figuraSat from "../../assets/img/sobre_sat.svg";
import figuraPortal from "../../assets/img/sobre_portal.svg";

const Sobre = () => {
  useEffect(() => {
    document.title = "SAT | Sobre";
  }, []);

  return (
    <section>
      <div className={`container ${style.sat}`}>
        <Title fontSize="3" text="Sociedade Amigos de Taiaçupeba" />
        <p data-aos="zoom-in">
          Transformamos esforços individuais em sucessos coletivos em
          Taiaçupeba.
        </p>
        <p data-aos="zoom-in">
          Priorizamos o crescimento pessoal e o respeito mútuo, promovendo
          justiça social e solidariedade.
        </p>
        <Button>Saiba Mais</Button>
        <img
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          src={figuraSat}
          alt=""
        />
      </div>
      <div style={{ background: "var(--primary2)", marginBottom: "2rem" }}>
        <div className={`container ${style.portal}`}>
          <Title fontSize="3" text="Portal do Empreendedor" />
          <p>Simplificando o acesso às oportunidades.</p>
          <ul className={style.portal_servicos}>
            <li data-aos="fade-right">
              <div className={style.containerImg}>
                <img src={worker} alt="" />
              </div>
              <p>
                Encontre facilmente serviços na sua região: reunimos todas as
                informações que você precisa em um único lugar.
              </p>
            </li>
            <li data-aos="fade-left">
              <div className={style.containerImg}>
                <img src={star} alt="" />
              </div>
              <p>
                Avalie o serviço recebido e colabore com o crescimento do
                profissional, ajudando mais pessoas a conhecê-lo.
              </p>
            </li>
            <li data-aos="fade-right">
              <div className={style.containerImg}>
                <img src={tools} alt="" />
              </div>
              <p>
                É um prestador de serviços? Inscreva-se agora mesmo e aumente
                suas oportunidades, dando mais visibilidade ao seu negócio.
              </p>
            </li>
          </ul>
          <img
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="500"
            className={style.figura}
            src={figuraPortal}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Sobre;
