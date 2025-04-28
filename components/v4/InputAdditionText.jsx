import React, { useEffect, useRef } from "react";

const InputAdditionalText = ({ reply, setReply, placeholder }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef) inputRef.current.focus();
	}, []);

	return (
		<div className="w-full">
			<input
				className="w-full pr-8 border-0 border-b-2 border-gray-300 form-input ring-transparent focus:ring-transparent active:ring-transparent focus:border-brand-accent active:border-brand-accent"
				id="textInput"
				onChange={({ target }) => setReply(target.value)}
				ref={inputRef}
				type="text"
				value={reply}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputAdditionalText;
