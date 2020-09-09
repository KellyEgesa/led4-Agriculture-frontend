import http from "./httpService";
import { apiUrl } from "./config.json";

export function getQuestion() {
  return http.get(apiUrl + "/questions/");
}

export function saveQuestion(question) {
  return http.post(apiUrl + "/questions/", question);
}

export function deleteQuestion(questionId) {
  return http.delete(apiUrl + "/questions/" + questionId);
}
