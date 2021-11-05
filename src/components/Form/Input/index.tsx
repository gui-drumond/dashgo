import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import {  FieldError } from "react-hook-form"
import { ForwardRefRenderFunction, forwardRef  } from "react";
interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
   = ({name, error = null, label, ...rest }, ref) => {
  return(
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={label}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        bgColor="gray.900"
        focusBorderColor="pink.500"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      <FormErrorMessage>
        {error?.message}
      </FormErrorMessage>
    </FormControl>

    
  );
}

export const Input = forwardRef(InputBase)