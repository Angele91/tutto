import { Flex } from "@chakra-ui/react";

export const Subtitle = ({ children, ...rest }) => (
  <Flex
    borderBottomWidth="1px"
    borderBottomColor="gray.300"
    pb="8px"
    fontWeight="bold"
    {...rest}
  >
    {children}
  </Flex>
)