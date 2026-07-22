import React from "react";
import Pricing from "@/app/components/pricing/Pricing";

export const metadata = {
  title: "Pricing | BASOBAS",
  description: "Simple, transparent pricing plans for listing and managing rooms on BASOBAS.",
};

const PricingPage = () => {
  return (
    <main>
      <Pricing />
    </main>
  );
};

export default PricingPage;
