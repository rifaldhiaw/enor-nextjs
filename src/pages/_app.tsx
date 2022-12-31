import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistedClient,
  Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { del, get, set } from "idb-keyval";
import { AppProps } from "next/app";
import Head from "next/head";

import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
}

const idbPersister = createIDBPersister();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // init emoji-mart
  useEffect(() => {
    init(data);
  }, []);

  return (
    <>
      <Head>
        <title>enor.app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: idbPersister }}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </PersistQueryClientProvider>
    </>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "em-emoji": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        id?: string;
        shortcodes?: string;
        native?: string;
        size?: string | number;
        fallback?: string;
        set?: "native" | "apple" | "facebook" | "google" | "twitter";
        skin?: string | number;
      };
    }
  }
}
