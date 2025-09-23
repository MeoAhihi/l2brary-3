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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle sending the form data, e.g., via fetch or an API call
    setSubmitted(true);
  };

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center py-16">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row dark:bg-zinc-900">
        {/* Image Section */}
        <div className="justfy-center flex w-full items-center bg-zinc-100 p-8 md:w-1/2 dark:bg-zinc-800">
          <Image
            src="/l2brary.ico"
            alt="Contact us"
            width={300}
            height={300}
            className="h-64 w-64 object-contain"
          />
        </div>
        {/* Form Section */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Contact Us
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-300">
            Have a question or want to reach out? Fill out the form below and
            we&apos;ll get back to you soon!
          </p>
          {submitted ? (
            <div className="py-8 text-center font-semibold text-green-600 dark:text-green-400">
              Thank you for contacting us! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label
                  htmlFor="name"
                  className="mb-1 block text-zinc-700 dark:text-zinc-200"
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
                  className="mb-1 block text-zinc-700 dark:text-zinc-200"
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
                  className="mb-1 block text-zinc-700 dark:text-zinc-200"
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
                  className="mb-1 block text-zinc-700 dark:text-zinc-200"
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
                  className="focus:ring-primary resize-vertical w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  placeholder="How can we help you?"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 font-semibold transition"
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
