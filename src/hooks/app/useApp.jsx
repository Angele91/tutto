import { useAtom } from "jotai";
import { App } from "../../jotai/atoms/app";

export const useApp = () => {
  const [app, setApp] = useAtom(App);

  const setInputValue = (newVal) => {
    setApp({ ...app, input: { value: newVal } });
  };

  const setInputMode = (newMode) => {
    setApp({ ...app, input: { mode: newMode } });
  };

  const setShowCompletedTasks = (newVal) => {
    setApp({ ...app, showCompletedTasks: newVal });
  };

  const setSummarySettings = ({ unit, amount }) => {
    setApp({
      ...app,
      summarySettings: { ...app.summarySettings, unit, amount },
    });
  };

  /** This function adds a custom field to the app's custom fields array
    @param {string} name - the name of the custom field
    @param {string} type - the type of the custom field
    @param {Array} options - the options array of the custom field if the type is "select"
    @param {boolean} required - whether the custom field is required
    @param {string} defaultValue - the default value of the custom field
    @param {string} placeholder - the placeholder of the custom field
    @param {string} entityType - the entity type of the custom field
    @returns {void}
  */
  const addCustomField = ({
    name,
    type,
    options,
    required,
    defaultValue,
    placeholder,
    entityType,
  }) => {
    setApp({
      ...app,
      customFields: [
        ...(app.customFields || []),
        {
          id: Math.random().toString(36).substring(2, 9),
          name,
          type,
          options,
          required,
          defaultValue,
          placeholder,
          entityType,
        },
      ],
    });
  };

  const updateCustomField = (fieldId, values) => {
    setApp({
      ...app,
      customFields: app.customFields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...values };
        }
        return field;
      }),
    });
  }

  const deleteCustomField = (fieldId) => {
    setApp({
      ...app,
      customFields: app.customFields.filter((field) => field.id !== fieldId),
    });
  };

  return {
    app: {
      ...app,
      summarySettings: {
        ...app.summarySettings,
        unit: app.summarySettings?.unit || "day",
        amount: app.summarySettings?.amount || 3,
      },
      customFields: [
        ...(app.customFields || []),
      ],
    },
    setApp,
    setInputValue,
    setInputMode,
    setShowCompletedTasks,
    setSummarySettings,
    addCustomField,
    updateCustomField,
    deleteCustomField,
  };
};
