import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { user, Login } = useAuth();

  const handleLogin = async (values) => {
    Login(values);
  };

  if (user) {
    return <Navigate to="/app" />;
  }

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container fluid style={{ width: "100%", maxWidth: 480 }}>
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

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          w="100%"
          maw={680}
        >
          <form onSubmit={handleSubmit(handleLogin)}>
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
      <Box style={{ position: "absolute", bottom: 0 }}>
        <Anchor
          variant="gradient"
          gradient={{ from: "teal", to: "violet" }}
          fw={600}
          fz="lg"
          href="https://github.com/caducoder"
          target="_blank"
        >
          Made by caducoder
        </Anchor>
      </Box>
    </Box>
  );
}

export default LoginPage;
