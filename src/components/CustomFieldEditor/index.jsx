import { Box, Flex, IconButton, Select, Tooltip } from "@chakra-ui/react"
import { capitalize } from "lodash"
import { useMemo, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { useApp } from "../../hooks/app/useApp"
import { CustomFieldItem } from "./CustomFieldItem"

export const ENTITY_TYPES = [
  'notes',
  'tasks',
]

export const FIELD_TYPES = [
  'text',
  'select',
  'multi-select',
  'file',
  'markdown',
]

export const CustomFieldEditor = () => {
  const { 
    app: {
      customFields,
    },
    addCustomField,
  } = useApp();

  const [selectedEntityType, setSelectedEntityType] = useState(ENTITY_TYPES[0]);

  const shownCustomFields = useMemo(() => {
    return customFields.filter((item) => item.entityType === selectedEntityType);
  }, [customFields, selectedEntityType]);


  return (
    <Flex flexDir="column" gap="2">
      <Box>
        <Select
          placeholder="Select an entity..."
          value={selectedEntityType}
          onChange={(e) => setSelectedEntityType(e.target.value)}
        >
          {ENTITY_TYPES.map((entityType) => (
            <option key={entityType} value={entityType}>
              {capitalize(entityType)}
            </option>
          ))}
        </Select>
      </Box>
      <Flex gap="2" flexDir="column">
        {shownCustomFields.map(
          (item) => (
            <CustomFieldItem item={item} />
          )
        )}
        <Tooltip label="Add Custom Field">
          <IconButton
            width="100%"
            mt="4"
            icon={<FiPlus />}
            onClick={() => addCustomField({
              name: '',
              type: 'text',
              options: [],
              entityType: selectedEntityType,
            })}
          />
        </Tooltip>
      </Flex>
      <Box>

      </Box>
    </Flex>
  )
}