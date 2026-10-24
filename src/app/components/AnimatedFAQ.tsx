"use client";

import React, { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "fq-1",
    question: "Is it free to start?",
    answer:
      "Yes. The Starter plan is completely free for up to 50 members and needs no credit card. You can start welcoming first-timers and logging Sunday attendance right away without any upfront commitment.",
  },
  {
    id: "fq-2",
    question: "Can members log in too?",
    answer:
      "Yes. Members get their own dashboard to see events, RSVP to services, and view their personal tithe & giving history.",
  },
  {
    id: "fq-3",
    question: "Is our members' data safe?",
    answer:
      "Data is encrypted and access is strictly role-based, so people only see what they are allowed to. Financial records are only visible to authorized pastors and administrators.",
  },
  {
    id: "fq-4",
    question: "Does it work on phones?",
    answer:
      "Yes. It works smoothly on any phone, tablet, or computer with zero installation required. Ushers can check in members directly from mobile browsers.",
  },
  {
    id: "fq-5",
    question: "Can we cancel anytime?",
    answer:
      "Yes. There are no contracts, and you can export your complete member and giving records whenever you want before you leave.",
  },
  {
    id: "fq-6",
    question: "How does Sunday attendance tracking work?",
    answer:
      "Ushers can check in congregants in under 3 seconds per person using quick name search or family check-in, with instant live headcount sync directly to the pastor's phone.",
  },
  {
    id: "fq-7",
    question: "Can we record online transfers, cash, and POS offerings?",
    answer:
      "Yes. You can record direct bank transfers, cash envelopes, USSD, and POS offerings in one place, with automated digital receipts and transparent ministry breakdowns.",
  },
];

export default function AnimatedFAQ() {
  const [openId, setOpenId] = useState<string | null>("fq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="normal-faq-wrapper">
      <div className="normal-faq-list">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const headerId = `faq-h-${item.id}`;
          const contentId = `faq-c-${item.id}`;

          return (
            <div
              key={item.id}
              className={`normal-faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                id={headerId}
                type="button"
                className="normal-faq-question-btn"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span className="normal-faq-title">{item.question}</span>
                <span className="normal-faq-plus" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.4" strokeLinecap="round" />
                    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`normal-faq-body ${isOpen ? "expanded" : "collapsed"}`}
              >
                <div className="normal-faq-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
