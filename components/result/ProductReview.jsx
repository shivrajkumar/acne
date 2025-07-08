"use client"
import React, { useState } from 'react'
import renderStars from './ProductStarRating';

const ProductReview = ({reviews}) => {
    const [showAllReviews, setShowAllReviews] = useState(false);
  return (
    <>
         <div className="space-y-4">
              {reviews
                .slice(0, showAllReviews ? reviews.length : 2)
                .map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-b-Elements/Divider-Stroke"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[16px] font-[400] leading-[130%] text-primary/700">
                          {review?.reviewer}
                        </span>
                        <span className="ml-2 text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                          {review?.sub_text}
                        </span>
                        <div className="text-[12px] font-[400] leading-[130%] text-Text/Disabled">
                          {review?.date},{review?.location}
                        </div>
                        {review?.rating &&
                          renderStars(review?.rating, "text-Secondary/400")}
                      </div>
                    </div>
                   {review?.review_heading&& <p className="text-[16px] font-[400] leading-[130%] text-primary/700">
                      {review?.review_heading}
                    </p>}
                   {review?.review_about&& <p className="text-[12px] font-[400] leading-[130%] text-Text/Disabled py-1">
                      {review?.review_about}
                    </p>}
                   {review?.review_text &&<p className="text-[14px] font-[400] leading-[130%] text-primary/700 py-2 pb-4">
                      {review?.review_text}
                    </p>}
                  </div>
                ))}
            </div>
            {reviews.length > 2 && (
              <button
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews
                  ? "Show Less"
                  : `See all ${reviews.length} reviews`}
              </button>
            )}
    </>
  )
}

export default ProductReview