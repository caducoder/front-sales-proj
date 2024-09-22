import api from "../axios";

export const getUsers = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/users")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const updateUserRole = async (user_id, role_id) =>
  new Promise((resolve, reject) => {
    api
      .post("/users/roles/assign", { user_id, role_id })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
