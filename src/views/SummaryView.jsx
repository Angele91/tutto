import { Accordion, Box, Card, Flex } from "@chakra-ui/react"
import dayjs from "dayjs";
import { Sidebar } from "../components/Sidebar"
import { Subtitle } from "../components/Subtitle";
import { TaskListItem } from "../components/TaskList/TaskListItem";
import { TopBar } from "../components/TopBar";
import { useStats } from "../hooks/stats/useStats"

export const SummaryView = () => {
  const { 
    tasksDoneInTheLast3Weeks
  } = useStats();
  
  return (
    <Flex h="96vh">
      <Sidebar />
      <Flex
        gap="20px"
        flexDir="column"
        padding="20px"
        w="100vw"
        h="100vh"
      >
        <TopBar />
        <Card flexDirection="column" flex="1" p="20px" overflowY="auto" maxH="85vh">
          <Accordion allowToggle>
            {Object.keys(tasksDoneInTheLast3Weeks).map((weekFirstDay) => (
              <Box mb="4" key={weekFirstDay}>
                <Subtitle mb="4">
                  Week of {dayjs(weekFirstDay).format('DD/MM/YYYY')} ({tasksDoneInTheLast3Weeks[weekFirstDay].length} tasks)
                </Subtitle>
                {tasksDoneInTheLast3Weeks[weekFirstDay].map((task) => (
                  <TaskListItem key={task.id} item={task} />
                ))}
              </Box>
            ))}
          </Accordion>
        </Card>
      </Flex>
      
    </Flex>
  )
}