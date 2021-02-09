import http from "./httpService";
import { apiUrl } from "./config.json";

export function loginUser(user) {
  return http.post(apiUrl + "/user/", user);
}

export function saveUser(user) {
  return http.post(apiUrl + "/user/add/", user);
}

export function reachUser(userId, user) {
  return http.post(apiUrl + "/user/module/" + userId, user);
}

export function userModule(userId) {
  return http.get(apiUrl + "/user/module/" + userId);
}

export function pageUser(userId, user) {
  return http.put(apiUrl + "/user/module/page/" + userId, user);
}

export function markUser(userId, user) {
  return http.put(apiUrl + "/user/module/mark/" + userId, user);
}

export function resetLink(user) {
  return http.post(apiUrl + "/user/forgotPassword/", user);
}

export function changePassword(user) {
  return http.put(apiUrl + "/user/updatePasswordViaEmail", user);
}

export function confirmUser(user) {
  return http.put(apiUrl + "/user/confirmed/" + user, user);
}
