import { Text } from "@mantine/core";
import { TStaticPropsHomeResponse } from "../pages";
import { RouteCard } from "./RouteCard";

export const LatestLaunchCard = ({ flightNumber, missionDate, missionName, id }: TStaticPropsHomeResponse["latest"]) => {
	return <RouteCard
		image={{
			src: "/latest_launch.jpg",
			alt: "Latest launch",
		}}
		badges={[
			{
				color: { from: "orange", to: "red" },
				text: `Flight: #${flightNumber}`
			}
		]}
		Title={<Text weight={500}>Latest</Text>}
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