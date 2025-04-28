import React from 'react'

const SubmitButton = ({ conText, onClickHandler, tagId, border, status }) => {
    const setBorder = {
        borderYes: "border-solid md:border-2",
        borderNo: "border-solid md:border-0"
    }
    return (
        <div className={`flex justify-center align-center fixed bottom-0 right-0 font-bold ${setBorder[border]} focus:outline-none w-full xl:h-[4.5rem] xs:h-[5rem] py-2.5 bg-white`}>
            <button
                className={`px-8 py-2 font-sans w-[95%] xl:w-[25%] rounded-lg md:rounded-md text-[22px] md:text-[22px] font-[600] focus:outline-none bg-custom-green text-[#414042] hover:bg-brand-dark hover:text-white`}
                onClick={onClickHandler}
                id={tagId}
                disabled={status}
            >
                {conText}
            </button>
        </div>
    )
}

export default SubmitButton