import {
  Card,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { useApp } from "../../hooks/app/useApp";
import { useStats } from "../../hooks/stats/useStats";

export const MainOptions = () => {
  const {
    app: { showCompletedTasks },
    setShowCompletedTasks,
  } = useApp();

  const {
    totalTimeThisMonth,
    totalTimeThisWeek,
    totalTimeToday,
  } = useStats();

  return (
    <Card as={Flex} justifyContent="space-between" flexDir="row" padding="16px">
      <Flex>
        <Flex
          px="8px"
          borderRight="1px solid"
          borderRightColor="gray.200"
        >
          <strong>Month</strong>
          <Text ml="8px">{totalTimeThisMonth}</Text>
        </Flex>
        <Flex
          px="8px"
          borderRight="1px solid"
          borderRightColor="gray.200"
        >
          <strong>Week</strong>
          <Text ml="8px">{totalTimeThisWeek}</Text>
        </Flex>
        <Flex
          px="8px"
        >
          <strong>Day</strong>
          <Text ml="8px">{totalTimeToday}</Text>
        </Flex>
      </Flex>
      <Flex>
        <Tooltip label="Show completed tasks">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="show-completed-tasks" mb="0">
              <FiEye />
            </FormLabel>
            <Switch
              value={showCompletedTasks}
              onChange={(evt) => setShowCompletedTasks(evt.target.checked)}
              id="show-completed-tasks"
              colorScheme="green"
            />
          </FormControl>
        </Tooltip>
      </Flex>
    </Card>
  );
};
