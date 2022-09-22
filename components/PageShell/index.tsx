import { ActionIcon, Anchor, AppShell, Box, Breadcrumbs, Button, Footer, Header, Text, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { useAppContext } from "../../context/AppContext";
import { PageShellProvider } from "./context";

interface IPageShellProps {
	FooterChildren?: React.ReactElement
	pageTitle: string;
	breadcrumbs?: Array<{ title: string, href?: string, active?: never } | { title: string, href?: never, active?: true }>
}

export const PageShell = ({ children, FooterChildren, pageTitle, breadcrumbs }: PropsWithChildren<IPageShellProps>) => {
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
				<Header height={70} p="xs">
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%', maxWidth: 980, margin: "0 auto" }}>
						<Text size="xl" weight={500}>API SpaceXplorer</Text>
						<ThemeToggler />
					</div>
				</Header>
			}
		>
			<Box style={{ margin: "0 auto", maxWidth: 980 }}>
				<Text size="xl" mb="xs" weight={500}>{pageTitle}</Text>
				{!!breadcrumbs && <Breadcrumbs>
					{breadcrumbs.map((item) => {
						if (item.active) {
							return <Text key={item.title} color="dimmed">{item.title}</Text>
						}

						return <Link key={item.href} href={item.href} passHref>
							<Anchor>{item.title}</Anchor>
						</Link>
					})}
				</Breadcrumbs>}
				{children}
			</Box>
		</AppShell>

	</PageShellProvider>
}

const ThemeToggler = () => {
	const { toggleTheme, theme } = useAppContext();

	return <ActionIcon onClick={toggleTheme} title="Toggle theme" style={{ cursor: "pointer" }}>
		{theme === 'dark' ? <IconSun color="orange" size={20} /> : <IconMoon color="blue" size={20} />}
	</ActionIcon>
}