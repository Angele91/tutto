import { Flex, useColorMode } from "@chakra-ui/react"
import { TopBar } from "../components/TopBar"
import { NoTasks } from "../components/NoTasks"
import { TaskList } from "../components/TaskList"
import { useTasks } from "../hooks/tasks/useTasks"
import { useEffect } from "react"
import { MainOptions } from "../components/MainOptions"
import { useApp } from "../hooks/app/useApp"

export const MainView = () => {
  const {
    tasks: {
      list
    },
    nonCompletedTasks
  } = useTasks();

  const {
    app: {
      showCompletedTasks,
    }
  } = useApp();

  const { setColorMode, colorMode } = useColorMode()

  useEffect(() => {
    // Workaround while we figure out how to set the initial color mode
    // Already set in theme and put the script but it doesn't work
    if (colorMode === 'light') {
      setColorMode('dark')
    }
  }, [colorMode, setColorMode])

  const getContent = () => {
    const taskLength = showCompletedTasks ? list.length : nonCompletedTasks.length

    if (taskLength === 0) {
      return <NoTasks />
    }

    return <TaskList />
  }


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
      {getContent()}
    </Flex>
  )
}