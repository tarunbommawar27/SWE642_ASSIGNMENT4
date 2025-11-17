<!--
  Surveys List component displaying all submitted surveys in a table with edit and delete functionality.
-->
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const surveys = ref([])
const loading = ref(true)
const error = ref('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get('/surveys')
    surveys.value = data
  } catch (e) {
    error.value = 'Failed to load surveys.'
  } finally {
    loading.value = false
  }
}

const edit = (id) => router.push(`/survey/${id}`)

const removeSurvey = async (id) => {
  if (!confirm('Delete this survey?')) return
  await api.delete(`/surveys/${id}`)
  await load()
}

onMounted(load)
</script>

<template>
  <h2>All Surveys</h2>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error" class="text-danger">{{ error }}</div>

  <table v-else-if="surveys.length" class="table table-striped">
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Email</th><th>Date</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in surveys" :key="s.id">
        <td>{{ s.id }}</td>
        <td>{{ s.firstName }} {{ s.lastName }}</td>
        <td>{{ s.email }}</td>
        <td>{{ s.dateOfSurvey }}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" @click="edit(s.id)">Edit</button>
          <button class="btn btn-sm btn-danger" @click="removeSurvey(s.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-else class="text-muted">No surveys yet.</div>
</template>
