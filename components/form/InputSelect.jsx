import React, { useContext, useEffect, useState } from "react";
import { TRANSACTION_API } from "@/constants/urls";
import { fetchRequest } from "../../helpers/fetchRequest";
import useFormSubmit from "../../hooks/useFormSubmit";
import Loader from "../generic/Loader";
// import Select from "../../ui/select";

function InputSelect({ block, context }) {
	const {
		apiResponse: { transactionId ,caseId},
	} = useContext(context);

	const handleSubmit = useFormSubmit(context);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [reply, setReply] = useState({});

	useEffect(() => {
		if (block) setReply(() => block.reply);
	}, [block]);

	const _submitReply = async reply => {
		setIsLoading(true);
		let _res = "";
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
				setReply({});
				// eslint-disable-next-line no-unsafe-finally
				return;
			}
			setError(_res.data.message);
		}
	};

	const _handleSubmit = async () => {
		if (!reply.ft || !reply.inc) {
			setError("Please, select options");
			return;
		}
		if (block.reply === reply) {
			handleSubmit(reply);
			return;
		}
		await _submitReply(reply);
	};

	// const theme = theme => ({
	// 	...theme,
	// 	colors: {
	// 		...theme.colors,
	// 		primary25: "#9bba70",
	// 		primary: "#9bba70",
	// 		primary50: "#9cba70",
	// 	},
	// });

	return (
		<div className="flex flex-col mt-8 md:mt-24 md:w-1/2">
			{isLoading && <Loader />}
			<label
				className="h-12 text-2xl font-bold text-gray-700"
				htmlFor={block.id}>
				{block.text}
			</label>

			<div className="flex gap-4">
				<div className="flex-1 mt-5">
					<h2>{block.optionMap?.ft?.title}</h2>
					{/* <Select
						options={block.optionMap?.ft?.value}
						onChange={e => {
							setReply(prev => {
								const _prev = prev;
								_prev[block.optionMap?.ft?.title] = e.value;
								return {
									..._prev,
								};
							});
						}}
						value={{ label: reply.ft }}
						theme={theme}
					/> */}
				</div>
				<div className="flex-1 mt-5">
					<h2>{block.optionMap?.inc?.title}</h2>
					{/* <Select
						options={block.optionMap?.inc?.value}
						onChange={e => {
							setReply(prev => {
								const _prev = prev;
								_prev[block.optionMap?.inc?.title] = e.value;
								return {
									..._prev,
								};
							});
						}}
						value={{ label: reply.inc }}
						theme={theme}
					/> */}
				</div>
			</div>
			<div className="flex flex-col items-center justify-center mt-10">
				<button
					className="px-6 py-2 uppercase rounded-md w-max bg-brand-accent text-green-50"
					onClick={() => _handleSubmit()}>
					continue
				</button>
				{error !== "" && (
					<span className="block mt-1 text-brand-accent">{error}</span>
				)}
			</div>
		</div>
	);
}

export default InputSelect;
