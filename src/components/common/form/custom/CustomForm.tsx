import { FieldValues } from "react-hook-form";

import BaseForm from "../BaseForm";
import { BaseFormProps } from "../types/base.types";

/**
 * CustomForm extends BaseForm with additional customization options
 * This maintains backward compatibility while allowing for future enhancements
 */
export default function CustomForm<T extends FieldValues>(
  props: BaseFormProps<T>,
) {
  // Currently just passes through to BaseForm
  // Future enhancements can be added here
  return <BaseForm {...props} />;
}
