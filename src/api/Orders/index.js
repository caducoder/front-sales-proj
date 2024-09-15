import api from "../axios";

export const getOrders = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/orders")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
