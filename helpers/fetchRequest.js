import { SECURITY_TOKEN } from "@/constants/config";
import Cookies from "js-cookie";

const DEFAUTL_OPTIONS = { method: "GET" };

export const fetchRequest = async (url, options = { method: "GET" }) => {
  let data = {};
  let status = "";
  const isFormData = options.body instanceof FormData

  try {
    const _options = {
      ...options,
      headers: {
        //  // Only set Content-Type if it's not FormData
        ...(isFormData ? {} : {
           "Content-Type": "application/json",
           }),
        "x-tenant-id": "acne",
        "x-access-token": `${SECURITY_TOKEN}`,
      },
    };

    const _res = await fetch(url, _options);

    status = _res.status;
    const contentType = _res.headers.get("content-type");
    if (contentType?.includes("application/json")) data = await _res.json();
  } catch (error) {
    console.warn(error.message);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { data, hasError: !(status === 200), status };
  }
};

export const fetchRequestWithAuth = async (url, options = DEFAUTL_OPTIONS) => {
  let data = null;
  let status = null;

  const _options = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("ACCESS_TOKEN")}`,
    },
  };

  try {
    const _res = await fetch(url, _options);

    status = _res.status;
    const contentType = _res.headers.get("content-type");
    if (contentType?.includes("application/json")) data = await _res.json();
  } catch (error) {
    console.warn(error.message);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { data, hasError: !(status === 200), status };
  }
};
export const fetchRequestWithoutAuth = async (
  url,
  options = { method: "GET" }
) => {
  let data = {};
  let status = "";

  try {
    const _options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const _res = await fetch(url, _options);

    status = _res.status;
    const contentType = _res.headers.get("content-type");
    if (contentType?.includes("application/json")) data = await _res.json();
  } catch (error) {
    console.warn(error.message);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { data, hasError: !(status === 200), status };
  }
};
