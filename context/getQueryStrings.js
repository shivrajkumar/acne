import queryString from "query-string";

const getQueryStrings = () => {
	const nUtmData = {};
	const params =
		typeof window !== "undefined"
			? queryString.parse(window.location.search)
			: {};

	for (let key in params) {
		if (key.match(/^utm_[a-zA-Z]+/)) {
			if (params[key].match(/^[a-zA-Z0-9._-]+/)) {
				nUtmData[key] = params[key];
			}
		}
	}

	return {
		region: params["region"],
		isFormFilled: params["formFilled"],
		cohort: params["cohort"],
		pageSource: params["source"],
		utmData: { ...nUtmData },
	};
};

export default getQueryStrings;
