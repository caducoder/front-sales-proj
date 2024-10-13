import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendForm = async (values) => {
    try {
      const response = await api.post("/sessions/register", values);
      console.log("Response", response);

      navigate("/login");
    } catch (error) {
      console.log("Erro", error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" shadow="md" withBorder>
        <Text size="lg" ta={"center"} fw={700} c="green">
          Welcome to Green Hennister
        </Text>

        <Divider label="Create your account" labelPosition="center" my="lg" />

        <form onSubmit={handleSubmit(sendForm)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              {...register("name", { required: true })}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...register("email", { required: true })}
              error={errors?.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...register("password", { required: true })}
              error={
                errors?.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            <Checkbox label="I accept terms and conditions" defaultChecked />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => navigate("/login")}
              size="xs"
            >
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl">
              Criar conta
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
