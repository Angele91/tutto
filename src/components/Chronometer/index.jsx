import { Text } from '@chakra-ui/react'
import { useClock } from '../../hooks/clock/useClock';

export const Chronometer = () => {
  const {
    duration,
  } = useClock();
  
  return (
    <Text
      fontSize="18px"
      fontFamily="Inter"
      fontWeight="bold"
      width="50px"
    >
      {duration || '0:00'}
    </Text>
  )
}