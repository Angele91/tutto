import { atomWithStorage } from "jotai/utils";

export const App = atomWithStorage('app', {
  input: {
    mode: 'add-task',
    value: '',
  },
  showCompletedTasks: true,
});