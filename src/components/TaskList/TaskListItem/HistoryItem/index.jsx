import { Flex, Text } from '@chakra-ui/react'

export const HistoryItem = () => {
  return (
    <Flex p="7px" gap="10px" borderBottom="1px solid" borderColor="gray.400">
      <Text fontSize="14px" color="gray.400">
        October 19, 2023
      </Text>
      <Text flex="1" fontSize="14px" color="black">
        1h 30m
      </Text>
      <Text fontSize="14px" color="gray.400">
        1:23 PM
      </Text>
    </Flex>
  )
}