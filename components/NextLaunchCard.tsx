import { Text } from "@mantine/core";
import { TStaticPropsHomeResponse } from "../pages";
import { RouteCard } from "./RouteCard";

export const NextLaunchCard = ({ next }: Pick<TStaticPropsHomeResponse, "next">) => {
	return <RouteCard
		image={{
			src: "/next_launch.jpg",
			alt: "Next launch",
		}}
		badges={[
			{
				color: { from: "indigo", to: "cyan" },
				text: `Flight: #${next.flightNumber}`
			},
		]}
		Title={<Text weight={500}>Next</Text>}
		route="/launches/next"
	>
		<Text mt="xs" size="xs" color="dimmed">
			Mission: {next.missionName}
		</Text>
		<Text mt="xs" size="xs" color="dimmed">
			Date: {next.missionDate}
		</Text>
	</RouteCard>
}