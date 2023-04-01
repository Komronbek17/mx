import {
  getLocalStorageVariable,
  // getLocalStorageVariable,
  removeLocalStorageVariable,
  setLocalStorageVariable,
} from "@/utils/localstorage.util";
import { OLTIN_BALIQ_BOT_TKN } from "@/constants";

export function setToken(token) {
  return setLocalStorageVariable(OLTIN_BALIQ_BOT_TKN, token);
}

export function getToken() {
  // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nb2xkZW5maXNoLjFpdC51elwvdjFcL29hdXRoXC92ZXJpZnkiLCJpYXQiOjE2ODAxNTUyNjUsImV4cCI6MTcxMTY5MTI2NSwibmJmIjoxNjgwMTU1MjY1LCJqdGkiOiJIUWdZN2Y1UTNZVmREOXRUIiwic3ViIjoyNiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.r3obIN5lSmirumlP2C_H5WgYQF19vWGyYS3Lkb-Bgg8";
  return getLocalStorageVariable(OLTIN_BALIQ_BOT_TKN);
}

export function removeToken() {
  return removeLocalStorageVariable(OLTIN_BALIQ_BOT_TKN);
}
