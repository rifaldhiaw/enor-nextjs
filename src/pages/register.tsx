import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Collections,
  UsersAppRoleOptions,
  UsersRecord,
} from "~/../pocketbase.types";
import { pb } from "~/data/pocketbase";
import { emailRegex, passwordRegex } from "~/utils/constants";

export function RegisterPage() {
  const validatePasswordConfirm = (value: string) => {
    if (value !== form.values.password) {
      return "Passwords do not match";
    }
    return null;
  };

  const validatePassword = (value: string) => {
    if (!passwordRegex.test(value)) {
      return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
    }
    return null;
  };

  const initialFormValues: UsersRecord & {
    password: string;
    passwordConfirm: string;
    email: string;
  } = {
    appRole: UsersAppRoleOptions["admin"],
    organization: "e4fk48xbmedtbcf", // TODO: remove this
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const form = useForm({
    initialValues: initialFormValues,
    validate: {
      email: (value) => (emailRegex.test(value) ? null : "Invalid email"),
      password: validatePassword,
      passwordConfirm: validatePasswordConfirm,
    },
  });

  const router = useRouter();
  const onSubmit = async (user: typeof initialFormValues) => {
    await pb.collection(Collections.Users).create(user);
    router.push("/login");
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
        Create Account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor component={Link} href="/login" size="sm">
          Sign In
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Name"
            placeholder="John Doe"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="john@mail.com"
            mt="md"
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
          <PasswordInput
            label="Password Confirmation"
            placeholder="Confirm your password"
            required
            mt="md"
            type="password"
            {...form.getInputProps("passwordConfirm")}
          />

          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
