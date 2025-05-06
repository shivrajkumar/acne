'use client'
import React, { useEffect } from "react";
import moengage from "@moengage/web-sdk";
const MoengageInit = () => {

    useEffect(()=>{
        if(typeof window !=='undefined'){
            moengage.initialize({
                app_id: 'JR40GQWHTMA53UEQGRBJBJ2X', 
                cluster: 'DC_3' ,
                debug_logs: process.env.NEXT_PUBLIC_APP_ENVIROMENT!='production'?1:0
            });
        }

    },[])
    return (<>
    </>  );
}
 
export default MoengageInit;