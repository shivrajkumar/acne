import { useEffect, useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { getDates } from "./helpers";

dayjs.extend(isBetween);

const DateList = ({ slots, selectedDate, setDate }) => {
	const _dateList = useMemo(() => {
		const _data = getDates(slots);
		return isEmpty(_data) ? [] : _data;
	}, [slots]);

	const isSlotsAvailabe = date => {
		const _date = dayjs(date).format("YYYY-MM-DD");
		const _slots = slots[_date];

		return _slots ? true : false;
	};

	useEffect(() => {
		if (_dateList && _dateList[0]) setDate(_dateList[0]?.date);
		else setDate("");
	}, [_dateList, setDate]);

	return (
		<div className="max-w-full mx-auto w-max">
			<div className="flex w-full gap-2 pb-2 mt-4 overflow-x-auto">
				{_dateList.map(({ date, day }, index) => {
					const _isSelectedDate = date.isSame(selectedDate, "day");
					const _isSlotsAvailabe = isSlotsAvailabe(date);

					return (
						<button
							type="button"
							disabled={!_isSlotsAvailabe}
							onClick={() => setDate(date)}
							key={index}
							className={`inline-flex flex-col items-center px-4 py-2 border rounded-xl disabled:bg-brand-disgray disabled:text-brand-lightgrey disabled:cursor-not-allowed ${
								_isSelectedDate
									? "bg-brand-accent text-white"
									: "border-brand-disgray text-brand-darkgray"
							}`}>
							<span className="w-16 text-xs">{day}</span>
							<span className="text-lg font-bold">{date.format("D")}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default DateList;
