import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Flex,
  FormControl,
  IconButton,
  FormLabel,
  Checkbox,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
} from "@chakra-ui/react";
import { HistoryItem } from "./HistoryItem";
import { FiMoreHorizontal, FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { useTasks } from "../../../hooks/tasks/useTasks";
import { NoItemsInHistory } from "./NoItemsInHistory";
import { calculateCummulativeTime } from "../../../utils/time";
import { useClock } from "../../../hooks/clock/useClock";
import MDEditor from "@uiw/react-md-editor";
import duration from 'dayjs/plugin/duration';
import dayjs from "dayjs";
import { CSS } from '@dnd-kit/utilities';

import parseDuration from 'parse-duration';
import { useSortable } from "@dnd-kit/sortable";

dayjs.extend(duration);

export const TaskListItem = ({ item }) => {
  const {
    updateTask,
    deleteTask,
    selectedTask,
    setSelectedTask,
  } = useTasks();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    clock: { isRunning },
    toggleTimer,
  } = useClock();

  const toggleTimerWithItem = (evt) => {
    evt.stopPropagation();

    if (selectedTask?.id !== item.id) {
      setSelectedTask(item.id);
    }

    toggleTimer();
  }

  return (
    <AccordionItem
      borderTop="none"
      borderBottom="1px solid"
      borderColor="gray.300"
      style={style}
    >
      <AccordionButton
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        borderTopRadius="8px"
        gap="10px"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Flex>
          <Checkbox
            mr="8px"
            size="md"
            colorScheme="green"
            isChecked={item.isCompleted}
            onChange={(evt) =>
              updateTask(item.id, { isCompleted: evt.target.checked })
            }
            textDecor={item.isCompleted ? "line-through" : "none"}
          />
          <Editable
            value={item.name}
            onChange={(evt) => updateTask(item.id, { name: evt })}
            onFocus={(evt) => evt.stopPropagation()}
            onClick={(evt) => evt.stopPropagation()}
          >
            <EditablePreview textDecor={item.isCompleted ? 'line-through' : 'none'}  />
            <EditableInput width="full" textAlign="left" />
          </Editable>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <Text color="gray.300" fontSize="14px">
            {calculateCummulativeTime(item.history)}
          </Text>
          <Menu>
            <Tooltip label="More options">
              <MenuButton
                as={IconButton}
                variant="ghost"
                colorScheme="black"
                aria-label="More options"
                icon={<FiMoreHorizontal />}
                onClick={e => e.stopPropagation()}
                mx="8px"
              />
            </Tooltip>
            <MenuList onClick={(evt) => evt.stopPropagation()}>
              <MenuItem
                onClick={(evt) => {
                  evt.stopPropagation();
                  deleteTask(item.id);
                }}
              >
                <Text
                  fontSize="14px"
                  color="red.500"
                >
                  Delete
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <Tooltip label="Start">
            <IconButton
              icon={isRunning && selectedTask?.id === item.id ? (
                <FiPauseCircle />
              ) : (
                <FiPlayCircle />
              )}
              variant="ghost"
              colorScheme={isRunning && selectedTask?.id === item.id ? "red" : "green"}
              aria-label="Start"
              borderRadius="full"
              onClick={toggleTimerWithItem}
            />
          </Tooltip>
        </Flex>
      </AccordionButton>
      <AccordionPanel display="flex" flexDir="column" gap="8px">
        <FormControl>
          <FormLabel>
            <Text fontWeight="bold">
              Estimation
            </Text>
          </FormLabel>
          <Input 
            placeholder="Ex. 1h 30m"
            value={item.estimation}
            onChange={(evt) => updateTask(item.id, {
              estimation: evt.target.value,
              estimationInSeconds: parseDuration(evt.target.value, 's')
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">Description</FormLabel>
          <MDEditor
            value={item.description}
            onChange={(value) => updateTask(item.id, { description: value })}
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
            {item.history.length === 0 && <NoItemsInHistory />}
            {item.history.map((historyItem) => (
              <HistoryItem item={historyItem} />
            ))}
          </Flex>
        </FormControl>
      </AccordionPanel>
    </AccordionItem>
  );
};
