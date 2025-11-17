/**
 * Service layer for Survey API calls, providing methods for list, get, create, update, and delete operations.
 */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/surveys",
});

export default {
  list() { return api.get("/"); },
  get(id) { return api.get("/" + id); },
  create(data) { return api.post("/", data); },
  update(id, data) { return api.put("/" + id, data); },
  remove(id) { return api.delete("/" + id); },
};
