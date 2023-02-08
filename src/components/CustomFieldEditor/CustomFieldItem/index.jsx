import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { FiFile, FiFileText, FiList, FiPlus, FiTrash } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FIELD_TYPES } from "..";
import { useApp } from "../../../hooks/app/useApp";
import { Subtitle } from "../../Subtitle";

export const CustomFieldItem = ({
  item: { id, name, type, inline, options = [] } = {},
}) => {
  const { updateCustomField, deleteCustomField } = useApp();

  return (
    <Flex
      flexDir="column"
      gap="2"
      padding="4"
      border="1px solid"
      borderColor="gray.500"
      borderRadius="md"
    >
      <Flex gap="2" key={id}>
        <Input
          value={name}
          onChange={(e) => updateCustomField(id, { name: e.target.value })}
          placeholder="Field Name"
        />
        <ButtonGroup isAttached>
          {FIELD_TYPES.map((fieldType) => (
            <Tooltip key={fieldType} label={capitalize(fieldType)}>
              <Button
                onClick={() => updateCustomField(id, { type: fieldType })}
                variant={type === fieldType ? "solid" : "outline"}
              >
                {fieldType === "text" && <FiFile />}
                {fieldType === "select" && <FiList />}
                {fieldType === "multi-select" && <FiList />}
                {fieldType === "file" && <FiFile />}
                {fieldType === "markdown" && <FiFileText />}
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>
        <IconButton icon={<FiTrash />} onClick={() => deleteCustomField(id)} />
      </Flex>
      <Flex flexDir="column" width="full">
        {(type === "select" || type === "multi-select") && (
          <Flex flexDir="column" gap="4" width="full">
            <Subtitle>Options</Subtitle>
            {options.map((option, index) => (
              <FormControl
                key={`${id}-${index}`}
              >
                <InputGroup as={Flex} flexDir="row" gap="2">
                  <Input
                    value={option}
                    placeholder="Option Name"
                    onChange={(e) =>
                      updateCustomField(id, {
                        options: options.map((option, optionIndex) =>
                          optionIndex === index ? e.target.value : option
                        ),
                      })
                    }
                  />
                  <Tooltip label="Delete Option">
                    <IconButton
                      icon={<MdDelete />}
                      variant="ghost"
                      colorScheme="red"
                      onClick={() =>
                        updateCustomField(id, {
                          options: options.filter(
                            (_, optionIndex) => optionIndex !== index
                          ),
                        })
                      }
                    />
                  </Tooltip>
                </InputGroup>
              </FormControl>
            ))}
            <Tooltip label="Add Option">
              <IconButton
                icon={<FiPlus />}
                onClick={() =>
                  updateCustomField(id, {
                    options: [...options, ""],
                  })
                }
              />
            </Tooltip>
          </Flex>
        )}
        <FormControl mt="8">
          <FormLabel>
            Show inline
          </FormLabel>
          <Switch 
            isChecked={inline}
            onChange={(e) => updateCustomField(id, { inline: e.target.checked })}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};
