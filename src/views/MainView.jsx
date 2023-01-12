import { Flex } from "@chakra-ui/react"
import { TopBar } from "../components/TopBar"
import { NoTasks } from "../components/NoTasks"
import { TaskList } from "../components/TaskList"

export const MainView = () => {
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
      <NoTasks />
      {/* <TaskList /> */}
    </Flex>
  )
}