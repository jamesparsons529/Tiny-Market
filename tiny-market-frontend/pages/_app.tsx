import '../styles/globals.css';
import { ClientProvider } from '@micro-stacks/react';
import { useCallback } from 'react';
import { StacksMocknet } from 'micro-stacks/network';
import { destroySession, saveSession } from '../common/fetchers';
import { StacksMainnet } from '@stacks/network';

import type { AppProps } from 'next/app';
import type { ClientConfig } from '@micro-stacks/client';

function MyApp({ Component, pageProps }: AppProps) {
  const network = new StacksMocknet();
  const onPersistState: ClientConfig['onPersistState'] = useCallback(
    async (dehydratedState: string) => {
      await saveSession(dehydratedState);
    },
    []
  );

  const onSignOut: ClientConfig['onSignOut'] = useCallback(async () => {
    await destroySession();
  }, []);

  return (
    <ClientProvider
      appName="Tiny Market"
      appIconUrl="/vercel.png"
      network="mainnet"
      dehydratedState={pageProps?.dehydratedState}
      onPersistState={onPersistState}
      onSignOut={onSignOut}
    >
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default MyApp;
