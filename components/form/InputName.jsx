import { useEffect, useState, useContext } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import InputText from "./InputText";
import { isValidName } from "../../helpers/validation";
import { fetchRequest } from "../../helpers/fetchRequest";
import {
  TRANSACTION_API,
  UPDATE_RESPONSE_GUEST_FORM,
} from "@/constants/urls";
import Cookies from "js-cookie";
// import { LAST_QUESTIONS } from "../../constants/config";
import {
  GUEST_FORM_SUBMISSION_COMPLETED,
  logGtmEvent,
  logGtmEventwithParameters,
  triggerGa,
} from "../../helpers/gtmHelpers";
import { SUBMISSION } from "../../constants/routes";
import Loader from "../generic/Loader";
import { useRouter } from "next/navigation";

const InputName = ({ block, context }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    apiResponse: { transactionId },
  } = useContext(context);
  const handleSubmit = useFormSubmit(context);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    if (!block) return;
    setReply(() => block.reply);
  }, [block]);

  const _handleSubmit = async (e) => {
    e?.preventDefault();

    const _isValid = isValidName(reply.trim());

    if (_isValid.hasError && !block.optional) {
      setError(_isValid.error);
      return;
    }

    if (window.location.pathname === "/guest-form") {
      let _res = {};
      let apiKey = block.identifier;
      let obj = {};
      obj[apiKey] = reply;
      try {
        _res = await fetchRequest(
          UPDATE_RESPONSE_GUEST_FORM(Cookies.get("GuestForm_id")),
          {
            method: "PATCH",
            body: JSON.stringify(obj),
          }
        );
      } catch (e) {
        console.warn(e.message);
      } finally {
        if (_res.status === 200) {
          let guestFormID = Cookies.get("GuestForm_id");
          let data = "";
          if (reply) {
            if (block.id === "mLive") {
              data = `SFQ11-` + reply;
            } else {
              data = `SFQ12-` + reply;
            }
          }
          await logGtmEventwithParameters("GUEST_FORM_PLACE_ANSWERED", data);
          await triggerGa();
          await logGtmEvent(GUEST_FORM_SUBMISSION_COMPLETED, guestFormID);
          await triggerGa();
          // window.location.assign(GUEST_FORM_RESULT(guestFormID));
          let arr = [];
          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).substring(0, 5) === "state") {
              arr.push(localStorage.key(i));
            }
          }
          for (let i = 0; i < arr.length; i++) {
            localStorage.removeItem(arr[i]);
          }
        }
      }
      return;
    }

    handleSubmit(reply.trim());
    setError("");
  };
  const _submitReply = async () => {
    if (reply && reply.length > 250) {
      setError("Character limit 250");
      return;
    }
    setIsLoading(true);
    let _res = "";

    try {
      const _formData = {
        question_id: block.id,
        question: block.text,
        response: reply,
        form_status:  "In-Progress",
        locationPath: window.location.pathname + window.location.search,
        formFillSource: "website",
      };

      const _options = {
        method: "PUT",
        body: JSON.stringify(_formData),
      };

      _res = await fetchRequest(TRANSACTION_API(transactionId), _options);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
      if (_res.status === 200) {
        if (_res.data.skipPhoto === true) {
          window.localStorage.setItem("skipPhoto", true);
          await handleSubmit(reply);
          router.push(SUBMISSION);
        } else {
          window.localStorage.setItem("feedback", reply);
          await handleSubmit(reply);
          setReply("");
          window.localStorage.setItem("feedback", reply);
          // eslint-disable-next-line no-unsafe-finally
          return;
        }
      }
      setError(_res.data?.message);
    }
  };
  const handleSubmitFeeback = async (e) => {
    e.preventDefault();

    // if (block.reply === reply) {
    // 	window.localStorage.setItem('age',reply)
    // 	handleSubmit(reply);
    // 	return;
    // }

    await _submitReply();
  };

  return (
    <>
      {isLoading && <Loader />}
      <InputText
        error={error}
        reply={reply}
        setError={setError}
        setReply={setReply}
        handleSubmit={block?.optional ? handleSubmitFeeback : _handleSubmit}
        store={context}
        optional={block?.optional}
      />
    </>
  );
};

export default InputName;
