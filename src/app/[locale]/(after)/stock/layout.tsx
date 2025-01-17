import { getTranslations } from 'next-intl/server';
import React from 'react';

type NewsLayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: {
      template: `%s | ${t('app_name')}`,
      default: t('stock'),
    },
    description: 'Provide US stocks.',
  };
}

export default function StockLayout({ children }: NewsLayoutProps) {
  return <>{children}</>;
}
