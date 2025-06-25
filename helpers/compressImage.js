import imageCompression from "browser-image-compression";

const compressImage = async (image) => {
  if (!Boolean(image))
    return {
      error: "Please upload a jpg or png image",
      hasError: true,
    };

  if (image.type !== "image/jpeg" && image.type !== "image/png")
    return {
      error: "Please upload a jpg or png image",
      hasError: true,
    };

  const _options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 960,
    useWebWorker: true,
  };

  try {
    const _compressedImage = await imageCompression(image, _options);
    _compressedImage["newName"] =
      Date.now().toString() + "_" + _compressedImage.name;

    return {
      compressedImage: _compressedImage,
      hasError: false,
    };
  } catch (error) {
    return {
      error: error.message,
      hasError: true,
    };
  }
};

const convertBase64URItoBlob = async (image) => {
  // Split the data URI into parts
  const parts = image.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const rawBase64Data = parts[1];

  // Convert the base64 data to binary data
  const byteCharacters = atob(rawBase64Data);
  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  // Create a Blob from the binary data
  return new Blob([byteArray], { type: "image/png" });
};
const compressedImageMultiple = async (images) => {
  let result = [];
  if (!Boolean(images))
    return {
      error: "Please upload a jpg or png image",
      hasError: true,
    };

  const _options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 960,
    useWebWorker: true,
  };

  for (const image of images) {
    if (image.type !== "image/jpeg" && image.type !== "image/png")
      return {
        error: "Please upload a jpg or png image",
        hasError: true,
      };
    try {
      const _compressedImage = await imageCompression(image, _options);
      _compressedImage["newName"] =
        Date.now().toString() + "_" + _compressedImage.name;

      result.push({
        compressedImage: _compressedImage,
        hasError: false,
      });
    } catch (error) {
      return {
        error: error.message,
        hasError: true,
      };
    }
  }
};
export { compressedImageMultiple, convertBase64URItoBlob };
export default compressImage;
