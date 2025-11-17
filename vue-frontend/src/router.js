/**
 * Vue Router configuration defining routes for Home, Survey Form, and Surveys List pages.
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import SurveyForm from './pages/SurveyForm.vue'
import SurveysList from './pages/SurveysList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/survey', component: SurveyForm },
  { path: '/survey/:id', component: SurveyForm, props: true },
  { path: '/surveys', component: SurveysList },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
