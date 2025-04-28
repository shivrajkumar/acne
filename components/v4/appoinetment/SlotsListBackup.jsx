import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const START_TIME = 9;
const END_TIME = 20;

const SlotsList = ({ selectedDate, slots, selectedSlot, setSlot }) => {
	const _slotsList = useMemo(() => {
		const _slots = [];

		const _startTime = dayjs().hour(START_TIME).startOf("h");
		const _endTime = dayjs().hour(END_TIME).startOf("h");
		const _hoursLeft = _endTime.diff(_startTime, "h");

		for (let i = 0; i <= _hoursLeft; i++) {
			const _time = _startTime.add(i, "h").minute(0).second(0);

			_slots.push(_time);
			_slots.push(_time.add(30, "m").second(0));
		}

		return _slots;
	}, []);

	const isSelectedSlot = (slotTime, time) => {
		if (!slotTime) return false;
		const _time = dayjs(time);
		return dayjs(slotTime).isBetween(_time, _time.add(30, "m"), null, "[)");
	};

	const getSlotInfo = time => {
		const _date = dayjs(time).format("YYYY-MM-DD");
		const _slots = slots[_date];

		return _slots?.find(({ slotTime }) => {
			return isSelectedSlot(slotTime, time);
		});
	};

	if (isEmpty(selectedDate)) return <></>;

	return (
		<div className="h-full mx-auto w-max">
			<h5 className="capitalize text-brand-darkgray">select time</h5>
			<div className="grid grid-cols-3 gap-2 pr-4 mt-4 overflow-x-hidden overflow-y-auto h-max max-h-60 sm:grid-cols-4 w-max">
				{_slotsList.map((slot, index) => {
					const _time = slot.format("HH");
					const _minute = slot.format("mm");
					let _currSlot = null;
					let _isSelectedSlot = false;

					if (dayjs.isDayjs(selectedDate)) {
						_currSlot = selectedDate.hour(_time).minute(_minute).second(0);
						if (dayjs(selectedDate).isSame(dayjs(), "d")) {
							if (dayjs(_currSlot).subtract(29, "m").isBefore(dayjs()))
								return <></>;
						}

						_currSlot = _currSlot.toISOString();
						_isSelectedSlot = isSelectedSlot(selectedSlot.slotTime, _currSlot);
					}

					const _slotInfo = getSlotInfo(_currSlot);
					let buttonID = _slotInfo ? "Slot_booked_yes" : "";

					return (
						<button
							type="button"
							disabled={!_slotInfo}
							onClick={() => setSlot(_slotInfo)}
							key={index}
							id={buttonID}
							className={`inline-flex self-center flex-col items-center px-2 py-2 border border-brand-disgray rounded-xl disabled:bg-brand-disgray disabled:text-brand-lightgrey disabled:cursor-not-allowed ${
								_isSelectedSlot
									? "bg-brand-accent text-white"
									: "border-brand-disgray"
							}`}>
							<span className="font-bold sm:text-lg" id={`${buttonID}`}>
								{slot.format("h:mm a")}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default SlotsList;
