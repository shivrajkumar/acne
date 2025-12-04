import React from "react";

const defaultImgs = {
  imageA: "story_a.jpg",
  imageB: "story_b.jpg",
};

function AvatarBadge({ name, text, beforeImage, afterImage, month }) {
  return (
    <div className="absolute left-[2.6px] bottom-1 z-10 lg:left-4 lg:bottom-3">
      <div className="bg-white rounded-xl shadow-md px-3 py-2 w-[134px] md:w-96">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex items-center justify-between w-full mb-2">
            <div className="text-[10px] lg:text-lg font-normal lg:font-bold text-[#0F1B28] leading-tight">{name}</div>
            <div className="flex items-center gap-1 text-[#608C59] text-sm">
              <img src="verified.png" alt="verified" width="18" height="18" />
              <span>Verified</span>
            </div>
          </div>
        </div>
        <div className="text-xs lg:text-base text-[#0F1B28] mt-1 leading-tight">{text}</div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="relative rounded-lg overflow-hidden">
            <img src={beforeImage} alt="Before" className="w-full h-[74px] lg:h-24 object-cover" />
            <div className="absolute bottom-1 left-1 bg-white rounded-md px-2 py-1 text-[8px] lg:text-xs font-medium">
              Before
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img src={afterImage} alt="After" className="w-full h-[74px] lg:h-24 object-cover" />
            <div className="absolute bottom-1 left-1 bg-white rounded-md px-2 py-1 text-[8px] lg:text-xs font-medium">
              {month} months
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StoriesGridSection({ data }) {
  const imgs = defaultImgs;
  console.log('StoriesGridSection data:', data);

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <div className="bg-[#FCE6E0] rounded-2xl p-6 md:p-10">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sofia font-medium lg:font-bold text-[#0F1B28]">
            {data?.title || "#RealSkinStories"}
          </h2>
          <p className="mt-3 lg:mt-5 text-sm md:text-base lg:text-2xl text-[#505354] mx-auto">
            {data?.description || "Real people. Real improvement. Real changes from inside and outside."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
          {data?.stories && data.stories.length > 0 ? (
            data.stories.map((story, index) => (
              <article
                key={index}
                className={`relative rounded-xl overflow-hidden bg-white ${
                  index === 2 ? 'order-4 md:order-3' : index === 3 ? 'order-3 md:order-4' : ''
                }`}
              >
                <div className="aspect-3/4 w-full">
                  <img
                    src={story.image?.url || imgs.imageA}
                    alt={story.image?.alternativeText || `story ${index + 1}`}
                    className="w-full h-full object-cover block"
                  />
                </div>
                {story.name && (
                  <AvatarBadge
                    name={story.name}
                    text={story.text}
                    beforeImage={story.beforeImage?.url || "/shreya_before.jpg"}
                    afterImage={story.afterImage?.url || "/shreya_after.jpg"}
                    month={story.month || "6"}
                  />
                )}
              </article>
            ))
          ) : (
            <>
              {/* Card 1: image with badge bottom-left (mobile col 1) */}
              <article className="relative rounded-xl overflow-hidden bg-white">
                <div className="aspect-3/4 w-full">
                  <img src={imgs.imageA} alt="story A" className="w-full h-full object-cover block" />
                </div>
                <AvatarBadge
                  name="Shreya"
                  text={`"I had hormonal acne, clear ritual's inside-outside approach actually worked."`}
                  beforeImage="/shreya_before.jpg"
                  afterImage="/shreya_after.jpg"
                  month="6"
                />
              </article>

              {/* Card 2: red text card (mobile col 2) */}
              <article className="relative h-full rounded-xl bg-[#9D3E3E] text-white flex items-center justify-center p-6 md:p-8">
                <div className="text-center">
                  <h3 className="text-base md:text-xl font-bold lg:text-4xl">There's more to my (acne) story.</h3>
                </div>
              </article>

              {/* Card 3: image with badge - on mobile we want this to appear in the 4th position (bottom-right),
                  so set order-4 for mobile and md:order-3 for desktop */}
              <article className="relative rounded-xl overflow-hidden bg-white order-4 md:order-3">
                <div className="aspect-3/4 w-full">
                  <img src={imgs.imageB} alt="story B" className="w-full h-full object-cover block" />
                </div>
                <AvatarBadge
                  name="Avantika"
                  text={`"I still get the occasional pimple, but my face isn't constantly inflamed anymore."`}
                  beforeImage="/avantika_before.jpg"
                  afterImage="/avantika_after.jpg"
                  month="5"
                />
              </article>

              {/* Card 4: red text card - on mobile we want this as the third item (bottom-left), so order-3 */}
              <article className="relative h-full rounded-xl bg-[#9D3E3E] text-white flex items-center justify-center p-6 md:p-8 order-3 md:order-4">
                <div className="text-center">
                  <h3 className="text-base md:text-xl font-bold lg:text-4xl">You{`
`}Are not alone.</h3>
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
