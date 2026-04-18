import { ComponentType } from 'react';

export interface PasswordFieldProps {
  errors?: string;
  isPending?: boolean;
}
export interface PasswordTitles {
  text: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type PasswordMode = 'password' | 'text';
