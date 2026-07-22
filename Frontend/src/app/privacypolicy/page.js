import React from "react";
import PrivacyPolicy from "@/app/components/privacy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | BASOBAS",
  description: "Learn how BASOBAS collects, uses, and protects your personal information.",
};

const PrivacyPolicyPage = () => {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
};

export default PrivacyPolicyPage;
