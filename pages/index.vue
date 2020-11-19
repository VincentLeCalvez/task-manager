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
      <div class='card' v-for="project in projects" :key="project._id">
        <NuxtLink :to="{name: 'project', id: project._id}">
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
  setup (s) {
    const { getProjects, isLoading, isError, fetchProjects, isFormOpen, toggleForm, removeProject } = useProjects()

    fetchProjects()

    return {
      projects: getProjects,
      loading: isLoading,
      error: isError,
      showProjectForm: toggleForm,
      showForm: isFormOpen,
      removeProject
    }
  }
})
</script>

<style>
</style>
