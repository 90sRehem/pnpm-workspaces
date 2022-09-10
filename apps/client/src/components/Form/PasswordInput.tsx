import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  InputProps,
  ViewIcon,
  ViewOffIcon,
} from "@/lib/chakra-ui";
import { FieldError, UseFormRegisterReturn } from "@/lib/react-hook-form";
import { useState } from "react";
import { InputWrapper } from "./InputWrapper";

interface PasswordInputProps extends InputProps {
  label?: string;
  name: string;
  error?: FieldError | undefined;
  description?: string;
  registration: Partial<UseFormRegisterReturn>;
  isRequired?: boolean;
}

export function PasswordInput({ registration, ...rest }: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputWrapper {...rest}>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          {...registration}
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </InputWrapper>
  );
}
