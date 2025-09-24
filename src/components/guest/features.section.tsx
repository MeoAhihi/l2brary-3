import React from "react";

import { Card } from "../ui/card";

const features = [
  {
    title: "Fast Performance",
    description:
      "Experience lightning-fast load times and seamless interactions throughout the app.",
    icon: "⚡️",
  },
  {
    title: "Secure",
    description:
      "Your data is protected with industry-leading security practices and encryption.",
    icon: "🔒",
  },
  {
    title: "User Friendly",
    description:
      "Intuitive design ensures a smooth and enjoyable user experience for everyone.",
    icon: "👍",
  },
  {
    title: "Customizable",
    description:
      "Easily tailor features and settings to fit your unique workflow and preferences.",
    icon: "🎨",
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our round-the-clock customer support.",
    icon: "🕑",
  },
];

export const FeaturesSection: React.FC = () => (
  <section className="features-section w-full bg-teal-400 py-16">
    <h2 className="features-title mb-2 text-center text-3xl font-bold">
      Our Offers
    </h2>
    <p className="features-subtitle mb-10 text-center text-lg text-zinc-600 dark:text-zinc-300">
      Discover the benefits and features designed to enhance your experience.
    </p>
    <div className="features-list mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[
        ...features,
        {
          title: "Collaboration",
          description:
            "Work together in real-time and share progress with your team easily.",
          icon: "🤝",
        },
      ].map((feature, idx) => (
        <Card
          className="feature-item flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg dark:bg-zinc-900"
          key={idx}
        >
          <div className="feature-icon mb-3" style={{ fontSize: "2.5rem" }}>
            {feature.icon}
          </div>
          <h3 className="feature-title mb-2 text-xl font-semibold">
            {feature.title}
          </h3>
          <p className="feature-description text-zinc-600 dark:text-zinc-300">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  </section>
);
