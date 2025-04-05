"use client";

import * as React from "react";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";

export function onSubmit(values: {
  username: string;
  email: string;
  password: string;
}) {
  console.log(values); // Handle form submission
}

type Field = {
  name: string;
  label: string;
  zodValidation: z.ZodTypeAny;
  default: string | number | boolean;
  input: (field: ControllerRenderProps) => React.ReactNode;
};

export const fields: Field[] = [
  {
    name: "email",
    label: "Email",
    zodValidation: z.string().email(),
    default: "Ahihi",
    input: (field) => <Input type="email" {...field} />,
  },
  {
    name: "password",
    label: "Password",
    zodValidation: z.string().min(8),
    default: "",
    input: (field) => <Input type="password" {...field} />,
  },
  {
    name: "fullName",
    label: "Full Name",
    zodValidation: z.string().min(2),
    default: "",
    input: (field) => <Input type="text" {...field} />,
  },
  {
    name: "description",
    label: "Description",
    zodValidation: z.string(),
    default: "",
    input: (field) => <Textarea {...field} />,
  },
  {
    name: "gender",
    label: "Gender",
    zodValidation: z.enum(["male", "female", "other"]),
    default: "male",
    input: (field) => (
      <RadioGroup value={field.value} onValueChange={field.onChange}>
        {[
          { value: "male", label: "Male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ].map((gender) => (
          <div key={gender.value} className="flex items-center space-x-2">
            <RadioGroupItem value={gender.value} id={gender.value} />
            <Label htmlFor={gender.value}>{gender.label}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  },
  {
    name: "agreeToTerms",
    label: "I agree to terms",
    zodValidation: z.boolean(),
    default: false,
    input: (field) => (
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    ),
  },
  {
    name: "userType",
    label: "User Type",
    zodValidation: z.enum(["admin", "user", "guest"]),
    default: "user",
    input: (field) => (
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Administrator</SelectItem>
          <SelectItem value="user">Regular User</SelectItem>
          <SelectItem value="guest">Guest</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
];
