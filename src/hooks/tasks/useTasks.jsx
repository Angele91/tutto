import { useAtom } from "jotai"
import { useMemo } from "react";
import { Tasks } from "../../jotai/atoms/tasks"

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(Tasks);

  const addTask = ({
    newTask,
    newTaskDescription = '',
    autoSelect = true,
  }) => {
    const newTaskId = Math.random().toString(36).substring(2, 9);

    setTasks({
      ...tasks,
      selectedTaskId: autoSelect ? newTaskId : tasks.selectedTaskId,
      list: [
        ...tasks.list,
        {
          id: newTaskId,
          name: newTask,
          description: newTaskDescription,
          history: [],
        }
      ]
    })

    return newTaskId;
  }

  const updateTask = (taskId, updatedTask, options = {}) => {
    const { clearSelectedTask } = options;
    
    setTasks((prevTasks) => ({
      ...prevTasks,
      selectedTaskId: clearSelectedTask ? undefined : prevTasks.selectedTaskId,
      list: prevTasks.list.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }
        return task;
      }),
    }))
  }

  const deleteTask = (taskId) => {
    setTasks({
      ...tasks,
      selectedTaskId: undefined,
      list: tasks.list.filter((task) => task.id !== taskId),
    })
  }

  const setSelectedTask = (taskId) => {
    if (taskId === undefined) {
      return setTasks({
        ...tasks,
        selectedTaskId: undefined,
        list: tasks.list.map((task) => ({ ...task, selected: false })),
      })
    }

    const updatedList = tasks.list.map((task) => {
      if (task.id === taskId) {
        return { ...task, selected: true };
      }
      return { ...task, selected: false };
    })

    setTasks({
      ...tasks,
      selectedTaskId: taskId,
      list: updatedList,
    })
  }

  const selectedTask = useMemo(() => {
    return tasks.list.find((task) => task.id === tasks.selectedTaskId) ?? undefined;
  }, [tasks.list, tasks.selectedTaskId]);

  const nonCompletedTasks = useMemo(() => {
    return tasks.list.filter((task) => !task.isCompleted);
  }, [tasks.list]);

  const completedTasks = useMemo(() => {
    return tasks.list.filter((task) => task.isCompleted);
  }, [tasks.list]);

  return {
    addTask,
    updateTask,
    deleteTask,
    setSelectedTask,
    selectedTask,
    tasks,
    setTasks,
    completedTasks,
    nonCompletedTasks,
  }
}