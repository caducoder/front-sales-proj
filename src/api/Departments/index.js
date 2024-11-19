import api from "../axios";

export const getDepartments = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/users/app-departments")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
