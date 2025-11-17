/**
 * Axios instance configured to communicate with the Spring Boot REST API backend.
 */
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export default api
