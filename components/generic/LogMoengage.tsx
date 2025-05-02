'use client';
import React, { useEffect } from "react";
import { trackMoEngageEvent } from "@/utils/moegage";

const LogMoengage: React.FC<{ event:string , attributes:object }> = ({event,attributes}) => {
    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            if(attributes)trackMoEngageEvent(event,attributes);
            else trackMoEngageEvent(event,{});
        }
    }, []); 

    return (
        <>
        </>
    );
}

export default LogMoengage;
