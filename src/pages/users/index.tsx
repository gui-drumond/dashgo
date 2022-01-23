import React, { useState } from 'react'
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Thead, Tr, Td, Text, useBreakpointValue, Spinner} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from "../../components/Header"
import { SideBar } from "../../components/Sidebar"
import { Pagination } from '../../components/Pagination'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { api } from '../../services/api'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList(){
  const [page, setPage ] = useState(1);
  const { isLoading, data, error, isFetching } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return(
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1460} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários 
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="pink"
                    leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                    >

                    Criar Novo
                </Button>
              </Link>
          </Flex>
          {isLoading ? (
          <Flex justify="center"> 
            <Spinner> Dados de usuarios nao encontrados </Spinner>
          </Flex>
          ): ( (error) ? 
            (
            <Flex justify="center"> 
              <Text> Dados de usuários não encontrados </Text>
            </Flex>
            ): (
            <>
              <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4","4","6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink"/>
                  </Th>
                  <Th>Usuarios</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  <Th w="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                { data.users.map((user) => {
                  return(
                    <Tr key={user.id}>
                    <Td px="6">
                      <Checkbox colorScheme="pink"/>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold"> {user.name} </Text>
                        <Text fontSize="sm" color="gray.300"> {user.email} </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td> {user.createdAt}</Td>}
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} mr="-2" fontSize="18"/>}
                      >
                        {isWideVersion? 'Editar': ''}
                      </Button>   
                    </Td>
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
          ))}
        </Box>
      </Flex>
    </Box>
  )
}