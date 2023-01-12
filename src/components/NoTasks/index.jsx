import { Card, Text, Button } from '@chakra-ui/react'

export const NoTasks = () => {
  return (
    <Card
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex="1"
    >
      <Text mb="10px" fontSize="24px">
        Looks like you don’t have any tasks yet...
      </Text>
      <Button>
        Create a Task
      </Button>
    </Card>
  )
}