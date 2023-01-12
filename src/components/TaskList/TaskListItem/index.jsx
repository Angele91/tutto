import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Textarea,
  Text,
  Flex,
  FormControl,
  IconButton,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { HistoryItem } from "./HistoryItem";
import { FiMoreHorizontal, FiPlayCircle } from 'react-icons/fi'

export const TaskListItem = () => {
  return (
    <AccordionItem
      borderTop="none"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <AccordionButton
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        borderTopRadius="8px"
        gap="10px"
      >
        <Checkbox size="md" colorScheme="gray.300">
          Task Name
        </Checkbox>
        <Flex alignItems="center" justifyContent="flex-end">
          <Text color="gray.300" fontSize="14px">
            1h 30m
          </Text>
          <IconButton
            icon={<FiMoreHorizontal />}
            variant="ghost"
            colorScheme="black"
            aria-label="More options"
          />
          <IconButton
            icon={<FiPlayCircle />}
            variant="ghost"
            colorScheme="green"
            aria-label="Start"
            borderRadius="full"
          />
        </Flex>
      </AccordionButton>
      <AccordionPanel display="flex" flexDir="column" gap="8px">
        <FormControl>
          <FormLabel fontWeight="bold">Description</FormLabel>
          <Textarea
            placeholder="Write a description for your task here."
            rows="6"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">History</FormLabel>
          <Flex
            flexDir="column"
            padding="8px 13px"
            maxHeight="155px"
            overflowY="auto"
          >
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
          </Flex>
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  );
};
