import { Select } from "@chakra-ui/react"

export const SelectField = ({
  id,
  options,
  value,
  onChange,
  mini,
}) => {

  return (
    <Select
      id={id}
      name={id}
      value={value ?? options[0] ?? ''}
      onChange={onChange}
      size={mini ? 'xs' : 'md'}
      onFocus={(evt) => evt.stopPropagation()}
      onClick={(evt) => evt.stopPropagation()}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}