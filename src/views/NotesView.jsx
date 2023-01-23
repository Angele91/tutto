import { Card, Flex, useDisclosure } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { Note } from "../components/Note"
import { NoteModal } from "../components/NoteModal"
import { Sidebar } from "../components/Sidebar"
import { TopBar } from "../components/TopBar"
import { useNotes } from "../hooks/notes/useNotes"

export const NotesView = () => {
  const {
    notes: { list },
    addNote,
  } = useNotes();
  
  const {
    onOpen,
    onClose,
    isOpen,
  } = useDisclosure({
    onClose: () => setOpenedNoteId(null),
  });

  const [openedNoteId, setOpenedNoteId] = useState(null);

  const openedNote = useMemo(() => {
    return list.find(item => item.id === openedNoteId);
  }, [list, openedNoteId]);

  return (
    <Flex h="96vh">
      <Sidebar />
      <NoteModal
        isOpen={isOpen}
        onClose={onClose}
        note={openedNote}
      />
      <Flex
        gap="20px"
        flexDir="column"
        padding="20px"
        w="100vw"
        h="100vh"
      >
        <TopBar />
        <Flex
          gap="10px"
          flexWrap="wrap"
          p="4"
          maxHeight="80vh"
          overflowY="auto"
        >
          {list.map(item => (
            <Note 
              item={item}
              onClick={() => {
                setOpenedNoteId(item.id);
                onOpen();
              }}
            />
          ))}
          <Card
            as={Flex}
            w="200px"
            h="144px"
            justifyContent="center"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            userSelect="none"
            cursor="pointer"
            onClick={() => addNote({
              title: 'New note',
              body: '',
            })}
          >
            +
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}