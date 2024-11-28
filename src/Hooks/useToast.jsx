import React, { useEffect } from "react";
import { toast } from "react-toastify";

const useToast = ( ) => {
  const activeToast = (message,type) => {
    if (!message || !type) {
      console.error("Informações não fornecidas para o toast.");
      return;
    }

    function typeTotastColor(){
    if(type === 'success') return 'green'
    if(type === 'warning') return '#989b0f' 
    if(type === 'error') return 'tomato' 
    }

    toast[type](message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      theme: "colored",
      style: {
        backgroundColor: typeTotastColor()
      }

    });
  }

  return activeToast;
};

export default useToast;
