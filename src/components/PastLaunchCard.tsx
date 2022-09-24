import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconRocket } from "@tabler/icons";
import { ApiTypes } from "../types/api";
import { RouteCard } from "./RouteCard";

const SuccessfulLaunches = ({ total }: { total: number }) => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "teal", to: "lime" }}>
			<IconRocket size={20} />
		</ThemeIcon>

		<Text size="xs" color="teal">
			{total} successful
		</Text>
	</>
}

const FailedLaunches = ({ total }: { total: number }) => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "yellow", to: "orange" }}>
			<IconRocket style={{ transform: "rotate(90deg)" }} size={20} />
		</ThemeIcon>

		<Text size="xs" color="orange">
			{total} failed
		</Text>
	</>
}

export const PastLaunchCard = ({ failedFlights, successfulFlights, totalFlights }: ApiTypes.TPastLaunchSummary) => {
	return <RouteCard
		image={{
			src: "/past_launches.jpg",
			alt: "Past Launches",
		}}
		badges={[
			{
				color: { from: "yellow", to: "red" },
				text: `${totalFlights} flights`
			}
		]}
		Title={<Text weight={500}>Past</Text>}
		route="/launches/list/past"
	>
		<Group position="left" mt="xs" spacing="xs">
			<SuccessfulLaunches total={successfulFlights} />
		</Group>
		<Group position="left" mt="xs" spacing="xs">
			<FailedLaunches total={failedFlights} />
		</Group>
	</RouteCard >
}