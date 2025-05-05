'use client'
import React from 'react';import { useEffect } from 'react';
import {logGtmEvent} from "@helpers/gtmHelpers"
interface props{
    data :{event:string, [key:string]:string| number },
    times :{times:number, key?:string,id?:string}
   }
const LogEvent:React.FC<props> = ({data,times}) => {

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(times.times===1 && times.key && times.id){
             const value =   window.localStorage.getItem(times.key)
             if(times.id!=value){
                data.location= window.location.pathname
                logGtmEvent(data)
                window.localStorage.setItem(times.key,times.id);
             }
            }else{
                data.location= window.location.pathname
                logGtmEvent(data)
            }
           
        }
       
    },[])
    return (  <></>);
}
 
export default LogEvent;
