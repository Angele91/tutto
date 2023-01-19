import { Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import formatDuration from 'format-duration'


export const HistoryItem = ({ item }) => {
  return (
    <Flex p="7px" gap="10px" borderBottom="1px solid" borderColor="gray.400">
      <Text fontSize="14px" color="white">
        {dayjs(item.date).format('MMMM D')}
      </Text>
      <Text flex="1" fontSize="14px" color="gray.400">
        {formatDuration(item.duration * 1000)}
      </Text>
      <Text fontSize="14px" color="gray.400">
        {dayjs(item.date).format('h:mm A')}
      </Text>
    </Flex>
  )
}