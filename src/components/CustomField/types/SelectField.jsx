import { Select } from "@chakra-ui/react"

export const SelectField = ({
  id,
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}