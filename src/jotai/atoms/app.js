import { atomWithStorage } from "jotai/utils";

export const App = atomWithStorage('app', {
  input: {
    mode: 'add-task',
    value: '',
  },
  summarySettings: {
    unit: 'day',
    amount: 3,
  },
  showCompletedTasks: true,
});