'use client'
import deleteKeysFromLocalStorage from "@/helpers/localstorage";
import { useEffect } from "react";

const GTMpagelandingEvent = ({event}) => {
    useEffect(()=>{
        if(typeof window !== "undefined"){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event:event})
        }

    },[event])
    return ( null );
}
 
export  function sendGtmEvents(event,attribute={}){
    if(typeof window !== "undefined"){
        window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event,
            ...attribute, 
        });
    }
}

export function clearGtmFlags(keysToDelete){
    // Example usage
    deleteKeysFromLocalStorage(keysToDelete);
  
    // return null
  }
export default GTMpagelandingEvent;