import { FieldError } from "react-hook-form";
import {
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

interface InputWrapperProps extends InputProps {
  label?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  name: string;
  isRequired?: boolean;
}

export function InputWrapper({
  name,
  label,
  error,
  children,
  description,
  isRequired = false,
}: InputWrapperProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {children}
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      {!!description && <FormHelperText>{description}</FormHelperText>}
    </FormControl>
  );
}
