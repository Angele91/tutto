import { Card, Flex } from "@chakra-ui/react"
import { Chronometer } from "../Chronometer"
import { ActionButton } from "../ActionButton"
import { useTasks } from "../../hooks/tasks/useTasks"
import CreatableSelect from 'react-select/creatable';

export const TopBar = () => {
  const {
    tasks: { list },
    addTask,
    setSelectedTask,
    selectedTask,
  } = useTasks()

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
        isClearable
        placeholder="Write a task..."
        value={selectedTask && { value: selectedTask.id, label: selectedTask.name}}
        onCreateOption={(inputValue) => addTask({ newTask: inputValue })}
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
        }}
        components={{
          DropdownIndicator: null,
        }}
      />
      <Chronometer />
      <ActionButton />
    </Card>
  )
}