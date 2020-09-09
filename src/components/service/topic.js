import http from "./httpService";
import { apiUrl } from "./config.json";

export function getTopic() {
  return http.get(apiUrl + "/topic/");
}

export function getModule(topicId) {
  return http.get(apiUrl + "/topic/" + topicId);
}

export function saveTopic(topic) {
  return http.post(apiUrl + "/topic/", topic);
}

export function changeTopic(topicId) {
  return http.put(apiUrl + "/topic/" + topicId);
}

export function deleteTopic(topicId) {
  return http.delete(apiUrl + "/pdf/" + topicId);
}
