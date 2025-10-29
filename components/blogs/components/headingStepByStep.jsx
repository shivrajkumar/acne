'use client'
import React from 'react'

export const HeadingStepByStep = ({heading}) => {
    return (
        <div className="flex flex-col text-left sm:px-0 mt-8">
            <h1 className="text-[26px] md:text-5xl font-normal font-nohemi text-[#333333] md:mb-2">
                {heading}
            </h1>
            <div className="w-10 h-1 bg-[#333333] mb-4"></div>
        </div>
    )
}