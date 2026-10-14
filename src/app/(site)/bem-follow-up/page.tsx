import type { Metadata } from "next";
import BemFollowUpPageContent from "@/components/bem-follow-up/BemFollowUpPageContent";

export const metadata: Metadata = {
  title: "تفكيرة — متابعة مجانية لتقدّم إبنك",
  description:
    "متابعة مجانية لمدة أسبوعين تشمل 3 ملخصات التقدّم في الرياضيات، للتحضير لشهادة التعليم المتوسط.",
};

export default function BemFollowUpPage() {
  return <BemFollowUpPageContent />;
}
