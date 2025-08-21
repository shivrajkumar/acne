import Questions from "@/components/generic/Questions";
import AnalyticsContextProvider from "@/context/AnalyticsContext";
import { AuthProvider } from "@/context/AuthContext";
import QuestionsContextProvider from "@/context/questions-store";
import { Suspense } from "react";
export default function page() {
  return (
    <>
      <AuthProvider>
        <QuestionsContextProvider>
          <AnalyticsContextProvider>
            <Suspense>
              <Questions />
            </Suspense>
          </AnalyticsContextProvider>
        </QuestionsContextProvider>
      </AuthProvider>
    </>
  );
}

export async function generateMetadata() {
  return {
    title:
      "Clear Ritual Skin Test: Get Your Personalised Acne Routine in 2 Minutes",
    description:
      "Take the free Clear Ritual Skin Test to discover your acne type and get a personalised, expert-designed skincare plan. It takes just 2 minutes to start your clear skin journey.",
  };
}
