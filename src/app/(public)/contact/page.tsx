"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would handle sending the form data, e.g., via fetch or an API call
    setSubmitted(true);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background py-16">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 p-8">
          <img
            src="/contact-illustration.svg"
            alt="Contact us"
            className="w-64 h-64 object-contain"
            onError={(e: any) => {
              // fallback if image not found
              e.target.onerror = null;
              e.target.src = "/l2brary.ico";
            }}
          />
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Contact Us</h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-300">
            Have a question or want to reach out? Fill out the form below and we'll get back to you soon!
          </p>
          {submitted ? (
            <div className="text-green-600 dark:text-green-400 font-semibold text-center py-8">
              Thank you for contacting us! We'll be in touch soon.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                  Class
                </label>
                <input
                  id="class"
                  name="class"
                  type="text"
                  required
                  value={form.class}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 10A, 12B, etc."
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                  Message
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  value={form.content}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
