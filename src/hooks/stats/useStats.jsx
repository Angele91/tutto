import dayjs from "dayjs";
import formatDuration from "format-duration";
import { useMemo } from "react"
import { useTasks } from "../tasks/useTasks"

export const useStats = () => {
  const {
    tasks,
  } = useTasks();

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
  }

  const totalTimeThisMonth = useMemo(() => {
    const totalTimeThisMonth = totalTimeByUnitAndDate({
      unit: 'month',
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeThisMonth * 1000);
  }, [allHistory])

  const totalTimeThisWeek = useMemo(() => {
    const totalTimeThisWeek = totalTimeByUnitAndDate({
      unit: 'week',
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeThisWeek * 1000);
  }, [allHistory])


  const totalTimeToday = useMemo(() => {
    const totalTimeToday = totalTimeByUnitAndDate({
      unit: 'day',
      history: allHistory,
      date: new Date(),
    });

    return formatDuration(totalTimeToday * 1000);
  }, [allHistory])

  return {
    totalTimeThisMonth,
    totalTimeThisWeek,
    totalTimeToday,
  }
}