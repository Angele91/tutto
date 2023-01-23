import { 
  Editable,
  EditableInput,
  EditablePreview,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import MDEditor from "@uiw/react-md-editor"
import dayjs from "dayjs";
import { useNotes } from "../../hooks/notes/useNotes"

export const NoteModal = ({ note, onClose, isOpen }) => {
  const { updateNote } = useNotes();

  if (!note) return null;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent 
        minWidth="70vw"
        minH="70vh"
      >
        <ModalHeader>
          <Editable defaultValue={note.title}>
            <EditablePreview />
            <EditableInput
              onChange={(evt) => updateNote(note.id, { title: evt.target.value })}
              value={note.title}
            />
          </Editable>
        </ModalHeader>
        <ModalBody>
          <MDEditor 
            value={note.body}
            height="60vh"
            onChange={(value) => updateNote(note.id, { body: value })}
          />
        </ModalBody>
        <ModalFooter>
          <Text>
            Created At: {dayjs(note.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}