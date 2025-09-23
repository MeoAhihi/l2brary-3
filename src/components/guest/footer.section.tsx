"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is L2brary?",
    answer:
      "L2brary is a learning and development platform for clubs, designed to help members grow their knowledge and skills through curated activities and resources.",
  },
  {
    question: "How can I join the Newton Physics Club?",
    answer:
      "You can join by clicking the 'Join Now' button on the homepage or by contacting us directly using the information below.",
  },
  {
    question: "Who can participate in the activities?",
    answer:
      "All club members are welcome to participate in our activities. Some events may be open to guests—check the event details for more information.",
  },
];

const FooterSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <footer className="mt-12 w-full border-t border-zinc-200 bg-zinc-100 py-10 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 md:flex-row">
        {/* FAQ Section */}
        <div className="flex-1">
          <h3 className="mb-4 text-xl font-semibold">FAQ</h3>
          <ul className="space-y-3">
            {faqs.map((faq, idx) => (
              <li key={faq.question}>
                <button
                  className="w-full text-left font-medium text-zinc-800 focus:outline-none dark:text-zinc-200"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2">
                      {openIndex === idx ? "−" : "+"}
                    </span>
                  </span>
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Section */}
        <div className="flex-1">
          <h3 className="mb-4 text-xl font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:info@l2brary.club" className="hover:underline">
                info@l2brary.club
              </a>
            </li>
            <li>
              <span className="font-medium">Location:</span> Newton Physics
              Club, Main Campus, Science Block
            </li>
            <li>
              <span className="font-medium">Phone:</span> (555) 123-4567
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} L2brary. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
