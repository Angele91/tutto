import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useTasks } from "../../../hooks/tasks/useTasks"

export const CustomFieldsFilterField = ({
  field,
}) => {
  const {
    tasks: {
      tasksFilter,
    },
    updateTasksFilter,
  } = useTasks();

  const handleChange = (event) => {
    updateTasksFilter({
      ...tasksFilter,
      [field.name]: event.target.value,
    })
  }


  return (
    <FormControl key={field.id}>
      <FormLabel>
        {field.name}
      </FormLabel>
      <Input
        value={tasksFilter[field.name]}
        onChange={handleChange}
      />
    </FormControl>
  )
}