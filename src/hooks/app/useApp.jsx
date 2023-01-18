import { useAtom } from "jotai"
import { App } from "../../jotai/atoms/app"

export const useApp = () => {
  const [app, setApp] = useAtom(App);

  const setInputValue = (newVal) => {
    setApp({ ...app, input: { value: newVal } })
  }

  const setInputMode = (newMode) => {
    setApp({ ...app, input: { mode: newMode } })
  }

  return {
    app,
    setApp,
    setInputValue,
    setInputMode,
  }
}