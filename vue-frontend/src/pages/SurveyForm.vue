<!--
  Survey Form component for creating and editing student surveys with validation and REST API integration.
-->
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

// Same options as Angular version
const LIKED_OPTIONS = ['students','location','campus','atmosphere','dorm rooms','sports']

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id ? Number(route.params.id) : undefined)

const form = reactive({
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  telephone: '',
  email: '',
  dateOfSurvey: '',
  likedMost: [],
  interestSource: 'INTERNET',
  recommendLikelihood: 'VERY_LIKELY',
  comments: ''
})

const loading = ref(false)
const error = ref('')

const isChecked = (opt) => form.likedMost.includes(opt)
const toggleLiked = (opt, checked) => {
  const idx = form.likedMost.indexOf(opt)
  if (checked && idx === -1) form.likedMost.push(opt)
  if (!checked && idx > -1) form.likedMost.splice(idx, 1)
}

const loadIfEdit = async () => {
  if (!id.value) return
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/surveys/${id.value}`)
    Object.assign(form, data)
  } catch (e) {
    error.value = 'Failed to load survey.'
  } finally {
    loading.value = false
  }
}

const valid = () => {
  const req = ['firstName','lastName','streetAddress','city','state','zip','telephone','email','dateOfSurvey']
  if (!req.every(k => String(form[k]).trim().length > 0)) {
    return 'Please fill all required fields.'
  }

  // Validate zip (must be exactly 5 digits)
  if (!/^\d{5}$/.test(form.zip)) {
    return 'ZIP code must be exactly 5 digits.'
  }

  // Validate phone (must be at least 10 digits/chars)
  if (form.telephone.replace(/[^\d]/g, '').length < 10) {
    return 'Phone number must contain at least 10 digits.'
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return 'Please enter a valid email address.'
  }

  return null
}

const submit = async () => {
  const validationError = valid()
  if (validationError) {
    alert(validationError)
    return
  }

  try {
    if (id.value) {
      await api.put(`/surveys/${id.value}`, form)
    } else {
      await api.post('/surveys', form)
    }
    router.push('/surveys')
  } catch (e) {
    // Show specific error message from backend if available
    const errorMsg = e.response?.data?.message
      || e.response?.data?.error
      || (e.response?.data && typeof e.response.data === 'string' ? e.response.data : null)
      || `Save failed: ${e.message}`
    alert(errorMsg)
    console.error('Save error:', e.response || e)
  }
}

const cancel = () => router.push('/')

onMounted(loadIfEdit)
</script>

<template>
  <h2>{{ id ? 'Edit Survey' : 'Student Survey' }}</h2>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error" class="text-danger">{{ error }}</div>

  <form v-else @submit.prevent="submit" novalidate>
    <div class="row">
      <div class="col-md-6 mb-2">
        <label>First Name*</label>
        <input class="form-control" v-model="form.firstName">
      </div>
      <div class="col-md-6 mb-2">
        <label>Last Name*</label>
        <input class="form-control" v-model="form.lastName">
      </div>
    </div>

    <label>Street Address*</label>
    <input class="form-control mb-2" v-model="form.streetAddress">

    <div class="row">
      <div class="col-md-4 mb-2">
        <label>City*</label>
        <input class="form-control" v-model="form.city">
      </div>
      <div class="col-md-4 mb-2">
        <label>State*</label>
        <input class="form-control" v-model="form.state">
      </div>
      <div class="col-md-4 mb-2">
        <label>Zip*</label>
        <input class="form-control" v-model="form.zip" pattern="\d{5}" maxlength="5" placeholder="12345">
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-2">
        <label>Telephone*</label>
        <input class="form-control" v-model="form.telephone" type="tel" placeholder="123-456-7890 or (123) 456-7890">
      </div>
      <div class="col-md-6 mb-2">
        <label>Email*</label>
        <input class="form-control" v-model="form.email" type="email" placeholder="example@email.com">
      </div>
    </div>

    <div class="mb-2">
      <label>Date of Survey*</label>
      <input class="form-control" type="date" v-model="form.dateOfSurvey">
    </div>

    <fieldset class="mb-2">
      <legend class="h6">What did you like most?</legend>
      <div class="form-check form-check-inline" v-for="opt in LIKED_OPTIONS" :key="opt">
        <input
          class="form-check-input"
          type="checkbox"
          :id="opt"
          :checked="isChecked(opt)"
          @change="toggleLiked(opt, $event.target.checked)" />
        <label class="form-check-label" :for="opt">{{ opt }}</label>
      </div>
    </fieldset>

    <div class="mb-2">
      <label class="me-3">How did you become interested?</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="friends" value="FRIENDS" v-model="form.interestSource">
        <label class="form-check-label" for="friends">Friends</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="tv" value="TELEVISION" v-model="form.interestSource">
        <label class="form-check-label" for="tv">Television</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="internet" value="INTERNET" v-model="form.interestSource">
        <label class="form-check-label" for="internet">Internet</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="other" value="OTHER" v-model="form.interestSource">
        <label class="form-check-label" for="other">Other</label>
      </div>
    </div>

    <div class="mb-2">
      <label>Likelihood to recommend</label>
      <select class="form-select" v-model="form.recommendLikelihood">
        <option value="VERY_LIKELY">Very Likely</option>
        <option value="LIKELY">Likely</option>
        <option value="UNLIKELY">Unlikely</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Additional comments</label>
      <textarea class="form-control" rows="3" v-model="form.comments"></textarea>
    </div>

    <button class="btn btn-success me-2" type="submit">Submit</button>
    <button class="btn btn-secondary" type="button" @click="cancel">Cancel</button>
  </form>
</template>

<script>
export default {
  name: 'SurveyForm',
  data() {
    return { LIKED_OPTIONS: ['students','location','campus','atmosphere','dorm rooms','sports'] }
  }
}
</script>
