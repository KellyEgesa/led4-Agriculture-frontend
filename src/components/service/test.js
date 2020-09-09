import http from "./httpService";
import { apiUrl } from "./config.json";

export function getTest() {
  return http.get(apiUrl + "/test/");
}

export function getTestId(testId) {
  return http.get(apiUrl + "/test/" + testId);
}

export function getAnswerId(testId) {
  return http.get(apiUrl + "/test/mark/" + testId);
}

export function saveTest(test) {
  return http.post(apiUrl + "/test/", test);
}

// export function changeTopic(topicId) {
//   return http.put(apiUrl + "/user/", userId);
// }

export function deleteTest(testId) {
  return http.delete(apiUrl + "/test/" + testId);
}
