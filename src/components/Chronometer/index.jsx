import { Flex, Text } from '@chakra-ui/react'
import formatDuration from 'format-duration';
import { useMemo } from 'react';
import { useClock } from '../../hooks/clock/useClock';
import { useTasks } from '../../hooks/tasks/useTasks';

export const Chronometer = () => {
  const {
    clock: {
      currentTick,
    },
    duration,
  } = useClock();

  const {
    selectedTask,
  } = useTasks();

  const isFarFromEstimation = useMemo(() => {
    return currentTick > selectedTask?.estimationInSeconds;
  }, [currentTick, selectedTask?.estimationInSeconds])
  
  return (
    <Flex flexDir="column">
      <Text
        fontSize="18px"
        fontFamily="Inter"
        fontWeight="bold"
        width="50px"
        color={isFarFromEstimation ? 'red.500' : 'white'}
      >
        {duration || '0:00'}
      </Text>
      {selectedTask?.estimation && (
        <Text
          fontSize="12px"
        >
          {formatDuration(selectedTask?.estimationInSeconds * 1000, { s: false })}
        </Text>
      )}
    </Flex>
  )
}