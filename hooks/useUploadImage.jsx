import { useState } from "react";
import { SECURITY_TOKEN } from "../constants/config";

const useUploadImage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState("");

  const uploadImage = async (image, url) => {
    if (image instanceof Blob) {
      setIsLoading(true);
      if (!image) {
        setError("Please upload a jpg or png image");
        setIsLoading(false);
        return { hasError: true };
      }

      const _formData = new FormData();
      _formData.append("image", image, image.newName);

      const _uploadOptions = {
        method: "POST",
        body: _formData,
        headers: {
          Authorization: `Bearer ${SECURITY_TOKEN}`,
        },
      };
      let responseData = {};
      try {
        const _uploadRes = await fetch(url, _uploadOptions);

        if (_uploadRes.status === 200) {
          const _data = await _uploadRes.json();

          responseData = { ..._data };
          setData(responseData);
          setIsSuccess(true);
          return { data: responseData, status: _uploadRes.status };
        } else {
          setError("Sorry we are unable to process your data.");
          return {
            hasError: true,
            message: "Sorry we are unable to process your data.",
          };
        }
      } catch (err) {
        setError(() => err.message);
        return { hasError: true };
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!image) {
        setError("Please upload a jpg or png image");
        setIsLoading(false);
        return { hasError: true };
      }
      try {
        const _apicalls = image.map(async (eachImage) => {
          const _formData = new FormData();
          _formData.append("image", eachImage, eachImage.newName);
          const _uploadOptions = {
            method: "POST",
            body: _formData,
            headers: {
              Authorization: `Bearer ${SECURITY_TOKEN}`,
            },
          };
           await fetch(url, _uploadOptions);
        });
        // eslint-disable-next-line no-undef
        const _data = await Promise.all(_apicalls);
        setIsSuccess(true);
        return { data: { ..._data } };
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return { hasError: true };
      }
    }
  };

  return { error, isLoading, isSuccess, uploadImage, data };
};

export default useUploadImage;
