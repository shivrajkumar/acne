import { useContext, useRef, useState } from "react";
// import { SUBMISSION } from "@constants/routes";
import { QuestionsContext } from "@context/questions-store";
import compressImage, { convertBase64URItoBlob } from "@helpers/compressImage";
import useFormSubmit from "@hooks/useFormSubmit";
import isEmpty from "lodash/isEmpty";
import { useRouter, useSearchParams } from "next/navigation";
// import { MD5 } from "crypto-js";
// import selfie from "@assets/images/selfie.png";
import Image from "next/image";
import { useEffect } from "react";
import { formFillStatus } from "@/enums/QuestionEnums";
import { CDN_BASE_URL } from "@constants/config";
// import { getCurrentTimeInReadableForm } from "@/helpers/timeFormatter";
// import { sendMoengageEvent } from "@/helpers/handleMoengage";
import CameraAccess from "../inputComponents/cameraCapture/CameraAccess";
import { fetchRequest } from "@/helpers/fetchRequest";
import { IMAGE_UPLOAD_API, TRANSACTION_API } from "@/constants/urls";
import Loader from "../generic/Loader";
import { logGtmEvent } from "../generic/Gtm";

const settingIcon = `${CDN_BASE_URL}website_images/localImages/setting_icon.webp`;
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
  const [isScanning, setIsScanning] = useState(false);
  // const [scalpView, setScalpView] = useState("");
  const [notify, setNotify] = useState("");
  const [errNotify, setErrNotify] = useState("");
  const [isPermissionChecking, setIsPermissionChecking] = useState(false);
  const searchParams = useSearchParams();
  const pageName = searchParams.get("page");
  const [hideButtons, setHideButtons] = useState(false)
  // const isTamilPage = pageName?.includes("tamil");
  // const activeLanguage = window.localStorage.getItem("activeLanguage");

  useEffect(() => {
    const val = window.localStorage.getItem("photo_acne");
    const genderVal = window.localStorage.getItem("user_gender");
    setGender(genderVal)

    // setGender(genderVal);
    if (block.reply) {
      setStoredImg(true);
      setShowButton(true);
      setCompressingImage(false);
      setCompressedImage(val);
    }
    window?.localStorage.setItem("form_status", "semi-filled")
  }, [reply, block.reply]);

  useEffect(() => {
    const acneImage = window.localStorage.getItem("acneImage");

    if (acneImage) {
      setReply(JSON.parse(acneImage));
    }
  }, []);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file ? file : "");
    });

  const handleImageUpload = async ({ target }, captured, imageUri) => {
    try {
      let _image;
      if (!captured) {
        _image = target.files[0];
      } else {
        _image = await convertBase64URItoBlob(imageUri);
      }

      if (!_image) {
        setCompressedImage(null);
        setShowButton(false);
        return;
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
      const dataUri = await fileToDataUri(_result.compressedImage);
      window.localStorage.setItem("photo_acne", dataUri);
      if (isEmpty(_result.compressedImage)) return;
      window.localStorage.setItem(
        "acneImage",
        JSON.stringify(_result.compressedImage)
      );
      setReply(_result.compressedImage);

      saveReply(block.id, _result.compressedImage);
      logGtmEvent("Image_Upload", { gender: gender })

      setErr("");
      if (!storedImg) setCompressedImage(() => _result.compressedImage);
    } catch (error) {
      setErr("An error occurred during image upload.");
      setShowButton(false);
    }
    setIsScanning(false);
  };

  const handleSuccessResponse = async (reply) => {
    try {
      setIsLoading(true);
      await handleSubmit(reply);
      setAllQuestionsFilled(true);
      window.localStorage.setItem("form_status", "filled");
    } catch (error) {
      console.error("Error in handleSuccessResponse:", error);
      setErr("Something went wrong while saving your response.");
    } finally {
      setIsLoading(false);
    }
  };


  const _handleSubmit = async () => {
    setHideButtons(true);
    setIsLoading(true);
    if (reply) {
      try {
        const fileName = reply.name || "upload.png";
        const fileType = reply.type || "image/png";

        const fileObject = reply instanceof File
          ? reply
          : new File([reply], fileName, {
            type: fileType,
            lastModified: Date.now(),
          });

        const formData = new FormData();
        formData.append("file", fileObject, fileName);

        const _uploadOptions = {
          method: "POST",
          body: formData,
        };

        const _res = await fetchRequest(IMAGE_UPLOAD_API(caseId), _uploadOptions);

        if (_res?.success || _res?.status === 200) {
          const _formData = {
            question_id: block.id,
            field_key: block.id,
            question_text: block.text,
            response: reply,
            status:
              block.id == "stress_level"
                ? formFillStatus.SEMI_FILLED :
                block.id == "photo_q"
                  ? formFillStatus.FILLED
                  : formFillStatus.DRAFT,
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

          const response = await fetchRequest(
            TRANSACTION_API(transactionId),
            _options
          );

          if (response.status === 200) {
            handleSuccessResponse(reply);
          }
        } else {
          setErr(_res?.message || "Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        setErr("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErr("Please insert an image!");
      setIsLoading(false);
    }
  };


  // Improved browser detection for FB/IG browsers
  const isInAppBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /FBAN|FBAV|Instagram/i.test(userAgent); // Checks for Facebook & Instagram
  };

  const isAndroidInAppBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return isInAppBrowser() && /Android/i.test(userAgent);
  };

  // Camera access function with special handling for Android in-app browsers
  const handleCameraAccess = async () => {
    // If already checking permission, don't start another check
    if (isPermissionChecking) return false;

    setIsPermissionChecking(true);

    try {
      // For Android in-app browsers, skip the permissions.query which causes double prompts
      if (isAndroidInAppBrowser()) {
        try {
          // For Android Instagram/Facebook browsers, just return true to open camera directly
          // The actual permission will be requested by the CameraAccess component
          setIsPermissionChecking(false);
          return true;
        } catch (error) {
          showPermissionDeniedMessage(error);
          setIsPermissionChecking(false);
          return false;
        }
      }

      // For other browsers, use the standard permission flow
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "camera",
          });
          if (permissionStatus.state === "denied") {
            console.log("hereeee at denied")
            showPermissionDeniedMessage();
            setIsPermissionChecking(false);
            return false;
          }
        } catch (e) {
          console.warn(
            "Permission API not supported, proceeding with getUserMedia check."
          );
        }
      }

      // Try accessing the camera
      await navigator.mediaDevices.getUserMedia({ video: true });
      setNotify(null);
      setIsPermissionChecking(false);
      return true;
    } catch (error) {
      console.error("Error accessing the camera:", error);
      showPermissionDeniedMessage(error);
      setIsPermissionChecking(false);
      return false;
    }
  };

  // Function to handle permission denied message
  const showPermissionDeniedMessage = (error = null) => {
    if (isInAppBrowser()) {
      setNotify(
        <>
          <div className="flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
            <span>Camera access is blocked in this app.</span>
          </div>
          <span className="flex justify-center items-center font-sans font-[400] text-center text-[14px] text-[#0E0E0E]">
            Open this page in Chrome or Safari to use the camera.
          </span>
          <div
            className="upload-gallery-button bg-[#414042] px-1 py-3 text-[#fff] rounded-lg xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full mt-6"
            onClick={handleCamera}
          >
            {"Allow Access"}
          </div>
        </>
      );
    } else {
      setNotify(
        <>
          <div className="flex justify-center gap-1 items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
            <span>Please enable camera permission.</span>
          </div>
          <span className="flex justify-center items-center font-sans font-[400] text-[14px] text-[#0E0E0E]">
            Tap{" "}
            <Image src={settingIcon} width={24} height={24} alt="settings" />{" "}
            and allow camera access.
          </span>
          <div
            className="upload-gallery-button bg-[#414042] px-1 py-3 text-[#fff] rounded-lg xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full mt-6"
            onClick={handleCamera}
          >
            {"Allow Access"}
          </div>
        </>
      );
    }

    return false;
  };

  const handleCamera = async () => {
    // For Android in-app browsers, open camera directly
    if (isAndroidInAppBrowser()) {
      setShowCam(true);
      return;
    }

    // For all other browsers, check permission first
    const hasPermission = await handleCameraAccess();
    if (hasPermission) {
      setShowCam(true);
    } else {
      setErrNotify("Camera permission is still not allowed.");
    }
  };

  // Helper function to open camera with appropriate event tracking
  const openCamera = () => {
    // Track event
    // const eventAttributesHeader = {
    //   source: "web_native",
    //   timestamps: getCurrentTimeInReadableForm(),
    // };
    // sendMoengageEvent(
    //   "web_picture_clicked",
    //   eventAttributesHeader,
    //   caseId
    // );

    // Skip permission check for Android in-app browsers
    if (isAndroidInAppBrowser()) {
      setShowCam(true);
      return;
    }

    // Use permission check for other browsers
    handleCameraAccess().then((hasPermission) => {
      if (hasPermission) {
        setShowCam(true);
      }
    });
  };

  // Helper function to handle "Take a Picture" click with appropriate handling based on browser
  const handleTakePictureClick = () => {
    // For Android in-app browsers, directly show camera
    if (isAndroidInAppBrowser()) {
      setShowCam(true);
    } else {
      // For other browsers, check permissions first
      handleCamera();
    }

    // Track event (regardless of browser)
    // const eventAttributesHeader = {
    //   source: "web_native",
    //   timestamps: getCurrentTimeInReadableForm(),
    // };
    // sendMoengageEvent(
    //   "web_take_picture_clicked",
    //   eventAttributesHeader,
    //   caseId
    // );
  };

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
                  className=" w-[330px] h-[300px] object-scale-down align-middle cursor-pointer py-5 pt-7"
                  width={330}
                  height={300}
                  priority={false}
                  onClick={openCamera}
                />
              </div>
            </div>
          )}
        </div>
        {!hideButtons && <div>
          {!showButton ? (
            <div className="flex justify-center gap-2 w-[300px]">
              <span
                className={`block px-2 mt-4 uppercase  underline underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-[50%]`}
                onClick={() => {
                  inputRef.current && inputRef.current.click();

                }}
              >
                {"Upload Image"}
              </span>
              <span
                className="block px-2  mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-[50%]"
                onClick={handleTakePictureClick}
              >
                {"Take A Picture"}
              </span>
            </div>
          ) : (
            <div className="flex justify-center w-[300px]">
              <div
                onClick={() => {
                  inputRef.current && inputRef.current.click();

                }}
                className="block px-2  mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-[50%]"
              >
                {"CHANGE IMAGE"}
              </div>
              <div
                onClick={handleTakePictureClick}
                className="block px-2  mt-4 uppercase underline  underline-offset-4 decoration-[#6C6C6C] text-primary/700 text-[14px] cursor-pointer text-center w-[50%]"
              >
                {"TAKE A PICTURE"}
              </div>
            </div>
          )}
        </div>}


        {err !== "" && (
          <span className="block mt-4 text-red-500 text-center font-lato text-[14px]">
            {err}
          </span>
        )}

        <>
          {showButton && (
            <div className="border-white border rounded w-full flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none z-0 py-6">
              <div className="hidden xl:block lg:block md:block sm:block">
                <button
                  id="acne_submit"
                  onClick={() => _handleSubmit()}
                  className="w-[300px] h-[56px] px-[40px] py-[16px] font-[400] text-white rounded-full bg-Neutral/900 transition-all duration-200 shadow-sm"
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
          )}
        </>
        {showCam ? (
          <CameraAccess
            setShowCam={setShowCam}
            getImage={handleImageUpload}
            err={notify}
            inputRef={inputRef}
            errNotify={errNotify}
            isInAppBrowser={isInAppBrowser}
            handleCamera={handleCamera}
          />
        ) : (
          <></>
        )}
      </div>
    </>

  );
};

export default InputImage;
