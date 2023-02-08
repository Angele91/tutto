import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { useApp } from "../../hooks/app/useApp";
import { useNotes } from "../../hooks/notes/useNotes";
import { CustomField } from "../CustomField";

export const NoteModal = ({ note, onClose, isOpen }) => {
  const { updateNote } = useNotes();
  const {
    app: { customFields },
  } = useApp();

  if (!note) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent minWidth="70vw" minH="70vh">
        <ModalHeader>
          <Editable defaultValue={note.title}>
            <EditablePreview />
            <EditableInput
              onChange={(evt) =>
                updateNote(note.id, { title: evt.target.value })
              }
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
          <Flex mt="6" mb="2" flexDir="column">
            {customFields.filter(field => field.entityType === 'notes').map((field) => (
              <CustomField
                key={field.id}
                entityId={note.id}
                fieldId={field.id}
              />
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text>
            Created At: {dayjs(note.createdAt).format("DD/MM/YYYY HH:mm")}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
