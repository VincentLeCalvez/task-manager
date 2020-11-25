<template>
  <div>
    <form @submit.prevent="createNewProject">
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

<style scoped>
  form {
    width: 45%;
    margin: 30px auto;
  }
</style>
