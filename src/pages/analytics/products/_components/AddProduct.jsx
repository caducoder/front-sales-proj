import { Button, NumberInput, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createProduct } from "../../../../api/Products";

function AddProduct({ closeModal }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (newProduct) => {
      return createProduct(newProduct);
    },
  });

  const sendForm = async (data) => {
    const formatedData = {
      name: data.name,
      price: data.price * 100,
      quantity: Number(data.quantity),
    };

    mutate(formatedData, {
      onSuccess: (response) => {
        closeModal();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product created");
      },
      onError: (error) => {
        toast.error(error?.response?.data.error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(sendForm)}>
      <TextInput
        label="Name"
        {...register("name", { required: true })}
        placeholder="Product name"
      />
      <NumberInput
        label="Product value"
        placeholder="Price"
        defaultValue={0}
        decimalScale={2}
        decimalSeparator="."
        leftSection="R$"
        mb="md"
        min={0}
        {...register("price")}
      />

      <NumberInput
        label="Quantity"
        defaultValue={0}
        {...register("quantity")}
        placeholder="Quantity"
      />

      <Button type="submit" fullWidth mt="md">
        Register
      </Button>
    </form>
  );
}

export default AddProduct;
