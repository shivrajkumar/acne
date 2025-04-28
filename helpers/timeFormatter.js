export function getCurrentTimeInReadableForm(){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
  
   let time = new Date();
        const _timestamps = time.toLocaleString(undefined, options);
  
  return _timestamps;
}