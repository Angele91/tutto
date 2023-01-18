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
    setTasks({
      ...tasks,
      selectedTaskId: autoSelect ? tasks.list.length + 1 : tasks.selectedTaskId,
      list: [
        ...tasks.list,
        {
          id: tasks.list.length + 1,
          name: newTask,
          description: newTaskDescription,
          history: [],
        }
      ]
    })

    return tasks.list.length + 1;
  }

  const updateTask = (taskId, updatedTask) => {
    setTasks({
      ...tasks,
      list: tasks.list.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }
        return task;
      }),
    })
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

  return {
    addTask,
    updateTask,
    deleteTask,
    setSelectedTask,
    selectedTask,
    tasks,
    setTasks,
  }
}