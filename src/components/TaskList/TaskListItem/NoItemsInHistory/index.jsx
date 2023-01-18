import { Flex, Text } from "@chakra-ui/react"

export const NoItemsInHistory = () => {
  return (
    <Flex
      p="7px"
      gap="10px"
      borderBottom="1px solid"
      borderColor="gray.400"
      justifyContent="center"
    >
      <Text fontSize="14px" color="gray.400">
        No items in history
      </Text>
    </Flex>
  )
}