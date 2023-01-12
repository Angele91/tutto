import { Card, Accordion } from '@chakra-ui/react'
import { TaskListItem } from './TaskListItem'

export const TaskList = () => {
  return (
    <Card
      flexDirection="column"
      flex="1"
      p="20px"
    >
      <Accordion variant="unstyled" allowToggle>
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
      </Accordion>
    </Card>
  )
}