import {
  ArrowBackIcon,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@/lib/chakra-ui";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarSizeStore } from "../Sidebar/stores/sidebarSizeStore";

interface ContentLayoutProps {
  children: ReactNode;
  goBackButton?: boolean;
  pageTitle?: string;
}

export function ContentLayout({
  children,
  goBackButton,
  pageTitle,
}: ContentLayoutProps) {
  const { navSize } = useSidebarSizeStore();
  const navigate = useNavigate();
  return (
    <Stack
      bg={useColorModeValue("gray.100", "gray.900")}
      pl={navSize === "large" ? "52" : "20"}
      pt="20"
      h="full"
      w="full"
      minH="100vh"
      minW="100vw"
      as="main"
    >
      <>
        {goBackButton || pageTitle ? (
          <Flex p="2">
            {goBackButton ? (
              <Tooltip hasArrow>
                <IconButton
                  variant="outline"
                  aria-label="go back"
                  icon={<ArrowBackIcon />}
                  size="lg"
                  onClick={() => navigate(-1)}
                />
              </Tooltip>
            ) : null}
            {pageTitle ? <Heading ml="2">{pageTitle}</Heading> : null}
          </Flex>
        ) : null}
        <section>{children}</section>
      </>
    </Stack>
  );
}
