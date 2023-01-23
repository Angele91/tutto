import { atomWithStorage } from "jotai/utils";

export const Notes = atomWithStorage('notes', {
  list: [],
});