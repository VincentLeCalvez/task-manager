<template>
  <div>
    <form @submit.prevent="createNewProject">
      <label for="name">Nom du projet</label>
      <input v-model="name" type="text">
      <label for="description">Description du projet</label>
      <input v-model="description" type="text">
      <button type="submit">
        Valider
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import useProjects from '../composables/useProjects'

export default defineComponent({
  setup () {
    const state = reactive({
      name: '',
      description: ''
    })

    const { postProject } = useProjects()

    function createNewProject () {
      postProject({ name: state.name, description: state.description })
      state.name = ''
      state.description = ''
    }

    return {
      ...toRefs(state),
      createNewProject
    }
  }
})
</script>
