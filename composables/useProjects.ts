import { AxiosResponse } from 'axios'
import { ref, computed, reactive } from '@nuxtjs/composition-api'
import { Project } from '@/models/Project'
import { search, searchOne, post, removeOne } from '@/utils/crud'

import { DialogProgrammatic as Dialog } from 'buefy'

const projects = ref<Project[]>([])
const project = ref({})

export default function useProjects () {
  const collection = 'projects'

  const state = reactive({
    loading: false,
    isFormOpen: false,
    error: undefined
  })

  const toggleForm = () => {
    state.isFormOpen = !state.isFormOpen
  }

  const fetchProjects = () => {
    state.loading = true
    search(collection).then((res: AxiosResponse) => {
      projects.value = res.data.data
      state.loading = false
    })
  }

  const getProject = (id: string | string[]) => {
    state.loading = true
    searchOne(collection, id).then((res: AxiosResponse) => {
      project.value = res.data.data
      state.loading = false
    })
  }

  const removeProject = (id: string) => {
    state.loading = true
    Dialog.confirm({
      message: 'Vraiment',
      onConfirm: async () => {
        const res = await removeOne(collection, id)
        projects.value = projects.value.filter(p => p._id !== res.data.data._id)
        state.loading = false
      }
    })
  }

  const postProject = async (params: {}) => {
    const res = await post(collection, params)
    projects.value.push(res.data.data)
  }

  const getProjects = computed(() => projects.value)
  const selectedProject = computed(() => project.value)
  const isLoading = computed(() => state.loading)
  const isError = computed(() => state.error)
  const isFormOpen = computed(() => state.isFormOpen)

  return {
    isFormOpen,
    getProjects,
    selectedProject,
    isLoading,
    isError,
    toggleForm,
    fetchProjects,
    getProject,
    removeProject,
    postProject
  }
}
