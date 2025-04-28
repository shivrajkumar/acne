import { useContext, useEffect, useRef } from "react";
import ArrowCircleRight from "@/assets/icons/ArrowCircleRight";
import { BsArrowRightShort } from "react-icons/bs";
import { keypress } from "../../helpers/keypress";
import { BsArrowLeftShort } from "react-icons/bs";

import { QuestionsContext } from "../../context/questions-store";

// import { usePathname } from "next/navigation";

import CountryCodeDropdown from "./CountryCodeDropdown";

const InputText = ({
  error,
  reply,
  setError,
  setReply,
  handleSubmit,
  store,
  optional,
  phoneNumber,
  setCountry,
  country,
}) => {
  const { currentQuestion } = useContext(store);
  const { firstQuestion, removeFromPreviousQuestion } =
    useContext(QuestionsContext);
  const inputRef = useRef(null);
  // const pathname = usePathname();

  useEffect(() => {
    if (inputRef) inputRef.current.focus();
    if (optional) adjustTextareaHeight();
  }, []);

  const handleKeyPress = (event) => {
    if(event.charCode === 13){
      handleSubmit()
    }
    const _isValid = keypress(event, currentQuestion.type);

    if (_isValid.hasError) {
      setError(_isValid.error);
      return;
    }
    setError("");
  };
  const handleKeyPressTx = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      return;
    }

    if (reply?.length > 250 && event.key !== "Backspace") {
      event.preventDefault();
      setError("Character limit 250");

      return;
    }
    setError("");
  };
  // const handlePaste = (event) => {
  //   if (reply?.length > 250) {
  //     event.preventDefault();
  //     setError("Character limit 250");

  //     return;
  //   }
  // };

  const exitURL = () => {
    return typeof window !== "undefined" && window.location.assign("/");

  };

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "2rem"; // Reset height to initial value
      textarea.style.height =
        textarea.scrollHeight > 90 ? "4.5rem" : textarea.scrollHeight + "px";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-8 md:mt-8 w-full md:w-[60%] mx-auto font-sans"
    >
      <label
        className="h-12 text-[20px] md:text-[24px] font-bold text-gray-700"
        htmlFor={currentQuestion.id}
      >
        {currentQuestion.text}{" "}
        {optional && (
          <span className="h-12 whitespace-nowrap text-[20px] md:text-[24px] text-gray-400">
            {"(Optional)"}
          </span>
        )}
      </label>

      <div className="h-12 text-gray-400">{currentQuestion.sub_text} </div>
      <div className="relative w-full mt-2 md:mt-12 sm:w-4/5 md:w-full">
      <div className="flex items-center">{
      phoneNumber?<CountryCodeDropdown setCountry={setCountry}  country={country}/>
      :<></>}
          {!optional ? (
            <input
              className="w-full !rounded-none  border-b-2 border-[#BA9D86] form-input ring-transparent focus:outline-none active:ring-transparent focus:border-[#BA9D86] active:border-[#BA9D86] p-3"
              id={currentQuestion.id}
              key={currentQuestion.id}
              onChange={({ target }) => setReply(target.value)}
              onKeyPress={handleKeyPress}
              ref={inputRef}
              type={currentQuestion.type}
              value={reply}
              placeholder={
                currentQuestion.id === "first_name"
                  ? "Your Name"
                  : currentQuestion.text
              }
              maxLength={currentQuestion.id === "phone_number" ? 10 : null}

            />
          ) : (
            <textarea
              className="w-full pr-2 border-b-2 mt-3 border-[#BA9D86] form-input ring-transparent focus:outline-none active:ring-transparent focus:border-[#BA9D86] active:border-[#BA9D86] "
              id={currentQuestion.id}
              key={currentQuestion.id}
              onChange={({ target }) => {
                setReply(target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyPressTx}
              ref={inputRef}
              maxLength={250}
              value={reply}
              placeholder={"Character limit 250"}
              style={{
                resize: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          )}
          {!optional && (
            <button
              type="submit"
              disabled={
                error ===
                "Unexpected error occured, please contact traya support"
              }
              className="absolute right-2 focus:outline-none active:outline-none top-3"
            >
              {
                <div className="text-[#414042] w-6 h-6 block xl:hidden lg:hidden md:hidden sm:hidden">
                  <ArrowCircleRight />
                </div>
              }
            </button>
          )}
        </div>

        {error !== "" && (
          <span className="block text-[#BA9D86]">{error}</span>
        )}

        {reply && optional && (
          <span className="block mt-2 text-[#BA9D86] text-right">
            {reply.length + "/" + 250}
          </span>
        )}
      </div>

      {currentQuestion.id !== firstQuestion && (
        <button
          className="inline-flex w-fit items-center focus:outline-none text-brand-dark"
          onClick={() =>
            currentQuestion.id === firstQuestion
              ? exitURL()
              : removeFromPreviousQuestion()
          }
          id="previous_button"
          type="button"
        >
          {
            <div className="block sm:hidden md:hidden lg:hidden xl:hidden mt-4">
              <BsArrowLeftShort color="#414042" size={27} />
            </div>
          }
        </button>
      )}

      {currentQuestion.id && (
        <>
          <div
            className={`flex flex-row flex-wrap justify-center mt-6 w-full sm:static bottom-0 left-0 right-0 sm:mb-4  bg-white pt-4 pb-2 z-10`}
          >
            {!optional && (
              <>
                <div className="hidden xl:block lg:block md:block sm:block">
                  <button
                    className="uppercase px-32 my-2 py-3 bg-[#414042] text-white rounded-[4px] text-[22px] font-sans font-[600] focus:outline-none"
                    onClick={handleSubmit}
                  >
                    <div className="flex justify-center items-center">
                      <p className="text-[17px]">Next</p>
                      <BsArrowRightShort color="#FFF" size={25} />
                    </div>
                  </button>
                </div>
              </>
            )}
            {optional && (
              <>
                <div className="hidden xl:block lg:block md:block sm:block">
                  <button
                    type="submit"
                    className="uppercase px-32 my-2 py-3 bg-[#414042] text-white rounded-[4px] text-[22px] font-sans font-[600] focus:outline-none"
                  >
                    <div className="flex justify-center items-center">
                      <p className="text-[17px]">{!reply ? "SKIP" : "NEXT"}</p>
                      <BsArrowRightShort color="#FFF" size={25} />
                    </div>
                  </button>
                </div>
                <div className="block xl:hidden lg:hidden md:hidden sm:hidden">
                  <div className="mt-4 flex justify-center align-center fixed bottom-0 right-0 bg-white font-bold focus:outline-none w-full">
                    <button
                      type="submit"
                      className={`uppercase px-12 my-2 py-3 w-[95%] bg-[#414042] text-white rounded-[4px] text-[22px] font-sans font-[600] focus:outline-none
                     `}
                    >
                      <div className="flex justify-center items-center">
                        <p className="text-[17px]">
                          {!reply ? "SKIP" : "NEXT"}
                        </p>
                        <BsArrowRightShort color="#FFF" size={25} />
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default InputText;
