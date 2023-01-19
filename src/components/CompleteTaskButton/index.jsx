import { IconButton, Tooltip } from "@chakra-ui/react"
import { FiCheckCircle } from "react-icons/fi"
import { useClock } from "../../hooks/clock/useClock";
import { useTasks } from "../../hooks/tasks/useTasks"

export const CompleteTaskButton = () => {
  const {
    selectedTask,
    updateTask,
  } = useTasks();

  const {
    stopTimer,
  } = useClock();

  const handleCompleteTask = () => {
    updateTask(selectedTask.id, {
      ...selectedTask,
      isCompleted: true,
    }, { clearSelectedTask: true });

    stopTimer();
  }

  return (
    <Tooltip label="Mark this task as completed">
      <IconButton
        icon={<FiCheckCircle />}
        variant="ghost"
        fontSize="24px"
        borderRadius="full"
        colorScheme="green"
        disabled={!selectedTask || selectedTask?.isCompleted}
        size="lg"
        onClick={handleCompleteTask}
      />
    </Tooltip>
  )
}