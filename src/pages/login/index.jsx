import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import toast from "react-hot-toast";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const sendData = async (values) => {
    console.log(values);
    try {
      const response = await api.post("/sessions", values);

      console.log(response);
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/register")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(sendData)}>
          <TextInput
            label="Email"
            placeholder="you@email.dev"
            {...register("email")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register("password")}
            required
            mt="md"
          />
          <Group justify="end" mt="lg">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
