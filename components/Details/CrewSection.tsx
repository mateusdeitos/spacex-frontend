import { Anchor, Card, Image, SimpleGrid, Text } from "@mantine/core";
import { ApiTypes } from "../../types/api";

export const CrewSection = ({ crew }: { crew: ApiTypes.TLaunchDetails["crew"] }) => {
	return <SimpleGrid cols={2} spacing="md" breakpoints={[{ cols: 1, maxWidth: 900 }]}>
		{crew.map((member, i) => (
			<CrewMember key={i} {...member} />
		))}
	</SimpleGrid>
}


const CrewMember = ({ name, agency, image, role, wikipedia }: ApiTypes.TLaunchDetails["crew"][number]) => {
	return <Card shadow="sm" p="md" radius="sm" sx={(theme) => ({
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2],
		justifyContent: "space-between"
	})}>
		<Card.Section mb="xl">
			<Image
				p="sm"
				radius="sm"
				src={image}
				alt={name}
				title={name}
				width="80%"
				height={300}
				mx="auto"
				fit="cover"
				sx={{
					".mantine-Image-image": { objectPosition: "top", margin: "0 auto" },
				}}
			/>
		</Card.Section>

		<SimpleGrid cols={4} spacing="md" mb="lg" sx={{ alignItems: "baseline" }} breakpoints={[{ cols: 2, maxWidth: 600 }]}>
			<MemberInfo label="Name" value={name} />
			<MemberInfo label="Role" value={role} />
			<MemberInfo label="Agency" value={agency} />
			<MemberInfoExternalLink label="Wikipedia Link" value={name} href={wikipedia} />
		</SimpleGrid>
	</Card>
}

const MemberInfoExternalLink = ({ label, value, href }: { label: string, value: string, href: string }) => {
	return <Text size="sm">
		<Text size="xs" weight={600}>{label}</Text>
		<Anchor target="_blank" href={href}>{value}</Anchor>
	</Text>

}

const MemberInfo = ({ label, value }: { label: string; value: string }) => {
	return <Text size="sm">
		<Text size="xs" weight={600}>{label}</Text>
		{value}
	</Text>
}