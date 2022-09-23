import { ActionIcon, Anchor, AppShell, Box, Breadcrumbs, Button, Footer, Header, Text, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconMoon, IconSun } from "@tabler/icons";
import Link from "next/link";
import Script from "next/script";
import { PropsWithChildren } from "react";
import { useAppContext } from "../../context/AppContext";
import { GaProvider } from "../../services/optimize/useGa";
import { PageShellProvider } from "./context";

interface IPageShellProps {
	FooterChildren?: React.ReactElement
	pageTitle: string;
	breadcrumbs?: Array<{ title: string, href?: string, active?: never } | { title: string, href?: never, active?: true }>
}

export const PageShell = ({ children, FooterChildren, pageTitle, breadcrumbs }: PropsWithChildren<IPageShellProps>) => {
	const ga = typeof window === 'undefined' ? throwIfSSR : gaHandler
	const theme = useMantineTheme();
	return <PageShellProvider>
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			footer={
				!!FooterChildren ? <Footer height={60} p="md">
					{FooterChildren}
				</Footer> : null
			}
			header={
				< Header height={70} p="xs" >
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%', maxWidth: 980, margin: "0 auto" }}>
						<Text component={NextLink} href="/" size="xl" weight={500}>API SpaceXplorer</Text>
						<ThemeToggler />
					</Box>
				</Header >
			}
		>
			<Box style={{ margin: "0 auto", maxWidth: 980 }}>
				{!!breadcrumbs && <Breadcrumbs>
					{breadcrumbs.map((item) => {
						if (item.active) {
							return <Text key={item.title} color="dimmed" sx={{ textTransform: "lowercase" }}>{item.title}</Text>
						}

						return <Link key={item.href} href={item.href} passHref>
							<Anchor sx={{ textTransform: "lowercase" }}>{item.title}</Anchor>
						</Link>
					})}
				</Breadcrumbs>}
				<Text size="xl" mb="xs" weight={500}>{pageTitle}</Text>

				<Script dangerouslySetInnerHTML={{
					__html: `
					(function(h,o,t,j,a,r){
						h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
						h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:${process.env.NEXT_PUBLIC_HOTJAR_SV}};
						a=o.getElementsByTagName('head')[0];
						r=o.createElement('script');r.async=1;
						r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
						a.appendChild(r);
					})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
					`
				}} />
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
					onLoad={() => {
						gaHandler('js', new Date());

						gaHandler('config', process.env.NEXT_PUBLIC_GTAG_ID);
					}}
				/>
				<Script
					src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_OPTIMIZE_CONTAINER_ID}`}
				/>
				{children}
			</Box>
		</AppShell >

	</PageShellProvider >
}

const ThemeToggler = () => {
	const { toggleTheme, theme } = useAppContext();

	return <ActionIcon onClick={toggleTheme} title="Toggle theme" style={{ cursor: "pointer" }}>
		{theme === 'dark' ? <IconSun color="orange" size={20} /> : <IconMoon color="blue" size={20} />}
	</ActionIcon>
}

function throwIfSSR() {
	throw new Error('Using GA during SSR is not allowed')
}

function gaHandler(...args: any[]) {
	const dataLayer = ((window as any).dataLayer =
		(window as any).dataLayer || [])

	dataLayer.push(arguments)
}