import { Card, Accordion } from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { useApp } from "../../hooks/app/useApp";
import { useTasks } from "../../hooks/tasks/useTasks";
import { Subtitle } from "../Subtitle";
import { TaskListItem } from "./TaskListItem";
import { KeyboardSensor, MouseSensor } from "../../vendor/DndSensors";

export const TaskList = () => {
  const {
    tasks: { list, ...tasks },
    completedTasks,
    nonCompletedTasks,
    setTasks,
  } = useTasks();

  const {
    app: { showCompletedTasks },
  } = useApp();

  const sensors = useSensors(
    useSensor(MouseSensor, {
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
      });
    }
  };

  return (
    <Card flexDirection="column" flex="1" p="20px" overflowY="auto" maxH="85vh">
      <Accordion variant="unstyled" allowToggle>
        {showCompletedTasks && (
          <Subtitle>
            To do
          </Subtitle>
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={list.map((task) => task.id)}
          >
            {nonCompletedTasks.map((task) => (
              <TaskListItem key={task.id} item={task} />
            ))}
          </SortableContext>
        </DndContext>

        {showCompletedTasks && completedTasks.length > 0 && (
          <>
            <Subtitle mt="8">
              Completed
            </Subtitle>
            {completedTasks.map((task) => (
              <TaskListItem key={task.id} item={task} />
            ))}
          </>
        )}
      </Accordion>
    </Card>
  );
};
