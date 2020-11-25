import { AxiosResponse } from 'axios'
import { ref, computed, reactive } from '@nuxtjs/composition-api'
import { Task } from '@/models/Task'
import { post, removeOne, updateOne, search } from '@/utils/crud'

const tasks = ref<Task[]>([])

export default function useTasks () {
  const collection = 'tasks'

  const state = reactive({
    loading: false,
    error: undefined
  })

  const fetchTasks = (projectId: string | string[]) => {
    state.loading = true
    search(collection, { projectId }).then((res: AxiosResponse) => {
      console.log(res)
      tasks.value = res.data.data
      state.loading = false
    })
  }

  // not updating projects value directly
  const removeTask = async (id: string) => {
    state.loading = true
    const res = await removeOne(collection, id)
    tasks.value = tasks.value.filter(t => t._id !== res.data.data._id)
    state.loading = false
  }

  const getTasks = computed(() => tasks.value)
  const isLoading = computed(() => state.loading)
  const isError = computed(() => state.error)

  const postTask = async (params: {}) => {
    const res = await post(collection, params)
    tasks.value.push(res.data.data)
  }

  const updateTask = async (id: string, params: {}) => {
    const res = await updateOne(collection, id, params)
    const idx = tasks.value.findIndex(t => t._id === res.data.data._id)
    tasks.value[idx] = res.data
  }

  return {
    getTasks,
    isLoading,
    isError,
    fetchTasks,
    removeTask,
    postTask,
    updateTask
  }
}
