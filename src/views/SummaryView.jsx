import { Accordion, Box, Card, Flex } from "@chakra-ui/react"
import dayjs from "dayjs";
import { useMemo } from "react";
import { Sidebar } from "../components/Sidebar"
import { Subtitle } from "../components/Subtitle";
import { SummaryOptions } from "../components/SummaryOptions";
import { TaskListItem } from "../components/TaskList/TaskListItem";
import { TopBar } from "../components/TopBar";
import { useApp } from "../hooks/app/useApp";
import { useStats } from "../hooks/stats/useStats"

export const SummaryView = () => {
  const { 
    getTasksDoneInTheLastXUnits,
  } = useStats();

  const {
    app: { summarySettings },
  } = useApp();

  const tasks = useMemo(() => {
    return getTasksDoneInTheLastXUnits({
      ...summarySettings,
    })
  }, [summarySettings, getTasksDoneInTheLastXUnits])
  
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
        <SummaryOptions />
        <Card flexDirection="column" flex="1" p="20px" overflowY="auto" maxH="85vh">
          <Accordion allowToggle>
            {Object.keys(tasks).map((firstDay) => (
              <Box mb="4" key={firstDay}>
                <Subtitle mb="4">
                  {dayjs(firstDay).format('dddd, MMMM DD YYYY')} ({tasks[firstDay].length} tasks)
                </Subtitle>
                {tasks[firstDay].map((task) => (
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