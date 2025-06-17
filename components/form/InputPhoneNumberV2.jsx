import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import InputText from "./InputText";
import { isValidPhone } from "../../helpers/validation";
// import { handleBiteSpeedData } from "../../helpers/biteSpeed";
import { INGESTION_API, TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import Cookies from "js-cookie";
import { APP_TRAYA_DASHBOARD, COOKIES_EXPIRY } from "@/constants/constants";
import { isEmpty } from "lodash";
import { env } from "next-runtime-env";
// import { handleFreshUserAttributes } from "../../app/api/handleFreshDesk";
const InputPhoneNumber = ({ block, context }) => {
	const {
		questions,
		saveApiResponse,
		queryStrings: { utmData, cohort },
	} = useContext(context);
	const COOKIES_DOMAIN = env("NEXT_PUBLIC_COOKIES_DOMAIN")


	const handleSubmit = useFormSubmit(context);

	const [error, setError] = useState("");
	const [reply, setReply] = useState("");
	const [hasError, setHasError] = useState(false);
	const [, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	if (block) setReply(() => block.reply.substring(3));
	// }, [block]);
	useEffect(() => {
		if (block) setReply(() => block.reply.replace("+91", ""));
	}, [block]);

	// const _handleSubmit = e => {
	// 	e.preventDefault();

	// 	const _isValid = isValidPhone(reply);
	// 	if (_isValid.hasError) {
	// 		setError(_isValid.error);
	// 		return;
	// 	}

	// 	handleSubmit("+91" + reply);
	// 	handleBiteSpeedData(reply);
	// 	setError("");
	// };

	const _submitReply = async () => {
		let _res = null;

		try {
			const _form = [];
			const _user = {
				email: reply.replace("+", "") + "@tatva.health",
				first_name: questions.first_name.reply,
				phone_number: "+91" + reply.trim(),
			};

			if (cohort) {
				_form.push({
					question_id: "cohort",
					question: "cohort",
					response: cohort,
					form_status: "In-Progress",
				});
			}
			const _bodyData = { form: _form, user: _user };
			const _requestOptions = {
				method: "POST",
				body: JSON.stringify(_bodyData),
			};
			_res = await fetchRequest(INGESTION_API(), _requestOptions);
		} catch (error) {
			console.warn(error.message);
		} finally {
			if (_res.status === 200 && !_res.data.latest_order_id) {
				saveApiResponse(_res.data);
				handleSubmit(reply);
				setReply("");
				window.localStorage.setItem("form_status", "draft");
				// handleFreshUserAttributes({
				// 	Email: questions.email.reply,
				// 	"Form Status": "draft",
				// });	        
				Cookies.set("Transaction_ID", _res.data.transactionId, {
					domain: COOKIES_DOMAIN,
					expires: COOKIES_EXPIRY,
				});
				Cookies.set("Synthetic_ID", _res.data.syntheticId, {
					domain: COOKIES_DOMAIN,
					expires: COOKIES_EXPIRY,
				});

				Cookies.set("form_status", "draft", {
					domain: COOKIES_DOMAIN,
					expires: COOKIES_EXPIRY,
				});

				// eslint-disable-next-line no-unsafe-finally
				return _res.data.transactionId;
			} else if (_res.status === 200 && _res.data.latest_order_id) {
				window.location.href = `${APP_TRAYA_DASHBOARD}?${reply}`;
			}

			if (_res.status === 500) {
				setError("Unexpected error occured, please contact traya support");
				setHasError(true);
				// eslint-disable-next-line no-unsafe-finally
				return null;
			}

			setError(_res.data.message);
			// eslint-disable-next-line no-unsafe-finally
			return null;
		}
	};

	const submitUTMData = async transactionId => {
		let res = {};
		try {
			for (let key in utmData) {
				const _formData = {
					question_id: key,
					question: key,
					response: utmData[key],
					form_status: "In-Progress",
					locationPath: window.location.pathname + window.location.search,
					formFillSource: 'website',
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

	const _handleSubmit = async e => {
		e.preventDefault();

		if (hasError) return;

		const _isValid = isValidPhone(reply);
		if (_isValid.hasError) {
			setError(_isValid.error);
			return;
		}
		if (block.reply === reply) {
			handleSubmit("+91" + reply);
			return;
		}

		// handleBiteSpeedData(reply);
		setError("");

		setIsLoading(true);
		const transactionId = await _submitReply();
		if (isEmpty(transactionId)) return setIsLoading(false);

		if (isEmpty(utmData)) return setIsLoading(false);
		const utmRes = submitUTMData(transactionId);
		setIsLoading(false);
		if (utmRes.hasError) return;
		// Cookies.remove("__TRAYA_UTM__");
	};

	return (
		<InputText
			error={error}
			reply={reply}
			setError={setError}
			setReply={setReply}
			handleSubmit={_handleSubmit}
			store={context}
		/>
	);
};

export default InputPhoneNumber;
