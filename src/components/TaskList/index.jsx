import { Card, Accordion } from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTasks } from "../../hooks/tasks/useTasks";
import { TaskListItem } from "./TaskListItem";

export const TaskList = () => {
  const {
    tasks: { list, ...tasks },
    setTasks,
  } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const currentTasks = [...list];
      const oldIndex = currentTasks.findIndex((task) => task.id === active.id);
      const newIndex = currentTasks.findIndex((task) => task.id === over.id);

      setTasks({
        ...tasks,
        list: arrayMove(currentTasks, oldIndex, newIndex),
      })
    }
  }

  return (
    <Card flexDirection="column" flex="1" p="20px">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Accordion variant="unstyled" allowToggle>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={list.map((task) => task.id)}
          >
            {list.map((task) => (
              <TaskListItem key={task.id} item={task} />
            ))}
          </SortableContext>
        </Accordion>
      </DndContext>
    </Card>
  );
};
