import { IconButton, useToast } from '@chakra-ui/react'
import { useCallback } from 'react';
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

  const handleActionButtonClick = useCallback(() => {
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
  }, [selectedTask, toggleTimer, toast])

  return (
    <IconButton
      icon={isRunning ? <FiPauseCircle /> : <FiPlayCircle />}
      onClick={handleActionButtonClick}
      variant="ghost"
      fontSize="24px"
      borderRadius="full"
      colorScheme={isRunning ? "red" : "green"}
      size="lg"
    />
  )
}