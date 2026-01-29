import React from 'react';
import type { ReactNode } from 'react';
import s from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={s.layout}>{children}</div>;
};

export default Layout;
