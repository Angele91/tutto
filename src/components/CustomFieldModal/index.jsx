import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { FiList } from 'react-icons/fi';
import { CustomFieldEditor } from '../CustomFieldEditor'

export const CustomFieldModal = () => {
  const {
    onOpen,
    isOpen,
    onClose,
  } = useDisclosure();

  return (
    <>
      <Tooltip label="Custom Fields">
        <IconButton
          icon={<FiList />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Custom Fields
          </ModalHeader>
          <ModalBody maxH="80vh" overflowY="auto">
            <CustomFieldEditor />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}