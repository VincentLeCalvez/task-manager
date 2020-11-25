<template>
  <div class="project">
    <div class="title">
      {{ project.name }}
    </div>
    <div class="subtitle">
      {{ project.description }}
    </div>
    <div class="card-wrapper">
      <div v-for="task in tasks" :key="task._id" class="card">
        <div class="card-content">
          <div class="title is-4">
            {{ task.name }}
          </div>
        </div>
        <div class="card-footer">
          <b-switch v-model="task.status" class="card-footer-item" @change.native="switchTask(task._id, task.status)">
            <div v-if="task.status">
              DONE
            </div>
            <div v-else>
              TODO
            </div>
          </b-switch>
          <a href="#" class="card-footer-item" @click="removeTask(task._id, !task.status)">
            Delete
          </a>
        </div>
      </div>
    </div>
    <form @submit.prevent="createNewTask">
      <b-field label="Nom">
        <b-input v-model="name" type="text" />
      </b-field>
      <b-field label="Decription" type="textarea">
        <b-input v-model="description" type="text" />
      </b-field>
      <b-button
        tag="input"
        native-type="submit"
        value="Créer"
      />
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
      postTask({ name: state.name, description: state.description, status: false, projectId: route.params.id })
      state.name = ''
      state.description = ''
    }

    // find better name
    const switchTask = (id: string, done: boolean) => {
      updateTask(id, { status: done })
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
.card-wrapper {
  width: 100%;
  margin: 0 auto
}

.card {
  width: 20%;
  margin: 10px 20px;
  display: inline-block;
}

  form {
    width: 45%;
    margin: 30px auto;
  }
</style>
