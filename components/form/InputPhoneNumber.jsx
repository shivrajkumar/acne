import { useContext, useEffect, useState } from "react";
import useFormSubmit from "../../hooks/useFormSubmit";
import InputText from "./InputText";
import { isValidPhoneInternational } from "../../helpers/validation";
// import { handleBiteSpeedData } from "../../helpers/bite";
import Cookies from "js-cookie";
import { phone } from 'phone';
const InputPhoneNumber = ({ block, context }) => {
	const handleSubmit = useFormSubmit(context);
	const [error, setError] = useState("");
	const [reply, setReply] = useState("");
	const [country, setCountry] = useState({});
	const { setQuestionAttributes } = useContext(context);

	useEffect(() => {
		// if (block) setReply(() => block.reply.substring(3));
		if (block.country && block) {
			setCountry(block.country);
			// setReply(() => block.reply.replace(block.country.data[1],""));
			setReply(() => block.reply)
		}
	}, [block]);

	const _handleSubmit = e => {
		e?.preventDefault();

		const _isValid = isValidPhoneInternational(reply);
		const isValid = phone(country.data[1] + reply, { country: country?.code })
		if (_isValid.hasError) {
			setError(_isValid.error);
			return;
		}
		if (!isValid.isValid) {
			setError('Please enter a valid number');
			return;
		}
		// handleSubmit(country.data[1]+ reply);
		handleSubmit(reply)
		// window.localStorage.setItem("user_phone", country.data[1] + reply);
		window.localStorage.setItem("user_phone", reply);
		window.localStorage.setItem("country_code", country.data[1]);
		Cookies.set('user_phone', country.data[1] + reply);
		setQuestionAttributes({ value: country, key: 'country', id: 'phone_number' })
		// handleBiteSpeedData(reply);
		setError("");
	};

	return (
		<InputText
			error={error}
			reply={reply}
			setError={setError}
			setReply={setReply}
			handleSubmit={_handleSubmit}
			store={context}
			phoneNumber={true}
			setCountry={setCountry}
			country={country}
		/>
	);
};

export default InputPhoneNumber;
