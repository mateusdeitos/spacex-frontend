import { Card, Group, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ApiTypes } from "../../types/api";
import { Failed, Successful } from "./BadgeStatus";
import { FlightNumberBadge } from "./FlightNumberBadge";
import { HasVideoBadge } from "./HasVideoBadge";


export function LaunchCard({
	flightNumber,
	hasVideo,
	id,
	missionDate,
	missionName,
	success,
}: ApiTypes.TListLaunchSummary) {
	return <Card component={NextLink} href={`/launches/${id}`} sx={(theme) => ({
		cursor: "pointer",
		background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
		border: "1px solid transparent",
		":hover": {
			borderColor: theme.colors.blue[5],
		},
		transition: "border-color .2s ease-in-out",
	}
	)}>
		<Card.Section p="md">
			<Group position="apart" mb="lg" noWrap>
				<HeaderInfo label="Mission" value={missionName} />
				<HeaderInfo label="Date" value={missionDate} />
			</Group>
			<Group position="left">
				<FlightNumberBadge>#{flightNumber}</FlightNumberBadge>
				{success ? <Successful /> : <Failed />}
				{hasVideo && <HasVideoBadge />}
			</Group>
		</Card.Section>
	</Card>
}

const HeaderInfo = ({ label, value }: { label: string; value: string }) => {
	return <Text size="sm">
		<Text size="xs" weight={600}>{label}</Text>
		{value}
	</Text>
}


