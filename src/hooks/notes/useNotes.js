import { useAtom } from "jotai"
import { Notes } from "../../jotai/atoms/notes";

export const useNotes = () => {
  const [notes, setNotes] = useAtom(Notes);

  const addNote = ({
    title,
    content,
    createdAt = new Date().toISOString(),
  }) => {
    setNotes({
      ...notes,
      list: [
        ...notes.list,
        {
          id: Math.random().toString(36).substring(2, 9),
          title,
          content,
          createdAt,
        },
      ]
    });
  }

  const updateNote = (noteId, note) => {
    setNotes({
      ...notes,
      list: notes.list.map((currNote) => {
        if (currNote.id === noteId) {
          return { ...currNote, ...note };
        }
        return currNote;
      }),
    });
  }

  const deleteNote = (noteId) => {
    setNotes({
      ...notes,
      list: notes.list.filter((currNote) => currNote.id !== noteId),
    });
  }
  
  return {
    addNote,
    updateNote,
    deleteNote,
    notes,
  }
}