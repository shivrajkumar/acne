"use client";
import Image from "next/image";
import ClearRitualLogo from "@assets/images/Clear_Ritual_Logo.png";
import ProgressBar from "../form/ProgressBar";
import CrossIcon from "@assets/icons/close-circle.png"
import ArrowLeft from "@assets/images/arrow-left.png";

const Header = ({
  currentQuestion,
  firstQuestion,
  exitURL = () => { },
  removeFromPreviousQuestion = () => { },
  showProgress = true,
}) => {

  return (
    <>
      <div className="bg-[#FFFFFF] h-[64px] px-[40px] py-[16px] md:px-[40px] md:py-[16px] xs:px-[16px] xs:py-[16px] flex justify-between  items-center">
        <div>
          {currentQuestion && (
            <>
              <div
                className={`flex flex-row flex-wrap `}
              >



                <button
                  className="inline-flex items-center focus:outline-none gap-[4px] z-50"
                  onClick={() => {
                    if (currentQuestion.id === firstQuestion) {
                      exitURL();
                    } else {
                      removeFromPreviousQuestion();
                    }
                  }
                  }
                  id="previous_button"
                >
                  <>
                    <div className="">
                      <Image src={ArrowLeft} alt="Arrow Left" width={24} height={24} />
                    </div>
                    <span className="font-[500] text-[14px] font-lato text-Primary/900 hidden sm:block md:block lg:block xl:block uppercase ">
                      Back
                    </span>
                  </>
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className="flex cursor-pointer ml-[16px] md:m-0"
          onClick={() => window.location.assign("/")}
        >
          <Image src={ClearRitualLogo} alt="Clear Ritual" height={24} width={145} className="text-center" />
        </div>
        <div>
          {currentQuestion && (
            <button
              className="flex items-center focus:outline-none gap-[4px]"
              onClick={exitURL}
              id="exit_button_d"
            >
              <div className="font-[400] text-[14px] font-lato text-Primary/900 hidden sm:block md:block lg:block xl:block uppercase">
                Exit
              </div>

              <Image src={CrossIcon} alt="Cross Icon" width={24} height={24} />
            </button>
          )}
        </div>  
      </div>
      {showProgress && <ProgressBar context={"questions"} />
      }
    </>
  );
};

export default Header;
