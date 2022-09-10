import { Text } from "@chakra-ui/react";

type CopyrightProps = {
  title: string;
};

export function Copyright({ title }: CopyrightProps) {
  return (
    <Text fontSize="sm" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" to="https://mui.com/"> */}
      {title}
      {/* </Link>{' '} */}
      {new Date().getFullYear()}.
    </Text>
  );
}
