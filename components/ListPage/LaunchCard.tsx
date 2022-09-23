import { Card, Group, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { TListType } from "../../pages/launches/list/[type]";
import { ApiTypes } from "../../types/api";
import { Failed, Successful } from "./BadgeStatus";
import { FlightNumberBadge } from "./FlightNumberBadge";
import { HasVideoBadge } from "./HasVideoBadge";

export type TLaunchCardProps = ApiTypes.TListLaunchSummary & {
	type: TListType
}


export function LaunchCard({
	flightNumber,
	hasVideo,
	id,
	missionDate,
	missionName,
	success,
	type,
}: TLaunchCardProps) {
	return <Card component={NextLink} href={`/launches/${id}`} sx={(theme) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		flex: "1 1",
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
			<Group position="apart" mb="lg" noWrap sx={{ alignItems: "baseline" }}>
				<HeaderInfo label="Mission" value={missionName} />
				<HeaderInfo label="Date" value={missionDate} />
			</Group>
		</Card.Section>
		<Group position="left">
			<FlightNumberBadge>#{flightNumber}</FlightNumberBadge>
			{type === 'past' ? (
				success ? <Successful /> : <Failed />
			) : null}
			{hasVideo && <HasVideoBadge />}
		</Group>
	</Card>
}

const HeaderInfo = ({ label, value }: { label: string; value: string }) => {
	return <Text size="sm">
		<Text size="xs" weight={600}>{label}</Text>
		{value}
	</Text>
}


