import { Flex } from "@chakra-ui/react"
import { TopBar } from "../components/TopBar"
import { NoTasks } from "../components/NoTasks"
import { TaskList } from "../components/TaskList"
import { useTasks } from "../hooks/tasks/useTasks"

export const MainView = () => {
  const { tasks: { list } } = useTasks();

  return (
    <Flex
      gap="20px"
      flexDir="column"
      padding="20px"
      bgColor="background"
      w="100vw"
      h="100vh"
    >
      <TopBar />
      {list.length > 0 && <TaskList />}
      {list.length === 0 && <NoTasks />}
    </Flex>
  )
}