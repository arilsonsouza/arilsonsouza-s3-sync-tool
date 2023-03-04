import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
}
