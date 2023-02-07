import { Input } from "@chakra-ui/react"

export const InputField = ({
  id,
  name,
  value,
  onChange,
}) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}