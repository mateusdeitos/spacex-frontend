import { Text } from "@mantine/core";
import { TStaticPropsHomeResponse } from "../pages";
import { RouteCard } from "./RouteCard";

export const LatestLaunchCard = ({ latest }: Pick<TStaticPropsHomeResponse, "latest">) => {
	return <RouteCard
		image={{
			src: "/latest_launch.jpg",
			alt: "Latest launch",
		}}
		badges={[
			{
				color: { from: "orange", to: "red" },
				text: `Flight: #${latest.flightNumber}`
			}
		]}
		Title={<Text weight={500}>Latest</Text>}
		route="/launches/latest"
	>
		<Text mt="xs" size="xs" color="dimmed">
			Mission: {latest.missionName}
		</Text>
		<Text mt="xs" size="xs" color="dimmed">
			Date: {latest.missionDate}
		</Text>
	</RouteCard>
}