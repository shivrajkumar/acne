import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/v2/useFormSubmit";
import jsonLogic from "json-logic-js";
import { TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import InputAdditionalText from "./InputAdditionText";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import { FEMALE } from "../../constants/routes";
// import { getCurrentTimeInReadableForm } from "../../helpers/timeFormatter";
// import { activityLoggerForm } from "../../helpers/activityLogger";
import { Modal } from "../form/modal";
import Loader from "../generic/Loader";

const InputRadio = ({ block, context }) => {
  const pathname = usePathname();

  const {
    setAllQuestionsFilled,
    apiResponse: { transactionId ,caseId},
    isHindi,
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [additionalText, setAdditionalText] = useState("");
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    if (block) {
      setReply(block.reply);
    }
  }, [block]);

  const _submitReply = async (reply) => {
    if (block.id === "gender") {
      window.localStorage.setItem("gender", reply);
    }
    setIsLoading(true);
    let _res = "";

    if (block.fn) block.next = jsonLogic.apply(block.fn, { reply });
    try {
    
      const _formData = {
        question_id: block.id,
        question: block.text,
        response: reply,
        locationPath: window.location.pathname + window.location.search,
        formFillSource: "website",
        form_status:
          ['customer_values'].includes(block.next) 
            ? "semi-filled":block.id=='customer_values'?'filled'
            : "In-Progress",
            caseId
      };
    
      const _options = {
        method: "PUT",
        body: JSON.stringify(_formData),
      };

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    
    } catch (error) {
      console.warn(error);
    } finally {
      if (_res.status === 200) {
        await handleSubmit(reply);
        if (block.id =='photo_q' )
        {
          setAllQuestionsFilled(true);
          window.localStorage.setItem('form_status', 'filled');
        }
  
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
      setIsLoading(false);
      // setError(_res.data.message);
    }
  };

  const _handleSubmit = async ({ reply }) => {
    const _reply = reply;
  
    await _submitReply(_reply);
  };

  const _handleSubmitbtn = async () => {
    if (additionalText === "") {
      setError("Please this in ");
      return;
    }
    const _addtionalTextreply = `${reply}, ${additionalText}`;

    if (block.reply === _addtionalTextreply) {
      await handleSubmit(reply);
      if (block.reply && block.id === "gender" && pathname == FEMALE) {
        window.localStorage.setItem("gender", reply);
      }
      return;
    }

    await _submitReply(_addtionalTextreply);
  };

  const handleChange = ({ target }) => {
    setReply(target.value);
    _handleSubmit({ reply: target.value });
  };
  const getGTMElementID = (option, block, index) => {
    if (window.location.pathname === "/guest-form") {
      return (
        gtmParametersMap[block.id] + "-" + option.name.replace("Stage", "STG")
      );
    } else return option.id || `${block.id}_${index + 1}`;
  };

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`flex flex-col sm:space-y-2  font-sans ${
          block.showImages
            ? "w-full md:w-[80%] mt-4 md:mt-6"
            : "w-full md:w-[60%] mt-8 sm:mt-8"
        }`}
      >
        <label
          className="text-[20px] md:text-[24px] font-bold text-gray-700"
          htmlFor={block.id}
        >
          {isHindi ? block.hindi_text : block.text}
        </label>

        <label className="text-[16px] md:text-[18px] mt-2 text-gray-400 align-middle">
          {block.sub_text}
        </label>
        <div
          className={`flex ${
            block.showImages
              ? "w-[100%] border-b pb-2 grid grid-cols-1 md:grid-cols-2 gap-1 mb-8 xl:mb-0 mx-auto"
              : "flex-col md:ml-2"
          }`}
        >
          {block.optionMap?.map((option, index) => (
            <label
              htmlFor={getGTMElementID(option, block, index)}
              key={option.name}
              data-options="responses"
              className={`inline-flex cursor-pointer ${
                block.showImages
                  ? "flex-col bg-gray-100 items-between px-3 py-2 md:py-3 justify-center rounded-md"
                  : "border-b py-3 md:py-1"
              }`}
            >
              <div
                //  className="inline-flex flex-col py-0 md:py-2 flex-1 sm:flex-row sm:items-center"
                className={`${
                  block.showImages
                    ? "flex justify-between w-full"
                    : "inline-flex flex-col py-0 md:py-2 flex-1 sm:flex-row sm:items-center"
                } `}
              >
                <div
                  // className="inline-flex items-center pl-2"
                  className={`${
                    block.showImages ? "pl-0 w-[50%]" : "pl-2"
                  } inline-flex items-center`}
                >
                  <input
                    className="cursor-pointer form-radio text-brand-accent"
                    checked={reply === option.value}
                    id={getGTMElementID(option, block, index)}
                    type="radio"
                    onClick={handleChange}
                    onChange={({ target }) => setReply(target.value)}
                    value={option.value}
                  />
                  <p
                    className={`md:whitespace-nowrap ${
                      block.showImages
                        ? "text-[16px] md:text-[16px] ml-1.5 pr-4 md:pr-2"
                        : "text-[16px] md:text-[18px] px-3"
                    }`}
                  >
                    {isHindi ? option.hindi_name : option.name}
                  </p>
                </div>
                {block.showImages && (
                  <div className="flex w-[50%] justify-end items-end">
                    {/* <Image
                      src={
                        require(`../../assets/images/${option.image_url}`)
                          .default
                      }
                      alt={option.name}
                      className="mr-2 border-r pr-4"
                      height={70}
                      width={70}
                    />
                    <Image
                      src={
                        require(`../../assets/images/${option?.destination_image_url}`)
                          .default
                      }
                      alt={option.name}
                      className="pl-2"
                      height={80}
                      width={80}
                    /> */}
                  </div>
                )}
                {reply === block.additionalTextBox &&
                  option.value === block.additionalTextBox && (
                    <div className="w-full pr-4 mt-4">
                      <InputAdditionalText
                        reply={additionalText}
                        setReply={setAdditionalText}
                        placeholder="Mention which medications"
                      />
                    </div>
                  )}
              </div>
            </label>
          ))}
        </div>
        {error !== "" && (
          <span className="block mt-1 text-brand-accent">{error}</span>
        )}
        {block?.whyWeAsk?.show && (
          <div className="flex justify-end">
            <button
              className="underline font-Nunito text-custom-light-grey text-sm text-end mt-4 mb-6 sm:mb-0"
              onClick={() => setModalOpen(true)}
            >
              Why we ask?
            </button>
            <Modal
              open={openModal}
              setOpen={setModalOpen}
              text={block?.whyWeAsk?.text}
            />
          </div>
        )}
        {reply === block.additionalTextBox && (
          <div className="flex flex-col items-center justify-center mt-4">
            <button
              className="px-6 py-2 uppercase rounded-md w-max bg-brand-accent text-green-50"
              onClick={() => _handleSubmitbtn()}
            >
              continue
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default InputRadio;

const gtmParametersMap = {
  gender: "SFQ1",
  mdandruff: "SFQ3",
  fdandruff: "SFQ3",
  "mHairloss-image": "SFQ5",
  "fHairloss-image": "SFQ5",
  mEnergetic: "SFQ6",
  fEnergetic: "SFQ6",
  mConstipated: "SFQ7",
  fConstipated: "SFQ7",
  mStress: "SFQ8",
  fStress: "SFQ8",
  mSleep: "SFQ9",
  fSleep: "SFQ9",
  fStages: "SFQ11-F",
};
