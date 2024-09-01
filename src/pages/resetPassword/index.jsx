import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";

import api from "../../api/axios";

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "As senhas informadas não coincidem. Por favor, tente novamente."
    ),
});

function ResetPasswordPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const sendForm = async (values) => {
    const object = {
      password: values.password,
      token: searchParams.get("token"),
    };

    try {
      const response = await api.post("/password/reset", object);

      toast.success(
        "Senha alterada com sucesso! Você já pode fechar essa aba."
      );
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (!searchParams.get("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <Container size={460} my={30}>
      <Title ta="center">Reset your password</Title>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit(sendForm)}>
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register("password")}
            required
            error={errors.password?.message}
            mt="md"
          />
          <PasswordInput
            label="Confirm youy password"
            placeholder="Your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Button type="submit">Send</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default ResetPasswordPage;
