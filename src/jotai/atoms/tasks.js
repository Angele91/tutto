import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";

export const Tasks = withImmer(atomWithStorage('tasks', {
  selectedTaskId: null,
  list: [],
  tasksFilter: {},
}));
