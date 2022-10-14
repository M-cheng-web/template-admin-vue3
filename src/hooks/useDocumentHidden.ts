import { ref, Ref } from 'vue'

const useDocumentHidden = (): Ref<boolean> => {
  const documentHidden = ref<boolean>(document.hidden)
  const handler = () => {
    documentHidden.value = document.hidden
  }
  document.addEventListener('visibilitychange', handler)
  return documentHidden
}

export default useDocumentHidden
