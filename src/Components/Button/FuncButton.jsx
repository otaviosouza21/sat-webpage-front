import React, { useContext, useState } from 'react'
import { DELETE_DATA } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
 import Toast from '../Toast/Toast'; 
import { GlobalContext } from '../../Hooks/GlobalContext';
import { useHref, useLocation, useNavigate } from 'react-router-dom';



const FuncButton = ({table,method,id,updateDate,children,style}) => {
    const {request, data} = useFetch()
    const [alert,SetAlert] = useState(false)
    const {update,setUpdate,setDataUpdate} = useContext(GlobalContext)
    const navigate = useNavigate()
   
    
    


function handleClick(){

if(method === 'DELETE' && updateDate === undefined){
    async function deleteData(){
        const {url,options} = DELETE_DATA(table,id)
        const {response,json} = await request(url,options)
        if(response.ok){
            setUpdate(!update)
            SetAlert(true)
            setTimeout(()=>{
                SetAlert(false)
               },3000)
        }
        else {
            console.log('Ocoreu um erro');
        }
    }
    deleteData()
} else if(method === 'PUT' && updateDate !== undefined){
    setDataUpdate(updateDate)
    navigate(`/cadastro-${table}`)
    setUpdate(true)
}


}
    return (
        <>
          <button className={style} onClick={handleClick}>
           {children}
         </button>
       
        </>
      );
}

export default FuncButton