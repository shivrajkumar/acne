export const keypress = (event, type) => {
	const _value = event.target.value;

	if (!_value) {
		return {
			hasError: true,
		};
	}
	if (type === "tel") {
		event = event || window.event;

		const _charCode =
			typeof event.which === "undefined" ? event.keyCode : event.which;
		const _charStr = String.fromCharCode(_charCode);

		if (event.key === "Enter") return { hasError: false };

		if (!_charStr.match(/^[0-9]+$/)) {
			event.preventDefault();
			return {
				error: `Numbers only please`,
				hasError: true,
			};
		}
	}

	if (type === "text") {
		if (_value.length > 248) {
			event.preventDefault();
			return {
				error: `Numbers only please`,
				hasError: true,
			};
		}
	}

	return { hasError: false };
};
