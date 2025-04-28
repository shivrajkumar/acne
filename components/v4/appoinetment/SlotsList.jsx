import { useMemo } from "react";

import dayjs from "dayjs";

const SlotsList = ({ selectedDate, slots, selectedSlot, setSlot }) => {
	const _slotsList = useMemo(() => {
		if (!selectedDate) return [];

		const _selectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
		return slots[_selectedDate];
	}, [selectedDate, slots]);

	if (!dayjs.isDayjs(selectedDate)) return <></>;

	return (
		<div className="h-full mx-auto w-max">
			<h5 className="capitalize text-brand-darkgray">select time</h5>
			<div className="grid grid-cols-3 gap-2 pr-4 mt-4 overflow-x-hidden overflow-y-auto h-max max-h-60 sm:grid-cols-4 w-max">
				{_slotsList.map((slot, index) => {
					let _isSelectedSlot = slot.id === selectedSlot.id;
					let buttonID = _isSelectedSlot ? "Slot_booked_yes" : "";

					return (
						<button
							type="button"
							disabled={slot?.slots?.count === 0}
							onClick={() => setSlot(slot)}
							key={index}
							id={buttonID}
							className={`inline-flex self-center flex-col items-center px-2 py-2 border border-brand-disgray rounded-xl disabled:bg-brand-disgray disabled:text-brand-lightgrey disabled:cursor-not-allowed ${
								_isSelectedSlot
									? "bg-brand-accent text-white"
									: "border-brand-disgray"
							}`}>
							<span className="font-bold sm:text-lg" id={`${buttonID}`}>
								{dayjs(slot.slotTime).format("h:mm a")}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default SlotsList;
