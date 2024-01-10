import {
  getLocalStorageVariable,
  removeLocalStorageVariable,
  setLocalStorageVariable,
} from "@/utils/localstorage.util";
import { OLTIN_BALIQ_BOT_TKN } from "@/constants";

export function setToken(token) {
  return setLocalStorageVariable(OLTIN_BALIQ_BOT_TKN, token);
}

export function getToken() {
  return getLocalStorageVariable(OLTIN_BALIQ_BOT_TKN);
}

export function removeToken() {
  return removeLocalStorageVariable(OLTIN_BALIQ_BOT_TKN);
}
