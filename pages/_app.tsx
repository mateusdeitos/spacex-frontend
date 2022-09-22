import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { AppContextProvider, AppContextConsumer } from '../context/AppContext';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>SpaceX API Explorer</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<AppContextProvider>
				<AppContextConsumer>
					{({ theme }) => (
						<MantineProvider
							withGlobalStyles
							withNormalizeCSS
							theme={{
								colorScheme: theme,
							}}
						>
							<Component {...pageProps} />
						</MantineProvider>
					)}
				</AppContextConsumer>
			</AppContextProvider>
		</>
	);
}

