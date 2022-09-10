import {
  Box,
  HStack,
  SkeletonCircle,
  VStack,
  SkeletonText,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export function AvatarMenuSkeleton() {
  return (
    <HStack>
      <SkeletonCircle size="10" />
      <VStack
        display={{ base: "none", md: "flex" }}
        alignItems="flex-start"
        spacing="1px"
        ml="2"
      >
        <SkeletonText noOfLines={2} w="36" />
      </VStack>
      <Box display={{ base: "none", md: "flex" }}>
        <FiChevronDown />
      </Box>
    </HStack>
  );
}
