import api from "../axios";

export const getProducts = async () =>
  new Promise((resolve, reject) => {
    api
      .get("/products")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const createProduct = async (data) =>
  new Promise((resolve, reject) => {
    api
      .post("/products", data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

export const deleteProduct = async (id) =>
  new Promise((resolve, reject) => {
    api
      .delete(`/products/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
