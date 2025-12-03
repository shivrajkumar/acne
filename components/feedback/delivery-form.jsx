'use client'
import { useState } from "react";
import { CONDITION, YES_NO } from "./formConfigs";
import { FormHeader } from "./formHeader";
import { FormCard } from "./formCard";
import { RadioGroup } from "./radioGroup";
import { RadioCardGroup } from "./radioCardGroup";
import { EmojiRating } from "./emojiRating";
import { TextAreaField } from "./textAreaField";
import { SubmitButton } from "./submitButton";

export function DeliveryForm() {
  const [data, setData] = useState({});
  const handle = (n, v) => setData((p) => ({ ...p, [n]: v }));

  return (
    <div className="bg-gray-50 min-h-full">
      <FormHeader
        title="Delivery Feedback"
        subtitle="Your delivery experience matters to us. Your feedback help us make it even better."
        bgClassName="bg-gradient-to-l from-[#DCEBF2] to-[#F2F2F2]"
      />
      <FormCard>
        <RadioGroup
          label="Did you order arrive on time?"
          name="onTime"
          options={YES_NO}
          value={data.onTime}
          onChange={handle}
          required
        />
        <RadioCardGroup
          label="How was the condition of your box/products on arrival?"
          name="condition"
          options={CONDITION}
          value={data.condition}
          onChange={handle}
          required
        />
        <EmojiRating
          label="How Satisfied are you with the delivery experience?"
          name="satisfaction"
          value={data.satisfaction}
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
        <SubmitButton onClick={() => alert("Delivery feedback submitted!")} />
      </div>
    </div>
  );
}
