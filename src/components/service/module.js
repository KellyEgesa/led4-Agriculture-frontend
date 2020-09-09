import http from "./httpService";
import { apiUrl } from "./config.json";

export function loadModule() {
  return http.get(apiUrl + "/module/");
}

export function loadModuleId(moduleId) {
  return http.get(apiUrl + "/module/" + moduleId);
}

// export function saveTest(test) {
//   return http.post(apiUrl + "/test/", test);
// }

// // export function changeTopic(topicId) {
// //   return http.put(apiUrl + "/user/", userId);
// // }

// export function deleteTest(testId) {
//   return http.delete(apiUrl + "/test/" + testId);
// }
