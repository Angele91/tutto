import dayjs from "dayjs";
import formatDuration from "format-duration";
import { times } from "lodash";
import { useCallback } from "react";
import { useMemo } from "react";
import { useTasks } from "../tasks/useTasks";

export const useStats = () => {
  const { tasks } = useTasks();

  const allHistory = useMemo(() => {
    return tasks.list.reduce((acc, task) => {
      return [...acc, ...task.history];
    }, []);
  }, [tasks.list]);

  const totalTimeByUnitAndDate = ({ unit, history, date }) => {
    const historyItemsThisUnit = history.filter((historyItem) => {
      return dayjs(historyItem.date).isSame(date, unit);
    });

    return historyItemsThisUnit.reduce((acc, historyItem) => {
      return acc + historyItem.duration;
    }, 0);
  };

  const totalTimeThisMonth = useMemo(() => {
    const totalTimeThisMonth = totalTimeByUnitAndDate({
      unit: "month",
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeThisMonth * 1000);
  }, [allHistory]);

  const totalTimeThisWeek = useMemo(() => {
    const totalTimeThisWeek = totalTimeByUnitAndDate({
      unit: "week",
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeThisWeek * 1000);
  }, [allHistory]);

  const totalTimeToday = useMemo(() => {
    const totalTimeToday = totalTimeByUnitAndDate({
      unit: "day",
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeToday * 1000);
  }, [allHistory]);

  const tasksDoneByUnitAndDate = useCallback(
    ({ unit, date }) => {
      return tasks.list
        .filter((task) => {
          return task.history.some((historyItem) => {
            return dayjs(historyItem.date).isSame(date, unit);
          });
        })
        .map((task) => ({
          ...task,
          history: task.history.filter((historyItem) => {
            return dayjs(historyItem.date).isSame(date, unit);
          }),
        }));
    },
    [tasks.list]
  );

  const getTasksDoneInTheLastXUnits = useCallback(
    ({ unit, amount }) => {
      return times(amount).reduce((prev, curr) => {
        const date = dayjs().startOf(unit).subtract(curr, unit);
        const tasksDoneThisUnit = tasksDoneByUnitAndDate({ unit, date });

        if (tasksDoneThisUnit?.length === 0) return prev;

        return {
          ...prev,
          [date.format("YYYY-MM-DD")]: tasksDoneThisUnit,
        };
      }, {});
    },
    [tasksDoneByUnitAndDate]
  );

  return {
    totalTimeThisMonth,
    totalTimeThisWeek,
    totalTimeToday,
    getTasksDoneInTheLastXUnits,
  };
};
