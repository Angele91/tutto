import { Flex, useColorMode } from "@chakra-ui/react"
import { TopBar } from "../components/TopBar"
import { NoTasks } from "../components/NoTasks"
import { TaskList } from "../components/TaskList"
import { useTasks } from "../hooks/tasks/useTasks"
import { useEffect } from "react"
import { MainOptions } from "../components/MainOptions"

export const MainView = () => {
  const { tasks: { list } } = useTasks();
  const { setColorMode, colorMode } = useColorMode()

  useEffect(() => {
    // Workaround while we figure out how to set the initial color mode
    // Already set in theme and put the script but it doesn't work
    if (colorMode === 'light') {
      setColorMode('dark')
    }
  }, [colorMode, setColorMode])


  return (
    <Flex
      gap="20px"
      flexDir="column"
      padding="20px"
      w="100vw"
      h="100vh"
    >
      <TopBar />
      <MainOptions />
      {list.length > 0 && <TaskList />}
      {list.length === 0 && <NoTasks />}
    </Flex>
  )
}