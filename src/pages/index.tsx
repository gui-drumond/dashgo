import { Flex,Button,Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignInFormsData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormsData> = async (values) => {
    await new Promise((resolve => { setTimeout(resolve, 2000)}))
    console.log(formState.errors,values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="2rem"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register('email')} 
          />
          <Input name="password"
            type="password" 
            label="Senha" 
            error={formState.errors.password}
            {...register('password')}
          /> 
          </Stack>
          <Button
            type="submit"
            size="lg"
            mt="6"
            colorScheme="pink"
            focusBorderColor="pink.500"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
      </Flex>
    </Flex>
  );
}
