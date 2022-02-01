import React, { useState } from 'react'
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Thead, Tr, Td, Text, useBreakpointValue, Spinner, Link} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from "../../components/Header"
import { SideBar } from "../../components/Sidebar"
import { Pagination } from '../../components/Pagination'
import NextLink from 'next/link'
import { getUsers, useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'
import { GetServerSideProps } from 'next'


export default function UserList({ users }){
  const [page, setPage ] = useState(1);
  const { isLoading, data, error, isFetching } = useUsers(page, {
    initialData: users
  })

  async function handlePrefetchUser(userId: number){
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, //10 minutes
    })
  }

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
            <NextLink href="/users/create" passHref>
              <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="pink"
                    leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                    >

                    Criar Novo
                </Button>
              </NextLink>
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
                        <Link
                         color="purple.400"
                         onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                          <Text fontWeight="bold"> {user.name} </Text>
                        </Link>
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


export const getServerSideProps: GetServerSideProps = async () => {

  const { users,  totalCount } = await getUsers(1)
  console.log(users)
  return {
    props:{
      users,
    }
  }
}