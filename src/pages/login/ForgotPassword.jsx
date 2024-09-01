import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const icon = <IconInfoCircle />;

  const sendForm = async (values) => {
    try {
      const response = await api.post("/password/forgot", values);

      setIsEmailSent(true);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title ta="center">Forgot your password?</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      {isEmailSent && (
        <Alert
          variant="light"
          color="green"
          radius="md"
          title="Alert title"
          icon={icon}
        >
          Um e-mail com as instruções para redefinir sua senha foi enviado para
          o endereço de e-mail associado à sua conta. Por favor, verifique sua
          caixa de entrada.
        </Alert>
      )}
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit(sendForm)}>
          <TextInput
            label="Your email"
            placeholder="me@email.dev"
            {...register("email", { required: true })}
            required
          />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm" onClick={() => navigate("/login")}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type="submit">Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
