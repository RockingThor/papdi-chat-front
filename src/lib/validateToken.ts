import { api } from "./axios";

export async function validateToken() {
  try {
    const response = await api.get("/token");
    if (response.status === 200) {
      return true;
    } else {
      localStorage.setItem("user", "");
      delete api.defaults.headers.common["Authorization"];
      return false;
    }
  } catch (error) {
    localStorage.setItem("user", "");
    delete api.defaults.headers.common["Authorization"];
    return false;
  }
}
