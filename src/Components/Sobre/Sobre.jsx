import React, { useEffect } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import EmConstrucao from "../EmConstrucao/EmConstrucao";

const Sobre = () => {
  useEffect(()=>{
    document.title = 'SAT | Sobre'
  },[])
  return (
    <main>
      <EmConstrucao />
    </main>
  );
};

export default Sobre;
