import { useMemo, useState } from "react";
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import {
  FiMenu,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { INavItemProps } from "./types";
import { NavItems } from "./NavItems";
import { useSidebarSizeStore } from "./stores/sidebarSizeStore";

export function useNavSize(): [string, () => void] {
  const [navSize, changeNavSize] = useState("large");

  function toggleNavSize() {
    if (navSize === "small") changeNavSize("large");
    else changeNavSize("small");
  }

  return [navSize, toggleNavSize];
}

export function Sidebar() {
  const { navSize, toggleNavSize } = useSidebarSizeStore();

  const navLinks: INavItemProps[] = useMemo(
    () => [
      { url: "/app", icon: FiCalendar, title: "Painel", navSize },
      { url: "/app/users", icon: FiUser, title: "Usuários", navSize },
      { url: "/app/reports", icon: FiBriefcase, title: "Relatórios", navSize },
      { url: "/app/settings", icon: FiSettings, title: "Ajustes", navSize },
    ],
    [navSize],
  );

  return (
    <Flex
      as="aside"
      pos="fixed"
      bg={useColorModeValue("gray.200", "gray.800")}
      boxShadow="lg"
      zIndex={999}
      borderBottomRightRadius="lg"
      w={navSize === "small" ? "20" : "52"}
      h="100vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={toggleNavSize}
          aria-label=""
        />
        <NavItems items={navLinks} />
      </Flex>
    </Flex>
  );
}
