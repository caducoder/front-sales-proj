import api from "../axios";

export const getProducts = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/products")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
