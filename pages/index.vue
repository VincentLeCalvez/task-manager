<template>
  <div class="home">
    <h1>projects overview</h1>
    <div v-if="loading">
      Loading projects from server
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-for="project in projects" :key="project._id" class="card">
        <NuxtLink :to="getProjectLink(project._id)">
          <div class="project-card">
            {{ project.name }}
          </div>
        </NuxtLink>
        <div @click="removeProject(project._id)">
          X
        </div>
      </div>
    </div>
    <b-button @click="showProjectForm">
      New Project
    </b-button>
    <div v-if="showForm">
      <ProjectForm />
    </div>
  </div> 
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useProjects from '~/composables/useProjects'

export default defineComponent({
  setup () {
    const { getProjects, isLoading, isError, fetchProjects, isFormOpen, toggleForm, removeProject } = useProjects()

    function getProjectLink(id: string) {
      return 'project/' + id
    }

    fetchProjects()

    return {
      projects: getProjects,
      loading: isLoading,
      error: isError,
      showProjectForm: toggleForm,
      showForm: isFormOpen,
      removeProject,
      getProjectLink
    }
  }
})
</script>

<style>
</style>
