import { CDN_BASE_URL } from "@/constants/config";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import closeIcon from "@assets/icons/close-circle.png";

const imageBackground = `${CDN_BASE_URL}website_images/localImages/scalpi_section/image_background.webp`;
const galaryIcon = `${CDN_BASE_URL}website_images/localImages/scalpi_section/galary.webp`;
const resetIcon = `${CDN_BASE_URL}website_images/localImages/scalpi_section/reset.webp`;
const imageCapture = `${CDN_BASE_URL}website_images/localImages/scalpi_section/image_capture.webp`;
const cautionIcon = `${CDN_BASE_URL}website_images/localImages/caution_icon.webp`;


const CameraAccess = ({ getImage, setShowCam, inputRef, err, errNotify, isInAppBrowser, handleCamera }) => {
  const webcamRef = useRef(null);
  const wrapperRef= useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    getImage({},true, imageSrc);
    setShowCam(false);
  };

  useEffect(() => {
    if (isInAppBrowser) {
      // Try accessing the camera once (don't prompt again)
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          setHasCameraAccess(true);
          setCameraError(null);
        })
        .catch(() => {
          setHasCameraAccess(false);
          setCameraError(true);
        });
    }
  }, [isInAppBrowser]);

  const handleAllowAccessClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraError(null);
      setHasCameraAccess(true);
    } catch (err) {
      setCameraError(true);
    }
  };

  if (isInAppBrowser && cameraError && !hasCameraAccess) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black flex items-end justify-center">
        <div className="bg-white rounded-t-2xl p-6 w-[100%] max-w-md text-center relative">
          <button className="absolute top-3 right-3" onClick={() => setShowCam(false)}>
            {/* <Image src={closeIcon} width={24} height={24} alt="close" /> */} Close
          </button>
          <div className="flex flex-col items-center gap-2">
            <Image src={cautionIcon} width={40} height={40} alt="caution" />
            <p className="font-bold text-[#EF9833] text-lg">Camera Access Denied</p>
          </div>

          <div
            className="upload-gallery-button bg-[#414042] px-1 py-3 text-[#fff] rounded-lg xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full mt-6"
            onClick={handleAllowAccessClick}
          >
            Allow Access
          </div>

          <div className="flex w-full justify-center items-center my-6">
            <hr className="w-[45%] border-[1px] border-[#E4E4E2]" />
            <p className="px-1 text-[#C9C9C9] font-sans font-[700] text-[12px]">OR</p>
            <hr className="w-[45%] border-[1px] border-[#E4E4E2]" />
          </div>
          <div
            ref={wrapperRef}
            className="upload-gallery-button mt-6 px-4 py-3 text-[#2C2C2A] rounded-lg border border-[#2C2C2A] cursor-pointer text-center"
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
              setShowCam(false);
            }}
          >
            Upload image from Gallery
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      <div className="flex items-center justify-center w-full h-full sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[25%] rounded-lg m-auto sm:mt-0 relative">
        <div className=" h-full w-full absolute z-50 ">
          <div className="picture_circle"></div>
          {!err && (
            <button
              className="fixed z-50 top-3 text-xl right-2 px-2.5 py-1 uppercase rounded-[100%] border-white text-green-50 font-bold"
              onClick={() => setShowCam(false)}
            >
              X
            </button>
          )}
        </div>

        {!err && (
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/png"
            className="w-full rounded-sm"
          />
        )}

        <div className="fixed bottom-0 z-50 w-full bg-black py-5 px-3 flex justify-around xl:justify-center xl:ps-0 items-center gap-12">
          <Image
            src={galaryIcon}
            alt="gallery"
            height={60}
            width={60}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
              setShowCam(false);
            }}
          />

          <button onClick={capturePhoto}>
            <Image
              src={imageCapture}
              alt="capture button"
              height={80}
              width={80}
            />
          </button>
          <div className="w-[60px] h-[60px]"></div>
        </div>
      </div>

      {err && (
        <div className="w-full flex justify-center relative">
          <div className="fixed bottom-0 z-50 bg-white rounded-t-xl px-6 pt-6 pb-10 w-full md:w-[60%] lg:w-[50%] xl:w-[25%] flex flex-col justify-center items-center">
            <button
              className="absolute z-50 top-3 right-2 uppercase rounded-[100%]"
              onClick={() => setShowCam(false)}
            >
              <Image src={closeIcon} width={24} height={24} alt="close" />
            </button>
            <div className="flex flex-col items-center justify-center mb-4 gap-2">
              <Image src={cautionIcon} width={40} height={40} alt="caution" />
              <p className="font-sans font-[700] text-[17px] text-[#EF9833]">
                Camera Access Denied
              </p>
            </div>
            {err}
            {errNotify && (
              <div className="text-[14] mt-2 text-red-500">{errNotify}</div>
            )}
            <div className="flex w-full justify-center items-center my-6">
              <hr className="w-[45%] border-[1px] border-[#E4E4E2]" />
              <p className="px-1 text-[#C9C9C9] font-sans font-[700] text-[12px]">
                OR
              </p>
              <hr className="w-[45%] border-[1px] border-[#E4E4E2]" />
            </div>
            <div
              ref={wrapperRef}
              className="upload-gallery-button px-1 py-3 text-[#2C2C2A] rounded-lg border border-[#2C2C2A] xs:text-[14px] lg:text-[18px] cursor-pointer text-center w-full"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
                setShowCam(false);
              }}
            >
              {"Upload image from Gallery"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraAccess;
