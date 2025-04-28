import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(isBetween);

const FROM_TIME = "8";
const TO_TIME = "19";

export const getDates = slots => {
	const _data = [];
	const _days = [];

	const _day0 = dayjs().format("YYYY-MM-DD");
	const _day1 = dayjs().add(1, "d").format("YYYY-MM-DD");

	const _fromTime = dayjs().hour(FROM_TIME).minute(0).second(0);
	const _toTime = dayjs().hour(TO_TIME).minute(0).second(0);

	const _isBetween = dayjs().isBetween(_fromTime, _toTime);
	const _isBefore = dayjs().isBefore(_fromTime);
	const _isAfter = dayjs().isAfter(_toTime);

	if (_isBetween) {
		if (slots[_day0]) _days.push(_day0);
		if (slots[_day1]) _days.push(_day1);
	} else if (_isBefore) {
		if (slots[_day0]) _days.push(_day0);
	} else if (_isAfter) {
		if (slots[_day1]) _days.push(_day1);
	}

	_days.forEach(key => {
		let _day = "";

		const _date = dayjs(key);
		const _now = dayjs().format("YYYY-MM-DD");
		const _diff = _date.diff(_now, "d");

		if (_diff === 0) _day = "Today";
		else if (_diff === 1) _day = "Tomorrow";
		else _day = _date.format("dddd");

		_data.push({
			date: _date,
			day: _day,
		});
	});

	return _data;
};
