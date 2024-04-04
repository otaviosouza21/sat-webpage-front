import React, { useState } from 'react'
import { DELETE_DATA } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
 import Toast from '../Toast/Toast'; 



const FuncButton = ({table,method,id,updateDate,children,style}) => {
    const {request, data} = useFetch()
    const [alert,SetAlert] = useState(false)
    


function handleClick(){
if(method === 'DELETE' && updateDate === undefined){
    async function deleteData(){
        const {url,options} = DELETE_DATA(table,id)
        request(url,options)
        SetAlert(true)
        setTimeout(()=>{
         SetAlert(false)
        },3000)
    }

    deleteData()
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