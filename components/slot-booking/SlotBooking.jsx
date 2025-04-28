// import { fetchRequest } from '../vayu/helpers/fetchRequest';
// import { GET_AVAILABLE_SLOTS } from '../../constants/urls';
import React, { useEffect, useState } from 'react';
import Loader from '../generic/Loader';

const SlotBooking = ({ caseId }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAvailableSlots();
    }, [caseId]);

    const getAvailableSlots = async () => {
        setLoading(true);
        try {
            // const response = await fetchRequest(GET_AVAILABLE_SLOTS(caseId));
            // const data = response.json();
            setLoading(false);
        } catch (error) {
            console.error("Error fetching available slots:", error);
            setLoading(false);
        }
    }

    return loading ? <Loader /> : (
        <div>
            <h1>Slot Booking</h1>
            <p>Book your slots here</p>
        </div>
    )
}

export default SlotBooking;