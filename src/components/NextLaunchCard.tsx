import { Text } from "@mantine/core";
import { ApiTypes } from "../types/api";
import { RouteCard } from "./RouteCard";

export const NextLaunchCard = ({ flightNumber, missionDate, missionName, id }: ApiTypes.TNextLaunchSummary) => {
	return <RouteCard
		image={{
			src: "/next_launch.jpg",
			alt: "Next launch",
		}}
		badges={[
			{
				color: { from: "indigo", to: "cyan" },
				text: `Flight: #${flightNumber}`
			},
		]}
		Title={<Text weight={500}>Next</Text>}
		route={`/launches/${id}`}
	>
		<Text mt="xs" size="xs" color="dimmed">
			<Text weight={600}>Mission</Text> {missionName}
		</Text>
		<Text mt="xs" size="xs" color="dimmed">
			<Text weight={600}>Date</Text> {missionDate}
		</Text>
	</RouteCard>
}