import { IconButton, useToast } from '@chakra-ui/react'
import { FiPauseCircle, FiPlayCircle } from 'react-icons/fi'
import { useClock } from '../../hooks/clock/useClock'
import { useTasks } from '../../hooks/tasks/useTasks';

export const ActionButton = () => {
  const {
    clock: { isRunning },
    toggleTimer
  } = useClock();

  const { 
    selectedTask,
  } = useTasks();

  const toast = useToast();

  const handleActionButtonClick = () => {
    if (!selectedTask) {
      const input = document.getElementById('task-select');
      input.focus();

      return toast({
        title: "You need to select a task",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    toggleTimer();
  }

  return (
    <IconButton
      icon={isRunning ? <FiPauseCircle /> : <FiPlayCircle />}
      onClick={handleActionButtonClick}
      variant="solid"
      color="white"
      fontSize="24px"
      borderRadius="full"
      colorScheme={isRunning ? "red" : "green"}
      size="lg"
    />
  )
}