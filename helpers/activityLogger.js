import { DEFAULT_API_URL } from "../constants/config";
import { fetchRequest } from "./fetchRequest";

//no blocking
const activityLoggerForm =  (sessionId,event, meta ={},origin ='HAIR_TEST',url=`https://form.traya.health/questions`) => {
    let _url = `${DEFAULT_API_URL}log-user-activity`;
    fetchRequest(_url, {
      method: "PUT",
      body: JSON.stringify({
        session_id: sessionId,
        origin: origin,
        url:url,
        user_event: {
          event: event,
          meta:meta
        },
      }),
    });
  };
  export  {activityLoggerForm};