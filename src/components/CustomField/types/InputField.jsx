import { Input } from "@chakra-ui/react"

export const InputField = ({
  id,
  name,
  value,
  onChange,
  mini,
}) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      size={mini ? 'xs' : 'md'}
      placeholder={name}
      onFocus={(evt) => evt.stopPropagation()}
      onClick={(evt) => evt.stopPropagation()}
    />
  )
}