<template>
  <div class="project">
    This is a specific project page
    <div>{{ project.name }}</div>
    <div>{{ project.description }}</div>
    <div v-for="task in tasks" :key="task._id">
      {{ task.name }} {{ task.status }}
      <div @click="switchTask(task._id)">
        0
      </div>
      <div @click="removeTask(task._id)">
        X
      </div>
    </div>

    <form @submit.prevent="createNewTask()">
      <label for="name">Nom de la tâche</label>
      <input v-model="name" type="text">
      <label for="description">Description de la tâche</label>
      <input v-model="description" type="text">
      <b-button native-type="submit">
        Valider
      </b-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import useProjects from '@/composables/useProjects'
import useTasks from '@/composables/useTasks'

export default defineComponent({
  setup (props, { root }) {
    const state = reactive({
      name: '',
      description: ''
    })
    const route = root.$route
    const { getProject, selectedProject } = useProjects()
    const { getTasks, fetchTasks, removeTask, postTask, updateTask } = useTasks()

    function createNewTask () {
      postTask({ name: state.name, description: state.description, status: 'todo', projectId: route.params.id })
      state.name = ''
      state.description = ''
    }

    // find better name
    const switchTask = (id: string) => {
      updateTask(id, { status: 'done' })
    }

    getProject(route.params.id)

    fetchTasks(route.params.id)

    return {
      ...toRefs(state),
      project: selectedProject,
      tasks: getTasks,
      removeTask,
      createNewTask,
      switchTask
    }
  }
})
</script>

<style scoped>

</style>
