import { useContext, useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import useFormSubmit from "@/hooks/useFormSubmit";
import InputText from "../form/InputText";
import { isValidEmail } from "../../helpers/validation";
import { INGESTION_API, TRANSACTION_API } from "../../constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import Loader from "../generic/Loader";
// import Cookies from "js-cookie";
// import { COOKIES_DOMAIN } from "@constants/config";
// import { COOKIES_EXPIRY } from "@constants/constants";
// import { useRouter } from "next/navigation";
// import { handlePreDefinedUserAttributes } from "@/helpers/handleMoengage";
const InputEmail = ({ block, context }) => {
  const {
    questions,
    saveApiResponse,
    queryStrings: { utmData },
  } = useContext(context);

  const handleSubmit = useFormSubmit(context);

  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (block) setReply(() => block.reply);
  }, [block]);
  const _submitReply = async () => {
    let _res = null;

    try {
      var _user = {
        email: reply.toLowerCase().trim(),
        firstName: questions.first_name.reply,
        phone: questions.phone_number.reply,
        countryCode: '+91'
      };
      const _bodyData = _user;
      const _requestOptions = {
        method: "POST",
        body: JSON.stringify(_bodyData),
      };

      _res = await fetchRequest(INGESTION_API(), _requestOptions);
    } catch (error) {
      console.warn(error.message);
    } finally {
      if (_res.status === 200) {
        saveApiResponse(_res.data);
        handleSubmit(reply);
        setReply("");
        window.localStorage.setItem("form_status", "draft");
        window.localStorage.setItem("user_email", _user.email);
        window.localStorage.setItem("synthetic_id", _res.data.syntheticId);

        // Cookies.set("Transaction_ID", _res.data.transactionId, {
        //   domain: COOKIES_DOMAIN,
        //   expires: COOKIES_EXPIRY,
        // });
        // eslint-disable-next-line no-unsafe-finally
        return _res.data.transactionId;
      }
      if (_res.status === 500) {
        setErr("Unexpected error occured, please contact vayu support");
        setHasError(true);
        // eslint-disable-next-line no-unsafe-finally
        return null;
      }

      setErr(_res.data.message);
      // eslint-disable-next-line no-unsafe-finally
      return null;
    }
  };

  const submitUTMData = async (transactionId) => {
    let res = {};
    try {
      for (let key in utmData) {
        const _formData = {
          question_id: key,
          question: key,
          response: utmData[key],
          form_status: "In-Progress",
          locationPath: window.location.pathname + window.location.search,
          formFillSource: "website",
        };

        const _requestOptions = {
          method: "PUT",
          body: JSON.stringify(_formData),
        };

        res = await fetchRequest(
          TRANSACTION_API(transactionId),
          _requestOptions
        );
      }
    } catch (error) {
      console.warn(error.message);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return res;
    }
  };

  const _handleSubmit = async (e) => {
    e?.preventDefault();

    if (hasError) return;

    const _isValid = isValidEmail(reply);
    if (_isValid.hasError) {
      setErr(_isValid.error);
      return;
    }

    if (block.reply === reply) {
      handleSubmit(reply);
      window.localStorage.setItem("user_email", reply);
      return;
    }
    setIsLoading(true);
    const transactionId = await _submitReply();
    if (isEmpty(transactionId)) return setIsLoading(false);

    if (isEmpty(utmData)) return setIsLoading(false);
    const utmRes = submitUTMData(transactionId);
    setIsLoading(false);
    if (utmRes.hasError) return;
  };

  return (
    <>
      {isLoading && <Loader />}
      <InputText
        error={err}
        reply={reply}
        setError={setErr}
        setReply={setReply}
        handleSubmit={_handleSubmit}
        store={context}
      />
    </>
  );
};

export default InputEmail;
