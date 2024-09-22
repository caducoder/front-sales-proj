import api from "../axios";

export const getRoles = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/users/roles")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const createRole = async (data) =>
  new Promise((resolve, reject) => {
    api
      .post("/users/roles", data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
