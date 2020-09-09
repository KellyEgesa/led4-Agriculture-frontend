import http from "./httpService";
import { apiUrl } from "./config.json";

export function getUsers() {
  return http.get(apiUrl + "/admin/");
}

export function makeEditor(userId) {
  return http.put(apiUrl + "/admin/editor/" + userId);
}

export function removeEditor(userId) {
  return http.put(apiUrl + "/admin/editorremove/" + userId);
}

export function makeAdmin(userId) {
  return http.put(apiUrl + "/admin/admin/" + userId);
}

export function removeAdmin(userId) {
  return http.put(apiUrl + "/adminremove/" + userId);
}

export function deleteUser(userId) {
  return http.delete(apiUrl + "/admin/", userId);
}
