export const ReorderErrorHandler = ({ chatHandler }) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
                }}
                className="py-[1.5%] xl:py-[0.3%]"
            >
                <div className="font-fredoka flex justify-center w-[100%] text-[24px] xl:text-[30px] not-italic font-[500] text-brand-dark">
                    Order Summary
                </div>
            </div>
            <div className="overflow-y-hidden w-full h-full flex items-center justify-center mt-[25%] xl:mt-[7%]">
                <div className="flex flex-col items-center justify-center w-full p-4 md:mt-4 overflow-y-hidden">
                    <div className="flex flex-col w-11/12 md:w-9/12 lg:w-9/12 px-2 md:px-4 xl:px-4 py-6 bg-custom-lightgrey shadow-lg shadow-gray-500/50 rounded-2xl">
                        <p className="font-sans mx-2 text-[24px] md:text-4xl lg:text-4xl font-[900] text-brand-dark">
                            Oops!
                        </p>
                        <p className="font-sans p-3 text-[16px] md:text-2xl lg:text-[22px] font-[400] text-[#434343]">
                            Something went wrong. Please contact traya support.
                        </p>
                        <button
                            className="px-12 py-2 mt-16 mx-auto w-full md:w-96 rounded-md bg-custom-green text-[#414042] text-[22px] font-[600] font-sans focus:outline-none"
                            onClick={chatHandler}
                        >
                            CHAT WITH US
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}