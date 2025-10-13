import CrossIcon from "@assets/svg/Cross_Icons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Image from "next/image";

// Import skin type icons
import normal from "@assets/images/Normal_Skintype.png";
import combination from "@assets/images/Combination_skintype.png";
import dry from "@assets/images/Dry_skintype.png";
import oily from "@assets/images/Oily_skintype.png";

const getIconImage = (iconType) => {
  switch (iconType) {
    case "normal":
      return normal;
    case "combination":
      return combination;
    case "oily":
      return oily;
    case "dry":
      return dry;
    default:
      return null;
  }
};

export const Modal = (props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000] bg-opacity-40 backdrop-blur-[2px]" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          {/* Changed to items-center for all screen sizes */}
          <div className="flex min-h-full justify-center p-4 text-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform w-full bg-Background/AirBlue text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-[16px]">
                {
                  <div className="px-[24px] pb-[24px]">
                    <Dialog.Title
                      as="h3"
                      className="text-[32px] xs:text-[24px] md:text-[32px] font-[400] pt-[24px] pb-[16px] font-sophiaPro text-left text-Text/Heading-Text -tracking-[2%] flex items-center justify-between gap-[24px]"
                    >
                      {props.content?.heading}
                      <div
                        className="flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full cursor-pointer"
                        onClick={() => props.setOpen(false)}
                      >
                        <CrossIcon />
                      </div>
                    </Dialog.Title>

                    <div className="border-t pt-[8px]">
                      <p className="text-[14px] font-sophiaPro font-[400] text-left mb-6 text-Text/Heading-Text">
                        {props.content?.text}
                      </p>

                      <div className="space-y-4">
                        {props.content?.list?.map(
                          (item, index) =>
                            item.title && (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                {item.icon && getIconImage(item.icon) && (
                                  <div className="flex-shrink-0 pt-1">
                                    <Image
                                      src={getIconImage(item.icon)}
                                      alt={item.title}
                                      width={24}
                                      height={24}
                                      className="object-contain"
                                    />
                                  </div>
                                )}
                                <div>
                                  {props.enableListing ? (
                                    <ul className="list-disc pl-5">
                                      <li className="font-[400] text-Text/Heading-Text font-sophiaPro text-[14px] leading-[1.4]">
                                        {item.title} {item.description}
                                      </li>
                                    </ul>
                                  ) : (
                                    <h4 className="font-[400] text-Text/Heading-Text font-sophiaPro text-[14px]">
                                      {item.title} {item.description}
                                    </h4>
                                  )}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};