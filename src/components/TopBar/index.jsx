import { Card, Flex, Input, InputGroup } from "@chakra-ui/react"
import { Chronometer } from "../Chronometer"
import { ActionButton } from "../ActionButton"

export const TopBar = () => {
  return (
    <Card
      p="8px"
      h="70px"
      alignItems="center"
      flexDirection="row"
      width="full"
      gap="15px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      as={Flex}
    >
      <InputGroup>
        <Input placeholder="Write a task here..." />
      </InputGroup>
      <Chronometer />
      <ActionButton />
    </Card>
  )
}