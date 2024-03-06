import { Navbar, WelcomePage } from "../index";
import { TanStackTable } from '../index';
import Input from './Input'
import { useStateValue} from '../../MyContexts/StateProvider';
import React, { useState,useEffect } from 'react';
import instance from '../../axios';


const Home = () => {

  const [{token},dispatch]=useStateValue();

  const [tableData,setTableData]=useState([]);

  useEffect(()=>{
    if(token!=null && token!="null" && token!=undefined && token!='undefined'){
        const getTableData=async()=>{
            const response=await instance.get('/api/getTableData',{
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            try{
              setTableData(response.data.dataTable.reverse());
            }catch(error){
                console.error("Error fetching table data:",error);
            }
        }
        getTableData();
    }
},[token])

useEffect(()=>{
  console.log("tableData",tableData);
},[tableData])


  if (token!=null && token!="null" && token!=undefined && token!='undefined') {
    return (
      <>
        <div className="pt-4 min-h-screen bg-elite-black">
          <Navbar />
          <Input />
          <TanStackTable data={tableData}/>
        </div>
      </>
    );
  } else {
    return (
      <>
        <WelcomePage />
      </>
    );
  }
  
};

export default Home;
