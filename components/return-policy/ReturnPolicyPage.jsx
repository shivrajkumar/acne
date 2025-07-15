import React from "react";
import rightArrow from "@assets/svg/rightArrow.svg";
import Image from "next/image";

const ReturnPolicyPage = () => {
  return (
    <div className="flex lg:justify-center">
      <div className="px-4 pb-14 lg:w-[65%] lg:px-0 mt-20">
        <div className="flex items-center gap-x-1 mb-8">
          <a href="/" className="font-sophiaPro text-xs text-gray-700">
            HOME
          </a>
          <Image src={rightArrow} alt="logo" width={12} height={12} />
          <a href="/return-policy" className="font-sophiaPro text-xs text-gray-700">
            RETURN, REFUND AND CANCELLATION POLICY
          </a>
        </div>
        <h2 className="font-sophiaPro font-bold xs:text-[30px] md:text-[50px] text-left leading-[44px] mb-1 lg:leading-[60px]">
          RETURN, REFUND AND CANCELLATION POLICY
        </h2>
        <p className="font-sophiaPro text-[17px] my-4">
          This is Tatvartha Health Private Limited’s ("Clear Ritual") returns,
          refund and cancellation policy. Please read this policy in consonance
          with our Terms of Service available{" "}
          <a href="/terms-conditions" className="font-sophiaPro font-[600] ">
            [here]
          </a>
          .
        </p>
        <div className="font-sophiaPro text-[17px]">
          <br />
          <div className="flex">
            <strong className="pr-4">1.</strong>
            <p className="font-bold">REFUND POLICY</p> <br />
            <br />
          </div>
          <div className="flex pl-4">
            <span className="pr-4">(a).</span>{" "}
            <p>
              We offer a full refund to users for refund requests placed within{" "}
              <span className="font-[600]">7 (seven) days </span> from the date
              of delivery, and only in the following cases:
            </p>
          </div>
          <br />
          <ul className="list-disc pl-16">
            <li>You received a wrong product</li>
            <li>Items were missing in the order</li>
            <li>The ordered item(s) is lost or damaged during transit</li>
            <li>The ordered item(s) is past its expiry date</li>
            <li>
              (In rare cases) the products cause allergic reactions/do not suit
              your body
            </li>
          </ul>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(b).</span>{" "}
            <p>
              For unopened, unused products (not defective), returns may be
              allowed <span className="font-[600]">only if</span> you notify us
              within{" "}
              <span className="font-[600]">7 (seven) days of delivery</span>.
              Pick-up will be arranged once your return request is approved.
            </p>
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(c).</span>{" "}
            <p>
              If your order included a{" "}
              <span className="font-[600]">free gift/promotional product</span>,
              and you return the main product:
            </p>
          </div>
          <br />
          <ul className="list-disc pl-16">
            <li>You must return the free gift as well.</li>
            <li>
              The refund will be processed after deducting the value of the
              promotional offer.
            </li>
          </ul>
          <br />
          <br />
          <div className="flex">
            <strong className="pr-4">2.</strong>
            <p className="font-bold">HOW TO REQUEST A REFUND</p> <br />
            <br />
          </div>
          <div className="flex pl-4">
            <span className="pr-4">(a).</span>
            <p>Contact customer care (10 AM – 7 PM, Monay to Friday) with:</p>
          </div>
          <br />
          <ul className="list-disc pl-16">
            <li>Order ID</li>
            <li>Reason for refund</li>
            <li>Image of the product(s)</li>
          </ul>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(b).</span> <p>Reach us via:</p>
          </div>
          <br />
          <p className="pl-16">A. Email: customercare@clearritual.com</p>
          <p className="pl-16">B. WhatsApp: +91 8424004697</p>
          <br />
          <br />
          <div className="flex">
            <strong className="pr-4">3.</strong>
            <p className="font-bold">HOW IS RETURN PROCESSED?</p> <br />
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(a).</span>
            <p>
              Once a request is approved, we’ll arrange for product pick-up,
              usually within 2-5 working days. Timelines may vary due to
              logistics or holidays.
            </p>
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(b).</span>
            <p>
              Refunds are initiated{" "}
              <span className="font-[600]">after a Quality Check</span>, which
              verifies that:
            </p>
          </div>
          <br />
          <ul className="list-disc pl-16">
            <li>The product is sealed, unused, and untampered</li>
            <li>Original packaging and all materials are intact</li>
          </ul>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(c).</span>
            <p>
              Once passed, the refund is initiated to your original payment
              method. For{" "}
              <span className="font-[600]">Cash on Delivery (COD)</span>, a
              refund link will be provided to choose your preferred method and
              submit necessary details.
            </p>
          </div>
          <br />
          <div className="flex ">
            <strong className="pr-4">4.</strong>
            <p className="font-bold">CANCELLATION OF ORDERS</p>
            <br />
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(a).</span>
            <p>You can request cancellation via:</p>
          </div>
          <br />
          <p className="pl-16">A. Email: customercare@clearritual.com</p>
          <p className="pl-16">B. WhatsApp: +91 8424004697</p>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(b).</span>
            <p>
              If the courier attempts delivery (for orders cancelled before
              delivery), please decline. If accepted, a reverse pick-up will be
              arranged. Ensure the product is sealed and unused.
            </p>
          </div>
          <br />
          <br />
          <div className="flex ">
            <strong className="pr-4">5.</strong>
            <p className="font-bold">PROCESSING OF REFUND</p>
            <br />
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(a).</span>
            <p>
              <span className="font-[600]">
                Credit/Debit Card / Net Banking
              </span>{" "}
              refunds may take{" "}
              <span className="font-[600]">5–7 working days</span> for credit to
              reflect.
            </p>
          </div>
          <br />
          <div className="flex pl-4">
            <span className="pr-4">(b).</span>
            <p>
              <span className="font-[600]">Cash on Delivery (COD)</span>{" "}
              refunds:
            </p>
          </div>
          <br />
          <ul className="list-disc pl-16">
            <li>
              Approval may require an image of a voided cheque leaf, bank
              statement, or bank details.
            </li>
            <li>
              COD refunds may take up to a{" "}
              <span className="font-[600]">maximum of 3 weeks.</span>
            </li>
          </ul>
          <br />
          <br />
          <p className="font-sophiaPro text-[17px] my-4">
            We apologise for any inconvenience caused; refund processing times
            may be subject to delays due to various factors including bank
            policies or circumstances beyond our control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
