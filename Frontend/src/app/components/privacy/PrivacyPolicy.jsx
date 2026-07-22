import React from "react";

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "When you create an account, list a room, or book a stay through BASOBAS, we collect information such as your name, email address, phone number, and payment details.",
      "We also automatically collect certain data when you use our platform, including device information, IP address, browser type, and usage patterns, to help us improve our services.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use your information to create and manage your account, process bookings and payments, connect renters with room owners, and provide customer support.",
      "We may also use your data to send you important updates about your account or bookings, and, with your consent, occasional promotional communications.",
    ],
  },
  {
    title: "3. Sharing Your Information",
    body: [
      "We share your information with room owners or renters only as necessary to facilitate a booking — for example, sharing contact details once a booking is confirmed.",
      "We do not sell your personal information to third parties. We may share data with trusted service providers who help us operate the platform, such as payment processors and hosting providers, under strict confidentiality agreements.",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "We use industry-standard security measures, including encryption and access controls, to protect your personal information from unauthorized access, alteration, or disclosure.",
      "While we take reasonable steps to safeguard your data, no online platform can guarantee complete security. We encourage you to use a strong, unique password for your account.",
    ],
  },
  {
    title: "5. Your Rights and Choices",
    body: [
      "You can access, update, or delete your account information at any time through your profile settings.",
      "You may opt out of promotional emails by using the unsubscribe link included in those messages. Note that you may still receive essential account and booking-related communications.",
    ],
  },
  {
    title: "6. Cookies",
    body: [
      "BASOBAS uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how our platform is used so we can improve it over time.",
      "You can control cookie preferences through your browser settings, though disabling cookies may affect some features of the platform.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of significant changes via email or a notice on the platform.",
    ],
  },
  {
    title: "8. Contact Us",
    body: [
      "If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to our team at contact@basobas.com.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="bg-sky-50 px-8 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-500">
            Last updated: July 11, 2026
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            At BASOBAS, we respect your privacy and are committed to protecting
            your personal information. This policy explains what data we
            collect, how we use it, and the choices you have.
          </p>
        </div>

        {/* Sections */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {sections.map((section, idx) => (
            <div
              key={section.title}
              className={idx !== sections.length - 1 ? "mb-8 pb-8 border-b border-slate-100" : ""}
            >
              <h2 className="mb-3 text-lg font-bold text-sky-900">
                {section.title}
              </h2>
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="mb-2 text-[14px] leading-relaxed text-slate-600 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
