import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const useRouteQuery = (key?: string) => {
  const route = useRoute()
  const router = useRouter()

  if (key) {
    return computed({
      get: () => {
        return route.query[key]
      },
      set: val => {
        router.replace({ query: { ...route.query, [key]: val } })
      }
    })
  } else {
    return computed<any>({
      get: () => {
        return route.query
      },
      set: val => {
        router.replace({ query: { ...route.query, ...val } })
      }
    })
  }
}

export default useRouteQuery
