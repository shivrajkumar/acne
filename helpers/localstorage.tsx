

const deleteKeysFromLocalStorage = (keys: string[]) => {
  if (typeof localStorage !== "undefined") {
    keys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`Key '${key}' deleted from local storage.`);
      } else {
        console.log(`Key '${key}' does not exist in local storage.`);
      }
    });
  } else {
    console.log("Local storage is not supported in this browser.");
  }
};



export default deleteKeysFromLocalStorage;

  