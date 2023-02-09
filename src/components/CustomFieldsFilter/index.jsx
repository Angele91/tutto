import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useApp } from "../../hooks/app/useApp";
import { useTasks } from "../../hooks/tasks/useTasks";
import { topBarStylingProps } from "../TopBar";

export const CustomFieldsFilter = ({ onClose, isOpen }) => {
  const {
    app: { customFields },
  } = useApp();

  const {
    tasks: { tasksFilter },
    updateTasksFilter,
  } = useTasks();

  const onTasksFilterChange = (evt, field) => {
    updateTasksFilter({
      ...tasksFilter,
      [field.id]: evt.target.value,
    });
  };

  const onClear = () => {
    updateTasksFilter({});
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalBody
          maxH="calc(100vh - 200px)"
          overflowY="auto"
          overflowX="hidden"
        >
          {customFields
            .filter((field) => field.entityType === "tasks")
            .map((field) => (
              <FormControl key={field.id}>
                <FormLabel>{field.name}</FormLabel>
                {(field.type === "text" || field.type === "markdown") && (
                  <Input
                    value={tasksFilter?.[field.id] || ""}
                    placeholder="Filter by text"
                    onChange={(evt) => onTasksFilterChange(evt, field)}
                  />
                )}
                {field.type === "select" ? (
                  <Select
                    value={tasksFilter?.[field.id] || ""}
                    placeholder="Filter by select"
                    onChange={(evt) => onTasksFilterChange(evt, field)}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                ) : null}
                {field.type === "multi-select" ? (
                  <ReactSelect
                    value={tasksFilter?.[field.id] || ""}
                    placeholder="Filter by multi-select"
                    onChange={(evt) => onTasksFilterChange(evt, field)}
                    options={field.options.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    isMulti
                    {...topBarStylingProps}
                  />
                ) : null}
              </FormControl>
            ))}
        </ModalBody>
        <ModalFooter gap="8px">
          <Button
            onClick={onClear}
          >
            Clear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
