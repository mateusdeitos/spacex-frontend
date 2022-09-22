import { Text } from "@mantine/core";
import { dateUTCToLocalString } from "../utils/date.formatter";
import { RouteCard } from "./RouteCard";

export const NextLaunchCard = () => {
	return <RouteCard
		image={{
			src: "/next_launch.jpg",
			alt: "Next launch",
		}}
		badges={[
			{
				color: { from: "indigo", to: "cyan" },
				text: "Flight: #186"
			},
		]}
		Title={<Text weight={500}>Next</Text>}
		route="/launches/next"
	>
		<Text mt="xs" size="xs" color="dimmed">
			Launch name: Starlink 4-35 (v1.5)
		</Text>
		<Text mt="xs" size="xs" color="dimmed">
			Launch date: {dateUTCToLocalString("2022-09-24T23:30:00.000Z")}
		</Text>
	</RouteCard>
}