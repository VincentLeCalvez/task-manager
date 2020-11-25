<template>
  <div class="home">
    <h1 class="title is-1">
      Projects overview
    </h1>
    <div v-if="loading">
      Loading projects from server
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else class="card-wrapper">
      <div v-for="project in projects" :key="project._id" class="card">
        <div class="card-content">
          {{ project.name }}
        </div>
        <div class="card-footer">
          <NuxtLink :to="getProjectLink(project._id)" class="card-footer-item">
            Edit
          </NuxtLink>
          <div class="card-footer-item" @click="removeProject(project._id)">
            Delete
          </div>
        </div>
      </div>
    </div>
    <b-button v-if="!isFormOpen" class="open-form-button" @click="showProjectForm">
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

    function getProjectLink (id: string) {
      return 'project/' + id
    }

    fetchProjects()

    return {
      projects: getProjects,
      loading: isLoading,
      error: isError,
      isFormOpen: isFormOpen.value,
      showProjectForm: toggleForm,
      showForm: isFormOpen,
      removeProject,
      getProjectLink
    }
  }
})
</script>

<style>

h1 {
  text-align: center;
}

.card-wrapper {
  width: 100%;
  margin: 0 auto
}

.card {
  width: 20%;
  margin: 10px 20px;
  display: inline-block;
}

.open-form-button {
  margin: 20px
}

</style>
