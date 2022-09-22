import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconRocket } from "@tabler/icons";
import { RouteCard } from "./RouteCard";

const SuccessfulLaunches = () => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "teal", to: "lime" }}>
			<IconRocket size={20} />
		</ThemeIcon>

		<Text size="xs" color="teal">
			100 successful
		</Text>
	</>
}

const UnsuccessfulLaunches = () => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "yellow", to: "orange" }}>
			<IconRocket style={{ transform: "rotate(90deg)" }} size={20} />
		</ThemeIcon>

		<Text size="xs" color="orange">
			85 unsuccessful
		</Text>
	</>
}

export const PastLaunchCard = () => {
	return <RouteCard
		image={{
			src: "/past_launches.jpg",
			alt: "Past Launches",
		}}
		badges={[
			{
				color: { from: "yellow", to: "red" },
				text: "185 flights"
			}
		]}
		Title={<Text weight={500}>Past</Text>}
		route="/launches/past"
	>
		<Group position="left" mt="xs" spacing="xs">
			<SuccessfulLaunches />
		</Group>
		<Group position="left" mt="xs" spacing="xs">
			<UnsuccessfulLaunches />
		</Group>
	</RouteCard >
}