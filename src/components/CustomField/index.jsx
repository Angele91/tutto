import { useCustomField } from "../../hooks/app/useCustomField"
import { useEntity } from "../../hooks/app/useEntity";
import { SelectField } from "./types/SelectField";

const components = {
  select: SelectField,
}

export const CustomField = ({
  entityId,
  fieldId
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

  const Component = components[type];

  return (
    <Component
      id={id}
      name={name}
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}