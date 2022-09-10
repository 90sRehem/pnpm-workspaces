import {
  Flex,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@/lib/chakra-ui";

import { Form, TextInput, Link, PasswordInput } from "@/components";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { IRegisterValues } from "../types";

const schema = z.object({
  firstName: z.string().min(3, "O nome deve possuir no mínimo 3 caracteres."),
  lastName: z
    .string()
    .min(3, "O sobrenome deve possuir no mínimo 3 caracteres."),
  email: z
    .string()
    .min(1, "É necessário informar o e-mail!")
    .email("Informe um e-mail válido!"),
  password: z.string().min(1, "É necessário informar a senha!"),
});

export function RegisterForm() {
  const navigate = useNavigate();

  async function handleSubmit(formData: IRegisterValues) {
    navigate("/auth/login");
  }

  return (
    <Flex
      rounded="lg"
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="lg"
      p="2"
      w="xl"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Stack spacing="8" w="full" maxW="lg">
        <Heading fontSize="2xl">Cadastre-se</Heading>
        <Form<IRegisterValues, typeof schema>
          onSubmit={async values => handleSubmit(values)}
          schema={schema}
        >
          {({ register, formState }) => (
            <Stack>
              <TextInput
                isRequired
                name="firstname"
                label="Nome"
                error={formState.errors.firstName}
                registration={register("firstName")}
              />
              <TextInput
                isRequired
                name="lastname"
                label="Sobrenome"
                error={formState.errors.lastName}
                registration={register("lastName")}
              />
              <TextInput
                isRequired
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                registration={register("email")}
              />
              <PasswordInput
                isRequired
                name="password"
                label="Senha"
                error={formState.errors.password}
                registration={register("password")}
              />
              <Stack spacing={6} pt="4">
                <Button
                  colorScheme="blue"
                  size="lg"
                  variant="solid"
                  type="submit"
                >
                  Entrar
                </Button>
                <Stack>
                  <Text align="center">
                    Não possui uma conta?{" "}
                    <Link to="/auth/login" color="blue.400">
                      Entrar
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Form>
      </Stack>
    </Flex>
  );
}
