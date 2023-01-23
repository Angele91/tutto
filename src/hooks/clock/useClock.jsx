import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Clock } from "../../jotai/atoms/clock";
import { secondsToHoursAndMinutes } from "../../utils/time";
import formatDuration from "format-duration";
import { useTasks } from "../tasks/useTasks";

export const useClock = () => {
  const [clock, setClock] = useAtom(Clock);

  const {
    updateTask,
    selectedTask,
  } = useTasks();

  const startTimer = () => {
    setClock((draft) => {
      draft.currentTick = 0;
      draft.isRunning = true;
    })

    const interval = setInterval(() => {
      setClock((draft) => {
        draft.currentTick += 1;
      })
    }, 1000)

    setClock((draft) => {
      draft.interval = interval;
    })
  }

  const stopTimer = ({ skipAddToHistory } = {}) => {
    setClock((draft) => {
      draft.isRunning = false;
      draft.currentTick = 0;
    })

    clearInterval(clock.interval);

    if (skipAddToHistory) return;
    if (!selectedTask) return;

    updateTask(selectedTask.id, {
      duration: selectedTask.duration + clock.currentTick,
      history: [
        ...selectedTask.history,
        {
          duration: clock.currentTick,
          date: new Date(),
        }
      ]
    })
  }

  const toggleTimer = () => {
    if (clock.isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  const restartTimer = () => {
    stopTimer();
    startTimer();
  }

  const formattedTimer = useMemo(() => secondsToHoursAndMinutes(clock.currentTick || 0), [clock.currentTick])
  const duration = useMemo(() => formatDuration(clock.currentTick * 1000), [clock.currentTick])

  useEffect(() => {
    if (selectedTask) {
      if (clock.isRunning) {
        document.title = `🟢 ${selectedTask.name} - ${duration}`;
      }

      if (!clock.isRunning) {
        document.title = `⏹️ ${selectedTask.name} - ${duration}`;
      }
    }

    if (!selectedTask) {
      document.title = `Tutto`;
    }

  }, [selectedTask, duration, clock.isRunning])


  return {
    clock,
    setClock,
    startTimer,
    stopTimer,
    toggleTimer,
    restartTimer,
    formattedTimer,
    duration,
  }
}