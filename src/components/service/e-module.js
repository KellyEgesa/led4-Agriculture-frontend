import http from "./httpService";
import { apiUrl } from "./config.json";

export function loadEModule() {
  return http.get(apiUrl + "/emodule/");
}

export function loadEModuleId(moduleId) {
  return http.get(apiUrl + "/emodule/" + moduleId);
}
