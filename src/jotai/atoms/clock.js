import { atomWithImmer } from "jotai-immer";

export const Clock = atomWithImmer({
  currentTick: 0,
})