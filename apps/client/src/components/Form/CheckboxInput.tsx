import {
  Checkbox,
  CheckboxProps as ChakraCheckboxProps,
} from "@/lib/chakra-ui";
import { UseFormRegisterReturn } from "@/lib/react-hook-form";

interface CheckBoxProps extends ChakraCheckboxProps {
  label?: string;
  registration: Partial<UseFormRegisterReturn>;
}

export function CheckboxInput({ label, registration, ...rest }: CheckBoxProps) {
  return (
    <Checkbox {...registration} {...rest}>
      {label}
    </Checkbox>
  );
}
