import { useAtom } from "jotai";
import { get, trim } from "lodash";
import { useCallback, useMemo } from "react";
import { Tasks } from "../../jotai/atoms/tasks";
import { useApp } from "../app/useApp";

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(Tasks);
  const {
    app: { customFields },
  } = useApp();

  const addTask = ({ newTask, newTaskDescription = "", autoSelect = true }) => {
    const newTaskId = Math.random().toString(36).substring(2, 9);

    setTasks(draft => {
      draft.selectedTaskId = autoSelect ? newTaskId : draft.selectedTaskId;
      draft.list.push({
        id: newTaskId,
        name: newTask,
        description: newTaskDescription,
        history: [],
        custom: {},
      })
    })

    return newTaskId;
  };

  const updateTask = (taskId, updatedTask, options = {}) => {
    const { clearSelectedTask } = options;

    setTasks(draft => {
      draft.selectedTaskId = clearSelectedTask ? undefined : draft.selectedTaskId;
      draft.list = draft.list.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }
        return task;
      })
    })
  };

  const deleteTask = (taskId) => {
    setTasks(draft => {
      draft.selectedTaskId = taskId === draft.selectedTaskId ? undefined : draft.selectedTaskId;
      draft.list = draft.list.filter((task) => task.id !== taskId);
    })
  };

  const setSelectedTask = (taskId) => {
    if (taskId === undefined) {
      return setTasks(draft => {
        draft.selectedTaskId = undefined;
        draft.list = draft.list.map((task) => ({ ...task, selected: false }));
      })
    }

    const updatedList = tasks.list.map((task) => {
      if (task.id === taskId) {
        return { ...task, selected: true };
      }
      return { ...task, selected: false };
    });

    setTasks(draft => {
      draft.selectedTaskId = taskId;
      draft.list = updatedList;
    })
  };

  const updateTasksFilter = (updatedFilter) => {
    const filterKeys = customFields.map((field) => field.id);

    const emptyFilter = filterKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: "",
      }
    }, {});

    setTasks(draft => {
      draft.tasksFilter = Object.keys(updatedFilter).length === 0 ? emptyFilter : {
        ...draft.tasksFilter,
        ...updatedFilter,
      };
    })
  };

  const openTasksFilter = () => {
    setTasks(draft => {
      draft.isTasksFilterOpen = true;
    })
  };

  const closeTasksFilter = () => {
    setTasks(draft => {
      draft.isTasksFilterOpen = false;
    })
  };

  const applyFilters = useCallback(
    (tasksToBeFiltered) => {
      const { tasksFilter = {} } = tasks;

      if (Object.keys(tasksFilter).length === 0) return tasksToBeFiltered;

      const allFilteredTasks = tasksToBeFiltered.filter((task) => {
        return Object.keys(tasksFilter).every((filterKey) => {
          const filterValue = trim(get(tasksFilter, filterKey, ""));
          if (filterValue === '') return true;

          const taskValue = trim(get(task, `custom.${filterKey}`, ""));
          const customField = customFields.find(
            (customField) => customField.id === filterKey
          );

          const isFirstOption = customField?.options?.[0] === filterValue;

          if ((!taskValue || taskValue === "") && isFirstOption) {
            return true;
          };

          if (customField?.type === "select") {
            return taskValue === filterValue;
          }

          if (customField?.type === "multi-select") {
            return taskValue.includes(filterValue);
          }

          return taskValue.toLowerCase().includes(filterValue.toLowerCase());
        });
      });

      return allFilteredTasks;
    },
    [customFields, tasks]
  );

  const selectedTask = useMemo(() => {
    return (
      tasks.list.find((task) => task.id === tasks.selectedTaskId) ?? undefined
    );
  }, [tasks.list, tasks.selectedTaskId]);

  const nonCompletedTasks = useMemo(() => {
    const filteredTasks = applyFilters(
      tasks.list.filter((task) => !task.isCompleted),
    );
    
    return filteredTasks;
  }, [applyFilters, tasks.list]);

  const completedTasks = useMemo(() => {
    const filteredTasks = applyFilters(
      tasks.list.filter((task) => task.isCompleted),
    );
 
    return filteredTasks; 
  }, [applyFilters, tasks.list]);

  return {
    addTask,
    updateTask,
    deleteTask,
    setSelectedTask,
    updateTasksFilter,
    setTasks,
    openTasksFilter,
    closeTasksFilter,
    selectedTask,
    tasks,
    completedTasks,
    nonCompletedTasks,
  };
};
