import api from "../axios";

export const getUsers = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/users")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
