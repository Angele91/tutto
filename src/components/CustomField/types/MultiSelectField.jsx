import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import ReactSelect from "react-select"
import { topBarStylingProps } from "../../TopBar"

export const MultiSelectField = ({
  id,
  options,
  value,
  onChange,
  name,
  mini,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const getComponent = () => (
    <ReactSelect
      isMulti
      id={id}
      onChange={(newVal) => {
        onChange({
          target: {
            value: newVal.map((item) => item.value),
          }
        })
      }}
      value={
        options
          .filter((item) => value?.includes(item))
          .map(item => ({
            value: item,
            label: item,
          }))
      }
      options={
        options.map((item) => ({
          value: item,
          label: item,
        }))
      }

      {...topBarStylingProps}
    />
  )

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
    getComponent()
  )
}