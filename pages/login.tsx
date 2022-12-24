import {
  Anchor,
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
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { pb } from "../data/pocketbase";
import { Collections } from "../pocketbase.types";
import { emailRegex } from "../utils/constants";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const initialFormValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    initialValues: initialFormValues,
    validate: {
      email: (value) => (emailRegex.test(value) ? null : "Invalid email"),
    },
  });

  const router = useRouter();

  const onSubmit = async (values: typeof initialFormValues) => {
    setIsLoading(true);
    try {
      await pb
        .collection(Collections.Users)
        .authWithPassword(values.email, values.password);

      showNotification({
        color: "teal",
        title: "Signed in",
        message: "You are now signed in",
        icon: <IconCheck size={16} />,
      });

      router.push("/");
    } catch (error) {
      showNotification({
        color: "red",
        title: "Failed to sign in",
        message: (error as Error).message,
        icon: <IconX size={16} />,
      });
    }
    setIsLoading(false);
  };

  return (
    <Container size={420} my={120}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor component={Link} href="/register" size="sm">
          Create account
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default LoginPage;
