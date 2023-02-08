import { FormControl, FormLabel } from "@chakra-ui/react";
import { useMemo } from "react";
import { useCustomField } from "../../hooks/app/useCustomField"
import { useEntity } from "../../hooks/app/useEntity";
import { InputField } from "./types/InputField";
import { MarkdownField } from "./types/MarkdownField";
import { MultiSelectField } from "./types/MultiSelectField";
import { SelectField } from "./types/SelectField";

const components = {
  select: SelectField,
  text: InputField,
  'multi-select': MultiSelectField,
  markdown: MarkdownField,
}

export const CustomField = ({
  entityId,
  fieldId,
  mini,
}) => {
  const {
    id,
    name,
    type,
    options,
    defaultValue,
    entityType,
  } = useCustomField(fieldId);

  const {
    entity,
    doUpdate,
  } = useEntity(entityId, entityType)

  const value = entity?.custom?.[fieldId] || defaultValue;

  const onChange = (evt) => {
    const { value } = evt.target;
    doUpdate({
      custom: {
        [fieldId]: value,
      }
    })
  }

  const Component = useMemo(() => components[type], [type]);

  return (
    <FormControl mr={mini ? '3' : 0}>
      {!mini && (
        <FormLabel>
          {name}
        </FormLabel>
      )}
      {Component && (
        <Component
          id={id}
          name={name}
          options={options}
          value={value}
          onChange={onChange}
          mini={mini}
        />
      )}
    </FormControl>
  )
}