import { Text } from "@mantine/core";
import { dateUTCToLocalString } from "../utils/date.formatter";
import { RouteCard } from "./RouteCard";

export const LatestLaunchCard = () => {
	return <RouteCard
		image={{
			src: "/latest_launch.jpg",
			alt: "Latest launch",
		}}
		badges={[
			{
				color: { from: "orange", to: "red" },
				text: "Flight: #185"
			}
		]}
		Title={<Text weight={500}>Latest</Text>}
		route="/launches/latest"
	>
		<Text mt="xs" size="xs" color="dimmed">
			Launch name: Starlink 4-34 (v1.5)
		</Text>
		<Text mt="xs" size="xs" color="dimmed">
			Launch date: {dateUTCToLocalString("2022-09-17T01:05:00.000Z")}
		</Text>
	</RouteCard>
}