import { ActionIcon, AppShell, Box, Footer, Header, Text, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import { PropsWithChildren } from "react";
import { useAppContext } from "../../context/AppContext";
import { PageShellProvider } from "./context";

interface IPageShellProps {
	FooterChildren?: React.ReactElement
}

export const PageShell = ({ children, FooterChildren }: PropsWithChildren<IPageShellProps>) => {
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
				<Text size="xl" mb="xs" weight={500}>Launches</Text>
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