"use client"

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
    <footer className="w-full bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-10 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* FAQ Section */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">FAQ</h3>
          <ul className="space-y-3">
            {faqs.map((faq, idx) => (
              <li key={faq.question}>
                <button
                  className="w-full text-left font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
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
                    className="mt-1 text-zinc-600 dark:text-zinc-400 text-sm"
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
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="text-zinc-700 dark:text-zinc-300 text-sm space-y-2">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:info@l2brary.club"
                className="hover:underline"
              >
                info@l2brary.club
              </a>
            </li>
            <li>
              <span className="font-medium">Location:</span> Newton Physics Club, Main Campus, Science Block
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
