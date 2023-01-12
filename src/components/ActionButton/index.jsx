import { IconButton } from '@chakra-ui/react'
import { FiPlusCircle } from 'react-icons/fi'

export const ActionButton = () => {
  return (
    <IconButton 
      icon={<FiPlusCircle />}
      variant="solid"
      color="white"
      fontSize="24px"
      borderRadius="full"
      colorScheme="green"
      size="lg"
    />
  )
}