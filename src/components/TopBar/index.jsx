import { Card, Flex } from "@chakra-ui/react"
import { Chronometer } from "../Chronometer"
import { ActionButton } from "../ActionButton"
import { useTasks } from "../../hooks/tasks/useTasks"
import CreatableSelect from 'react-select/creatable';
import { CompleteTaskButton } from "../CompleteTaskButton";
import { useClock } from "../../hooks/clock/useClock";

export const TopBar = () => {
  const {
    tasks: { list },
    addTask,
    setSelectedTask,
    selectedTask,
  } = useTasks()

  const { 
    startTimer,
  } = useClock();

  return (
    <Card
      p="8px"
      h="70px"
      alignItems="center"
      flexDirection="row"
      width="full"
      gap="15px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      as={Flex}
    >
      <CreatableSelect
        key={selectedTask?.id || 'no-task-selected'}
        isClearable
        placeholder="Write a task..."
        value={selectedTask ? { value: selectedTask.id, label: selectedTask.name } : undefined}
        onCreateOption={(inputValue) => {
          addTask({ newTask: inputValue })
          startTimer()
        }}
        onChange={(selectedOption) => {
          if (!selectedOption) {
            return setSelectedTask()
          }

          setSelectedTask(selectedOption.value)
        }}
        options={list.map((task) => ({ value: task.id, label: task.name }))}
        inputId="task-select"
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1,
          }),
          input: (provided) => ({
            ...provided,
            color: 'white',
          }),
          control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
          }),
          menu: (provided) => ({
            ...provided,
            // It's not taking the Chakra theme colors... Weird.
            backgroundColor: '#4A5568',
            color: 'white',
          }),
          option: (provided, state) => ({
            ...provided,
            color: 'white',
            backgroundColor: state.isSelected || state.isFocused ? "#718096" : provided.backgroundColor,
            '&:hover': {
              backgroundColor: '#718096',
            }
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'white',
          }),
        }}
        components={{
          DropdownIndicator: null,
        }}
      />
      <Chronometer />
      <Flex>
        <ActionButton />
        <CompleteTaskButton />
      </Flex>
    </Card>
  )
}