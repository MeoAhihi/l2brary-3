import DataForm from "@/components/ui/data-form";
import React from "react";
import { fields, onSubmit } from "./form-fields";

function Page() {
  return (
    <div className="max-w-xl mx-auto">
      <DataForm fields={fields} onSubmit={onSubmit} />
    </div>
  );
}

export default Page;
