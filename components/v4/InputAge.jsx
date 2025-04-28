/* eslint-disable no-unsafe-finally */
import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import InputText from "../form/InputText";
import { isValidAge } from "../../helpers/validation";
import {
	TRANSACTION_API,
	UPDATE_RESPONSE_GUEST_FORM,
} from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import Cookies from "js-cookie";
import { logGtmEventwithParameters, triggerGa } from "../../helpers/gtmHelpers";
import Loader from "../generic/Loader";

const InputAge = ({ block, context }) => {
	const {
		apiResponse: { transactionId,caseId },
	} = useContext(context);

	const handleSubmit = useFormSubmit(context);

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [reply, setReply] = useState("");

	useEffect(() => {
		if (block) setReply(() => block.reply);
		return () => setReply("");
	}, [block]);

	const _submitReply = async () => {
		setIsLoading(true);
		let _res = "";

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
					let data = "";
					if (reply) data = `SFQ2-` + reply;
					await logGtmEventwithParameters("GUEST_FORM_AGE_ANSWERED", data);
					await triggerGa();
					handleSubmit(reply);
				}
			}
			return;
		}

		if (block.reply === reply) handleSubmit(reply);
		try {
			const _formData = {
				question_id: block.id,
				question: block.text,
				response: reply,
				form_status: "In-Progress",
				locationPath: window.location.pathname + window.location.search,
				formFillSource: 'website',
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
			setIsLoading(false);
			if (_res.status === 200) {
				handleSubmit(reply);
				setReply("");
				return;
			}

			setError(_res.data.message);
		}
	};

	const _handleSubmit = async e => {
		e.preventDefault();
		const _isValid = isValidAge(reply);

		if (_isValid.hasError) {
			setError(_isValid.error);
			return;
		}

		if (Number(reply) < 18) {
			setError("Clear Ritual treatment is available to adults 18 years and above.");
			return;
		}

		if (block.reply === reply) {
			handleSubmit(reply);
			return;
		}

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
				handleSubmit={_handleSubmit}
				store={context}
			/>
		</>
	);
};

export default InputAge;