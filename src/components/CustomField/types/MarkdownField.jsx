import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import MDEditor from "@uiw/react-md-editor"
import { useState } from "react"

export const MarkdownField = ({
  id,
  name,
  value,
  onChange,
  mini,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const getComponent = () => (
    <MDEditor
      id={id}
      className="markdown-editor"
      placeholder={name}
      value={value}
      onChange={(value) => onChange({ target: { value } })}
    />
  )

  // TODO: Refactor this so we don't repeat this code for every inline field
  if (mini) {
    return (
      <>
        <Button
          size="xs"
          onClick={(evt) => {
            evt.stopPropagation()
            setIsVisible(true)
          }}
        >
          {name}
        </Button>
        <Modal
          isOpen={isVisible}
          onClose={() => setIsVisible(false)}
        >
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>
              {name}
            </ModalHeader>
            <ModalBody px="4" pb="8">
              {getComponent()}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <MDEditor
      id={id}
      className="markdown-editor"
      placeholder={name}
      value={value}
      onChange={(value) => onChange({ target: { value } })}
    />
  )
}