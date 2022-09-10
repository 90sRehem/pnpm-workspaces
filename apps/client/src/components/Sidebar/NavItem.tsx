import {
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "../Link";
import { INavItemProps } from "./types";

export function NavItem({ icon, title, active, navSize, url }: INavItemProps) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      as="li"
    >
      <Menu placement="right">
        <ChakraLink
          as={Link}
          backgroundColor={active ? "Highlight" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : ""}
          to={url}
        >
          <Tooltip hasArrow placement="right" label={title}>
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? "whiteAlpha.900" : "gray.500"}
                />
                <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Tooltip>
        </ChakraLink>
      </Menu>
    </Flex>
  );
}
