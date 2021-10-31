import { Link as ChakraLink, Text, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType, ReactNode } from 'react';
import Link from 'next/link';

interface NavLinkProps extends ChakraLinkProps{
  children: ReactNode;
  icon: ElementType;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps){
  return (
    <Link href={href} passHref>
       <ChakraLink display="flex" { ...rest } align="center">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>     
    </Link>
  );
}