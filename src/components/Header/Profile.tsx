import { Avatar, Box, Flex,Text } from "@chakra-ui/react";
import React from "react";
export function Profile() {
  return (
    <Flex aling="center">
      <Box mr="4" textAlign="right">
        <Text> Guilherme Fernandes Drumond </Text>
        <Text color="gray.300" fontSize="small">
          dev.drumond@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Guilherme Fernandes Drumond" />
    </Flex>
  );
}
