import { toast } from "react-toastify";


interface ActiveToastProps{
  message: string;
  type:'success' | 'warning'| 'error';
}

const useToast = ( ) => {

  const activeToast = ({message,type}:ActiveToastProps) => {
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
        theme: "colored",
        style: {
          backgroundColor: typeTotastColor()
        }
        
      });
    }
  

  return activeToast;
};

export default useToast;
