import { useContext, useRef, useState } from "react";
// import { SUBMISSION } from "@constants/routes";
import { QuestionsContext } from "@context/questions-store";
import compressImage, { convertBase64URItoBlob } from "@helpers/compressImage";
import useFormSubmit from "@hooks/useFormSubmit";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";
// import { MD5 } from "crypto-js";
// import selfie from "@assets/images/selfie.png";
import Image from "next/image";
import { useEffect } from "react";
import { formFillStatus } from "@/enums/QuestionEnums";
// import { getCurrentTimeInReadableForm } from "@/helpers/timeFormatter";
// import { sendMoengageEvent } from "@/helpers/handleMoengage";
import CameraAccess from "../inputComponents/cameraCapture/CameraAccess";
import { fetchRequest } from "@/helpers/fetchRequest";
import { IMAGE_UPLOAD_API, TRANSACTION_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import { logGtmEvent } from "../generic/Gtm";
import { CDN_BASE_URL } from "@/constants/constants";

const front_view = `${CDN_BASE_URL}website_images/clear_rituals/skin_test/acne_upload.webp`;

const InputImage = ({ block }) => {
  const {
    saveReply,
    setAllQuestionsFilled,
    apiResponse: { caseId, transactionId },
  } = useContext(QuestionsContext);

  const handleSubmit = useFormSubmit(QuestionsContext);
  const inputRef = useRef(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressingImage, setCompressingImage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [storedImg, setStoredImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [reply, setReply] = useState(null);
  const [gender, setGender] = useState("");
  const router = useRouter();
  const [showCam, setShowCam] = useState(false);
  const [notify, setNotify] = useState("");
  const [errNotify, setErrNotify] = useState("");
  const [hideButtons, setHideButtons] = useState(false);

  useEffect(() => {
    const val = window.localStorage.getItem("photo_acne");
    const genderVal = window.localStorage.getItem("user_gender");
    setGender(genderVal);

    if (block.reply || val) {
      setStoredImg(true);
      setShowButton(true);
      setCompressingImage(false);
      setCompressedImage(val);
    }
  }, [block.reply]);

  useEffect(() => {
    const acneImage = window.localStorage.getItem("acneImage");
    if (acneImage) {
      setReply(JSON.parse(acneImage));
    }
  }, []);

  const fileToDataUri = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async ({ target }, captured, imageUri) => {
    let _image;
    let dataUri;
    try {
      if (!captured) {
        _image = target.files[0];
        if (!_image) {
          // If no new image is selected, do nothing
          return;
        }
        logGtmEvent('image_upload_success', { location: window?.location?.pathname, question: block.id });

        dataUri = await fileToDataUri(_image);
      } else {
        logGtmEvent('image_takepicture_opened', { location: window?.location?.pathname, question: block.id });
        _image = await convertBase64URItoBlob(imageUri);
        dataUri = imageUri;
        logGtmEvent('image_takepicture_success', { location: window?.location?.pathname, question: block.id });
      }

      setShowButton(true);
      setCompressingImage(true);
      const _result = await compressImage(_image);
      setCompressingImage(false);

      if (_result.hasError) {
        setErr(() => _result.error);
        setShowButton(false);
        return;
      }

      if (isEmpty(_result.compressedImage)) return;

      // Store the new compressed image with error handling for localStorage
      try {
        window.localStorage.setItem("photo_acne", dataUri);
        window.localStorage.setItem("acneImage", JSON.stringify(_result.compressedImage));
      } catch (storageError) {
        if (storageError.name === 'QuotaExceededError') {
          // If localStorage is full, use the compressed image directly
          console.warn('Local storage quota exceeded. Using compressed image without storing.');
        } else {
          throw storageError;
        }
      }

      saveReply(block.id, _result.compressedImage);
      window.localStorage.setItem("form_status", "semi-filled");

      setErr("");
      // Always set the new compressed image
      setCompressedImage(_result.compressedImage);
      setStoredImg(false); // Reset stored image flag to use object URL
      setReply(_result.compressedImage);
    } catch (error) {
      console.error("Image upload error:", error);
      setErr("Failed to upload image. Please try again.");
      setShowButton(false);
    }
  };


  const _handleSubmit = async () => {
    if (reply) {
      try {
        // Convert Blob to File object properly
        const fileName = reply.name || "upload.png";
        const fileType = reply.type || "image/png";

        const fileObject = new File([reply], fileName, {
          type: fileType,
          lastModified: Date.now(),
        });

        const formData = new FormData();
        formData.append("file", fileObject, fileName);

        const _options = {
          method: "POST",
          body: formData,
        };

        const _res = await fetchRequest(IMAGE_UPLOAD_API(caseId), _options);
        if (_res?.success || _res?.status === 200) {

          const _formData = {
            question_id: block.id,
            field_key: block.id,
            question_text: block.text,
            response: reply,
            status:
              block.id == "photo_q"
                ? formFillStatus.FILLED
                : formFillStatus.SEMI_FILLED,
            location_path: window.location.pathname + window.location.search,
            source: "website",
            response_type: block.type,
          };

          const _options = {
            method: "POST",
            body: JSON.stringify(_formData),
          };

          if (["customer_values"].includes(block.next)) {
            window.localStorage.setItem("form_status", "semi-filled");
          }

          const response = await fetchRequest(TRANSACTION_API(transactionId), _options);
          if (response.status == 200) {
            handleSubmit(reply);

            setAllQuestionsFilled(true);

          }
          window.localStorage.setItem("form_status", "filled");
        } else {
          setErr(_res?.message || "Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setErr("Something went wrong. Please try again.");
      }
    } else {
      setErr("Please insert an image!");
    }
  };

  const handleCameraAccess = async () => {
    try {
      logGtmEvent('image_takepicture_opened', { location: window?.location?.pathname, question: block?.id });
      // Create a reusable notification component
      const createCameraNotification = () => (
        <>
          <div className="flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
            <span>Please enable camera access</span>
          </div>
          <div
            className="upload-gallery-button bg-[#E6F0BD] px-1 py-3 text-[#40413E] rounded-lg xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full mt-6"
            onClick={() => {
              handleCamera();
            }}
          >
            {"Open Camera"}
          </div>
        </>
      );

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isSafari || !navigator.permissions) {
        // Fallback for iOS Safari
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setShowCam(true);
          setNotify(null);
          return true;
        } catch (error) {
          console.error("Safari fallback error:", error);
          setNotify(createCameraNotification());
          return false;
        }
      } else {
        const permissionStatus = await navigator.permissions.query({ name: 'camera' });

        permissionStatus.onchange = async () => {
          if (permissionStatus.state === 'denied') {
            setNotify(
              <>
                <div className="flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
                  <span>Camera access is currently blocked</span>
                </div>
                {createCameraNotification()}
              </>
            );
            return false;
          }
        }

        // Handle different permission states
        switch (permissionStatus.state) {
          case 'granted':
            try {
              const stream = await navigator?.mediaDevices?.getUserMedia({ video: true });

              // Close the stream immediately
              stream.getTracks().forEach(track => track.stop());

              setShowCam(true);
              setNotify(null);
              return true;
            } catch (mediaError) {
              console.error("Error getting user media:", mediaError);
              setNotify(createCameraNotification());
              return false;
            }

          case 'denied':
            setNotify(
              <>
                <div className="flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
                  <span>Camera access is currently blocked</span>
                </div>
                {createCameraNotification()}
              </>
            );
            return false;

          case 'prompt':
            return false;

          default:
            setNotify(createCameraNotification());
            return false;
        }
      }

    } catch (error) {
      console.error("Unexpected error in handleCameraAccess:", error);

      // Fallback notification with Open Camera button
      setNotify(
        <>
          <div className="w-full flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
            <span>An unexpected error occurred</span>
          </div>
          {createCameraNotification()}
        </>
      );

      return false;
    }
  };

  const handleCamera = async () => {
    try {
      logGtmEvent('image_takepicture_opened', { location: window?.location?.pathname, question: block?.id });

      // Explicitly request camera access
      const stream = await navigator?.mediaDevices?.getUserMedia({ video: true });

      // Close the stream immediately
      stream.getTracks().forEach(track => track.stop());

      setShowCam(true);
      setNotify(null);
    } catch (error) {
      console.error("Camera access failed:", error);

      // Detailed error handling
      const errorMessage = error.name === 'NotAllowedError'
        ? "Camera access was denied. Please check your browser settings."
        : "An error occurred while accessing the camera.";

      setNotify(
        <>
          <div className="text-red-500 mb-4 text-center flex justify-center">{errorMessage}</div>
          <div
            className="upload-gallery-button bg-[#E6F0BD] px-1 py-3 text-[#40413E] rounded-lg xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full"
            onClick={() => {
              handleCamera();
            }}
          >
            {"Retry Open Camera"}
          </div>
        </>
      );
    }
  };

  const openGallery = () => {
    logGtmEvent('image_upload_opened', { location: window?.location?.pathname, question: block?.id });
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSkip = async () => {
    try {
      const _formData = {
        question_id: block.id,
        field_key: block.id,
        question_text: block.text,
        response: reply ?? [],
        status:
          block.id == "photo_q"
            ? formFillStatus.FILLED
            : formFillStatus.SEMI_FILLED,
        location_path: window.location.pathname + window.location.search,
        source: "website",
        response_type: block.type,
      };

      const _options = {
        method: "POST",
        body: JSON.stringify(_formData),
      };
      const response = await fetchRequest(TRANSACTION_API(transactionId), _options);
      if (response.status == 200) {
        handleSubmit(reply);

        setAllQuestionsFilled(true);

      }
      window.localStorage.setItem("form_status", "filled");
    } catch (error) {
      console.error(error);
      setErr("Something went wrong. Please try again.");
    }

  }

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col items-center  mt-8 sm:mt-8 w-full max-w-4xl mx-auto gap-[16px] md:gap-[16px] xs:gap-[8px] font-lato">
        <label
          className="font-lato font-[400] text-[44px] xs:text-[28px] md:text-[44px] text-Text/Heading-Text italic -tracking-[2%] text-center"
          htmlFor={block.id}
        >
          {block.text}
        </label>

        {block.sub_text && (
          <label className="text-Text/Label font-lato font-[400] text-[14px] text-center">
            {block.sub_text}
          </label>
        )}

        <div
          className={`relative  mt-5 flex flex-col items-center justify-center  border-[1px]  border-primary/700 border-dashed
         w-[300px] h-[230px] rounded-[8px] `}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 -z-10 w-full h-full opacity-0 cursor-pointer"
            id={block.id}
            ref={inputRef}
            onChange={handleImageUpload}
          />
          {compressedImage ? (
            <div className="flex flex-col items-center justify-center max-w-full max-h-full">
              {storedImg ? (
                <Image
                  src={compressedImage}
                  alt="uploaded"
                  className="object-scale-down align-middle w-[228px] h-[182px]"
                  width={228}
                  height={182}
                  id="acneImg"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(compressedImage)}
                  alt="uploaded"
                  className="object-scale-down align-middle  w-[228px] h-[182px]"
                  width={228}
                  height={182}
                  id="acneImg"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center max-w-full max-h-full p-[24px]">
              <div className="flex flex-col justify-center items-center ">
                <Image
                  src={front_view}
                  alt="selfie"
                  className=" object-contain align-middle cursor-pointer "
                  width={330}
                  height={300}
                  priority={false}
                  onClick={() => {
                    handleCameraAccess();
                    setShowCam(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {!hideButtons && <div>
          {!showButton ? (
            <div className="flex justify-between w-[280px]">
              <button
                className={`block  mt-4 uppercase  underline underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-fit `}
                onClick={openGallery}
              >
                {"Upload Image"}
              </button>
              <button
                className="block  mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-fit"
                onClick={() => {
                  handleCameraAccess();
                  setShowCam(true);
                }}             >
                {"Take A Picture"}
              </button>
            </div>
          ) : (
            <div className="flex justify-between w-[280px]">
              <button
                onClick={openGallery}
                className="block mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-fit "
              >
                {"CHANGE IMAGE"}
              </button>
              <button
                onClick={() => {
                  handleCameraAccess();
                  setShowCam(true);
                }}
                className="block mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-fit"
              >
                {"TAKE A PICTURE"}
              </button>
            </div>
          )}
        </div>}


        {err !== "" && (
          <span className="block mt-4 text-red-500 text-center font-lato text-[14px]">
            {err}
          </span>
        )}

        <>
          {showButton ? (
            <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-0 py-6">
              <div className="hidden xl:block lg:block md:block sm:block">
                <button
                  id="acne_submit"
                  onClick={() => _handleSubmit()}
                  className="w-[300px] h-[56px] px-[40px] py-[16px] font-[400] text-white rounded-full bg-Neutral/900 transition-all duration-200 shadow-sm"
                  disabled={compressingImage}
                >
                  {compressingImage ? (
                    <span className="animate-pulse">Processing</span>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
              <div className="border-white border block xl:hidden lg:hidden md:hidden sm:hidden ">
                <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-0 py-6">
                  <button
                    id="acne_submit"
                    onClick={() => _handleSubmit()}
                    className="w-[300px] h-[56px] px-[40px] py-[16px] font-[400] text-white rounded-full bg-Neutral/900 transition-all duration-200 shadow-sm"
                    disabled={compressingImage}

                  >
                    {compressingImage ? (
                      <span className="animate-pulse">Processing</span>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : <>
            <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-0 py-6">
              <div className="hidden xl:block lg:block md:block sm:block">
                <button
                  id="acne_submit"
                  onClick={() => handleSkip()}
                  className="w-[300px] h-[56px] px-[40px] py-[16px] font-[400] text-white rounded-full bg-Neutral/900 transition-all duration-200 shadow-sm"
                  disabled={compressingImage}
                >
                  SKIP
                </button>
              </div>
              <div className="border-white border block xl:hidden lg:hidden md:hidden sm:hidden ">
                <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-0 py-6">
                  <button
                    id="acne_submit"
                    onClick={() => handleSkip()}
                    className="w-[300px] h-[56px] px-[40px] py-[16px] font-[400] text-white rounded-full bg-Neutral/900 transition-all duration-200 shadow-sm"
                    disabled={compressingImage}

                  >
                    SKIP
                  </button>
                </div>
              </div>
            </div></>}
        </>
        {showCam && (
          <CameraAccess
            setShowCam={setShowCam}
            getImage={handleImageUpload}
            err={notify}
            inputRef={inputRef}
            errNotify={errNotify}
            key={Date.now()}
          />
        )}
      </div>
    </>

  );
};

export default InputImage;
