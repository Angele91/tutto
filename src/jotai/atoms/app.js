import { atom } from "jotai";

export const App = atom({
  input: {
    mode: 'add-task',
    value: '',
  },
  showCompletedTasks: false,
});