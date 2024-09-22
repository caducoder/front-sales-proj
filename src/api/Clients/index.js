import api from "../axios";

export const getClients = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/customers")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
