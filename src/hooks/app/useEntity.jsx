import { useNotes } from "../notes/useNotes";
import { useTasks } from "../tasks/useTasks"

export const useEntity = (entityId, entityType) => {
  const {
    tasks: { list: tasks },
    updateTask,
    deleteTask,
  } = useTasks();
  
  const {
    notes: { list: notes },
    updateNote,
    deleteNote,
  } = useNotes();

  const entities = {
    tasks,
    notes,
  }

  const entity = entities[entityType]?.find((item) => item.id === entityId);

  const updateFn = {
    tasks: updateTask,
    notes: updateNote,
  }[entityType];

  const deleteFn = {
    tasks: deleteTask,
    notes: deleteNote,
  }[entityType];

  const doUpdate = (data) => {
    updateFn(entityId, data);
  }

  const doDelete = () => {
    deleteFn(entityId);
  }

  return {
    entity,
    doUpdate,
    doDelete
  };
}