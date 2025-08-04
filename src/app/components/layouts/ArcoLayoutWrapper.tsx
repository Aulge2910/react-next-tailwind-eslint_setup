// app/components/LayoutWrapper.tsx

'use client';
import React from 'react';
import { Layout } from '@arco-design/web-react';

type LayoutWrapperProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export default function LayoutWrapper({
  header,
  footer,
  children,
}: LayoutWrapperProps) {
  return (
    <Layout>
      {header && <Layout.Header>{header}</Layout.Header>}
      <Layout.Content>{children}</Layout.Content>
      {footer && <Layout.Footer>{footer}</Layout.Footer>}
    </Layout>
  );
}
