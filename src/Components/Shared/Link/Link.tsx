import  { FC, ReactNode } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { cx } from '@emotion/css';
import './Link.scss';

interface CustomLinkProps extends RouterLinkProps {
  underline?: boolean;
  className?: string;
  children: ReactNode;
}

export const Link: FC<CustomLinkProps> = ({
  underline = false,
  className,
  children,
  ...rest
}) => {
  const linkStyles = cx(
    'customLink',
    {
      'underline': underline,
    },
    className
  );

  return (
    <RouterLink {...rest} className={linkStyles}>
      {children}
    </RouterLink>
  );
};