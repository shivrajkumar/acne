"use client";

import { createContext, useState, useEffect } from "react";
import { CUSTOMER_DETAILS_API } from "@constants/urls";
import { fetchRequestWithAuth } from "@helpers/fetchRequest";

export const CustomerDataContext = createContext();

export const CustomerDataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchDataFromAPI = async () => {
    let _res = await fetchRequestWithAuth(CUSTOMER_DETAILS_API);
    return _res;
  };

  return (
    <CustomerDataContext.Provider value={{ data }}>
      {children}
    </CustomerDataContext.Provider>
  );
};
