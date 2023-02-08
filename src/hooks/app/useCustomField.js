import { useApp } from "./useApp"

export const useCustomField = (fieldId) => {
  const {
    app: { customFields }
  } = useApp();

  return customFields.find((field) => field.id === fieldId) || {};
}