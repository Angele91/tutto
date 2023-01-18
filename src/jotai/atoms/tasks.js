import { atomWithStorage } from "jotai/utils";

export const Tasks = atomWithStorage('tasks', {
  selectedTaskId: null,
  list: [],
})