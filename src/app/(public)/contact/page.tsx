"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormInitialState } from "./constants";

export default function ContactPage() {
  const [form, setForm] = useState(contactFormInitialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle sending the form data, e.g., via fetch or an API call
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background py-16">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 w-full flex items-center justfy-center bg-zinc-100 dark:bg-zinc-800 p-8">
          <Image
            src="/l2brary.ico"
            alt="Contact us"
            width={300}
            height={300}
            className="w-64 h-64 object-contain"
          />
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
            Contact Us
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-300">
            Have a question or want to reach out? Fill out the form below and
            we&apos;ll get back to you soon!
          </p>
          {submitted ? (
            <div className="text-green-600 dark:text-green-400 font-semibold text-center py-8">
              Thank you for contacting us! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-1 text-zinc-700 dark:text-zinc-200"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-1 text-zinc-700 dark:text-zinc-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label
                  htmlFor="class"
                  className="block mb-1 text-zinc-700 dark:text-zinc-200"
                >
                  Class
                </Label>
                <Input
                  id="class"
                  name="class"
                  type="text"
                  required
                  value={form.class}
                  onChange={handleChange}
                  placeholder="e.g. 10A, 12B, etc."
                />
              </div>
              <div>
                <Label
                  htmlFor="content"
                  className="block mb-1 text-zinc-700 dark:text-zinc-200"
                >
                  Message
                </Label>
                <Textarea
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
              <Button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
