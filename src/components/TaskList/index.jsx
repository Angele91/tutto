import { Card, Accordion } from '@chakra-ui/react'
import { useTasks } from '../../hooks/tasks/useTasks';
import { TaskListItem } from './TaskListItem'

export const TaskList = () => {
  const { tasks: { list } } = useTasks();
  console.log(list);
  return (
    <Card
      flexDirection="column"
      flex="1"
      p="20px"
    >
      <Accordion variant="unstyled" allowToggle>
        {list.map((task) => (
          <TaskListItem item={task} />
        ))}
      </Accordion>
    </Card>
  )
}