'use client'
import { useState } from "react";
import { YES_NO } from "./formConfigs";
import { FormHeader } from "./formHeader";
import { FormCard } from "./formCard";
import { EmojiRating } from "./emojiRating";
import { RadioGroup } from "./radioGroup";
import { TextAreaField } from "./textAreaField";
import { SubmitButton } from "./submitButton";

export function ConsultationForm() {
  const [data, setData] = useState({});
  const handle = (n, v) => setData((p) => ({ ...p, [n]: v }));

  return (
    <div className="bg-gray-50 min-h-full">
      <FormHeader
        title="Consultation Feedback"
        subtitle="We aim to make every consultation worthwhile. Your feedback helps us improve our services."
        bgClassName="bg-gradient-to-l from-[#CDE3C1] to-[#F2F2F2]"
      />
      <FormCard>
        <EmojiRating
          label="How was your overall experience?"
          name="exp"
          value={data.exp}
          onChange={handle}
          required
        />
        <RadioGroup
          label="Did your Skin Coach understand your skin concerns?"
          name="understand"
          options={YES_NO}
          value={data.understand}
          onChange={handle}
          required
        />
        <RadioGroup
          label="Did your Skin Coach explain your skin concerns clearly?"
          name="explain"
          options={YES_NO}
          value={data.explain}
          onChange={handle}
          required
        />
        <RadioGroup
          label="Was the consultation helpful?"
          name="helpful"
          options={YES_NO}
          value={data.helpful}
          onChange={handle}
          required
        />
        <RadioGroup
          label="Are you satisfied with the treatment suggestions?"
          name="satisfied"
          options={YES_NO}
          value={data.satisfied}
          onChange={handle}
          required
        />
        <TextAreaField
          label="Any suggestion to improve the consultation?"
          name="suggestion"
          value={data.suggestion || ""}
          onChange={handle}
        />
      </FormCard>
      <div className="px-4 pb-6">
        <SubmitButton
          onClick={() => alert("Consultation feedback submitted!")}
        />
      </div>
    </div>
  );
}
