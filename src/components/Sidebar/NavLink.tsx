import { Link, Text, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType, ReactNode } from 'react';

interface NavLinkProps extends ChakraLinkProps{
  children: ReactNode;
  icon: ElementType;
}


export function NavLink({ icon, children, ...rest }: NavLinkProps){
  return (
    <Link display="flex" { ...rest } align="center">
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}