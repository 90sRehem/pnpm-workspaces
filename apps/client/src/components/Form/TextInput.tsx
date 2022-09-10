import { Input, InputProps } from "@/lib/chakra-ui";
import { FieldError, UseFormRegisterReturn } from "@/lib/react-hook-form";
import { InputWrapper } from "./InputWrapper";

interface TextInputProps extends InputProps {
  type?: "text" | "email";
  label?: string;
  name: string;
  error?: FieldError | undefined;
  description?: string;
  registration: Partial<UseFormRegisterReturn>;
  isRequired?: boolean;
}

export function TextInput({
  name,
  description,
  error,
  label,
  type = "text",
  registration,
  isRequired = false,
  size = "lg",
  ...rest
}: TextInputProps) {
  return (
    <InputWrapper
      name={name}
      error={error}
      description={description}
      label={label}
      isRequired={isRequired}
    >
      <Input size={size} type={type} name={name} {...registration} {...rest} />
    </InputWrapper>
  );
}
