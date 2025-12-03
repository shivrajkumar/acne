"use client"
import { useState } from "react";
import { SKIN_FEELING, YES_NO } from "./formConfigs";
import { FormHeader } from "./formHeader";
import { FormCard } from "./formCard";
import { RadioCardGroup } from "./radioCardGroup";
import { RadioGroup } from "./radioGroup";
import { NumericRating } from "./numericRating";
import { TextAreaField } from "./textAreaField";
import { SubmitButton } from "./submitButton";
import { EmojiRating } from "./emojiRating";

export function ProductForm() {
  const [data, setData] = useState({});
  const handle = (n, v) => setData((p) => ({ ...p, [n]: v }));

  return (
    <div className="bg-gray-50 min-h-full pb-4">
      <FormHeader
        title="Product Feedback"
        subtitle="Your feedback helps us improve our products and create ones that fit you."
        bgClassName="bg-gradient-to-l from-[#FEEADB] to-[#F2F2F2]"
      />
      <FormCard>
        <RadioCardGroup
          label="How is the product feeling on your skin?"
          name="feeling"
          options={SKIN_FEELING}
          value={data.feeling}
          onChange={handle}
          required
        />
        <RadioGroup
          label="Is the product easy to use every day?"
          name="easy"
          options={YES_NO}
          value={data.easy}
          onChange={handle}
          required
        />
        <EmojiRating
          label="How Satisfied are you with the products?"
          name="satisfaction"
          value={data.satisfaction}
          onChange={handle}
          required
        />
        <NumericRating
          label="How much would you rate the facewash?"
          name="facewash"
          value={data.facewash}
          onChange={handle}
          required
        />
        <NumericRating
          label="How much would you rate the treatment products?"
          name="treatment"
          value={data.treatment}
          onChange={handle}
          required
        />
        <NumericRating
          label="How much would you rate the moisturiser?"
          name="moisturiser"
          value={data.moisturiser}
          onChange={handle}
          required
        />
        <NumericRating
          label="How much would you rate the sunscreen?"
          name="sunscreen"
          value={data.sunscreen}
          onChange={handle}
          required
        />
        <NumericRating
          label="How much would you rate the supplements?"
          name="supplements"
          value={data.supplements}
          onChange={handle}
          required
        />
        <TextAreaField
          label="Would you like to share anything about your delivery experience?"
          name="feedback"
          value={data.feedback || ""}
          onChange={handle}
        />
      </FormCard>
      <div className="px-4 pb-6">
        <SubmitButton onClick={() => alert("Product feedback submitted!")} />
      </div>
    </div>
  );
}
