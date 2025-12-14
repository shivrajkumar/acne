"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormHeader } from "./formHeader";
import { FormCard } from "./formCard";
import { RadioCardGroup } from "./radioCardGroup";
import { RadioGroup } from "./radioGroup";
import { NumericRating } from "./numericRating";
import { TextAreaField } from "./textAreaField";
import { SubmitButton } from "./submitButton";
import { EmojiRating } from "./emojiRating";
import { FEEDBACK_CONFIG_API, SUBMIT_FEEDBACK_API } from "@/constants/urls";
import { fetchRequest } from "@/helpers/fetchRequest";
import { FormSkeleton } from "./formSkeleton";

export function ProductForm() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");
  const formType = 'ACNE_PRODUCT_FEEDBACK_FORM';

  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const handle = (n, v) => setData((p) => ({ ...p, [n]: v }));

  useEffect(() => {
    const fetchFeedbackConfig = async () => {
      try {
        const response = await fetchRequest(FEEDBACK_CONFIG_API(formType));
        console.log("FEEDBACK_CONFIG_API response:", response);

        if (response?.data?.data?.content?.questions) {
          setQuestions(response.data.data.content.questions);
        }
      } catch (error) {
        console.error("Error fetching feedback config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackConfig();
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // Validate caseId
      if (!caseId) {
        alert("Case ID is missing. Please check the URL.");
        return;
      }

      // Transform the data into the required format
      const formData = questions.map((question) => ({
        question_id: question.id,
        question_text: question.text,
        field_key: question.id,
        response: [data[question.id] || ""],
        response_type: "SINGLE",
      }));

      const payload = {
        type: formType,
        formData: formData,
      };

      const response = await fetchRequest(SUBMIT_FEEDBACK_API(caseId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "acne",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const { id, text, optionMap, is_mandatory } = question;

    // Check if it's an emoji rating (has icon property)
    const hasIcons = optionMap.some((opt) => opt.icon);

    // Check if it's a numeric rating (has sub_name property like "Bad", "Average", etc.)
    const hasSubNames = optionMap.some((opt) => opt.sub_name);

    // Check if it's a text area (empty optionMap)
    const isTextArea = optionMap.length === 0;

    // Check if it's yes/no (only 2 options with yes/no values)
    const isYesNo =
      optionMap.length === 2 &&
      optionMap.some((opt) => opt.value === "yes") &&
      optionMap.some((opt) => opt.value === "no");

    if (isTextArea) {
      return (
        <TextAreaField
          key={id}
          label={text}
          name={id}
          value={data[id] || ""}
          onChange={handle}
          required={is_mandatory}
        />
      );
    }

    if (hasIcons) {
      // Emoji rating
      const emojiOptions = optionMap.map((opt) => ({
        emoji: opt.icon,
        value: opt.value,
      }));
      return (
        <EmojiRating
          key={id}
          label={text}
          name={id}
          value={data[id]}
          onChange={handle}
          required={is_mandatory}
          options={emojiOptions}
        />
      );
    }

    if (hasSubNames) {
      // Numeric rating
      const numericOptions = optionMap.map((opt) => ({
        value: opt.value,
        label: opt.name,
        subLabel: opt.sub_name,
      }));
      return (
        <NumericRating
          key={id}
          label={text}
          name={id}
          value={data[id]}
          onChange={handle}
          required={is_mandatory}
          options={numericOptions}
        />
      );
    }

    if (isYesNo) {
      // Simple yes/no radio group
      const radioOptions = optionMap.map((opt) => ({
        label: opt.name,
        value: opt.value,
      }));
      return (
        <RadioGroup
          key={id}
          label={text}
          name={id}
          options={radioOptions}
          value={data[id]}
          onChange={handle}
          required={is_mandatory}
        />
      );
    }

    // Default: RadioCardGroup for other options
    const cardOptions = optionMap.map((opt) => ({
      label: opt.name,
      value: opt.value,
    }));
    return (
      <RadioCardGroup
        key={id}
        label={text}
        name={id}
        options={cardOptions}
        value={data[id]}
        onChange={handle}
        required={is_mandatory}
      />
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-full pb-4">
        <FormHeader
          title="Product Feedback"
          subtitle="Your feedback helps us improve our products and create ones that fit you."
          bgClassName="bg-gradient-to-l from-[#FEEADB] to-[#F2F2F2]"
        />
        <FormCard>
          <FormSkeleton />
        </FormCard>
        <div className="px-4 pb-6">
          <SubmitButton disabled={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full pb-4">
      <FormHeader
        title="Product Feedback"
        subtitle="Your feedback helps us improve our products and create ones that fit you."
        bgClassName="bg-gradient-to-l from-[#FEEADB] to-[#F2F2F2]"
      />
      <FormCard>
        {questions.map((question) => renderQuestion(question))}
      </FormCard>
      <div className="px-4 pb-6">
        <SubmitButton onClick={handleSubmit} disabled={submitting} />
      </div>
    </div>
  );
}
