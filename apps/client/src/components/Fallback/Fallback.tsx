import {
  Box,
  Heading,
  Text,
  CheckCircleIcon,
  useColorModeValue,
  Flex,
  CloseIcon,
  InfoIcon,
  WarningTwoIcon,
  Button,
} from "@/lib/chakra-ui";

export interface IFallBackCardProps {
  type: "success" | "error" | "info" | "warning";
  headingText: string;
  descriptionText: string;
  fallbackBtn?: boolean;
}

function ErrorIcon() {
  return (
    <Box display="inline-block">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="red.500"
        rounded="50px"
        w="55px"
        h="55px"
        textAlign="center"
      >
        <CloseIcon boxSize="20px" color="white" />
      </Flex>
    </Box>
  );
}

const icons = {
  success: <CheckCircleIcon boxSize="50px" color="green.500" />,
  info: <InfoIcon boxSize="50px" color="blue.500" />,
  error: <ErrorIcon />,
  warning: <WarningTwoIcon boxSize="50px" color="orange.300" />,
};

export function Fallback({
  descriptionText,
  headingText,
  type = "info",
  fallbackBtn = false,
}: IFallBackCardProps) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        textAlign="center"
        py={10}
        px={6}
        w="xl"
        rounded="md"
        bg={useColorModeValue("gray.200", "gray.800")}
      >
        {icons[type]}
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {headingText}
        </Heading>
        <Text color="gray.500">{descriptionText}</Text>
        {fallbackBtn && (
          <Button
            onClick={() => window.location.assign(window.location.origin)}
          >
            Refresh
          </Button>
        )}
      </Box>
    </Flex>
  );
}
