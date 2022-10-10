import { Ref } from 'vue'
import useToggle from './useToggle'

const defaultValue = false

interface Actions {
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

function useBoolean(value?: boolean): [Ref<boolean>, Actions]

function useBoolean(value?: boolean) {
  value = value || defaultValue

  const [state, [toggle]] = useToggle(value, !value)

  const setTrue = () => toggle(true)
  const setFalse = () => toggle(false)

  const actions: Actions = { toggle, setTrue, setFalse }
  return [state, actions]
}

export default useBoolean
