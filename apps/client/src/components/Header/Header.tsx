import { useAuth } from "@/features/authentication";
import {
  Flex,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { useSidebarSizeStore } from "../Sidebar/stores/sidebarSizeStore";
import { AvatarMenuSkeleton } from "./AvatarMenuSkeleton";

export function Header() {
  const { user, logout } = useAuth();
  const navSize = useSidebarSizeStore(state => state.navSize);

  return (
    <Flex
      as="header"
      pos="fixed"
      zIndex={9999}
      w="full"
      bg={useColorModeValue("gray.200", "gray.800")}
      height="20"
      boxShadow="lg"
      pr={navSize === "large" ? "56" : "24"}
      ml={navSize === "large" ? "52" : "20"}
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              {user ? (
                <HStack>
                  <Avatar size="sm" />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user?.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {user?.email}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              ) : (
                <AvatarMenuSkeleton />
              )}
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Perfil</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  logout();
                }}
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
